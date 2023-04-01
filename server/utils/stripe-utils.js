import { stripe } from '../config/index.js';
import { numOf } from './helpers.js';

const { CLIENT_ORIGIN } = process.env;

export const createCustomer = (opts) => stripe.customers.create(opts); // => createdCustomer

export const getCustomerById = (id) => stripe.customers.retrieve(id); // => foundCustomer

export const getProduct = async (productId, opts) => stripe.products.retrieve(productId, opts);

export const getProductName = async (productId, opts) => {
  const product = await getProduct(productId, opts);
  return product.name;
};

export const getOneTimeCheckoutSession = ({ items, shipping, ...config }) => {
  return getCheckoutSession({
    mode: 'payment',
    line_items: genLineItems(items),
    shipping_options: shipping.options,
    shipping_address_collection: { allowed_countries: shipping.countries },
    urls: { success: '/payment?success=true', cancellation: '/payment?cancelled=true' },
    ...config,
  });
};

export const getSubscriptionCheckoutSession = ({ priceId, ...config }) => {
  return getCheckoutSession({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: { trial_period_days: 7 }, // While free trials are fixable on individual plans, these don't get applied at Checkout. We now must configure it when creating Checkout instead
    urls: { success: '/payment?success=true', cancellation: '/payment?cancelled=true' },
    ...config,
  });
};

const getCheckoutSession = ({ customerId, urls, ...config }) => {
  return stripe.checkout.sessions.create({
    customer: customerId,
    ...config,
    payment_method_types: ['card'],
    success_url: CLIENT_ORIGIN + urls.success,
    cancel_url: CLIENT_ORIGIN + urls.cancellation,
  });
};

export const getBillingSession = (customerId) => {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: CLIENT_ORIGIN + '/account',
  });
};

export const getShippingRate = async (rateId) => stripe.shippingRates.retrieve(rateId);

export const genShippingNameAndDeliveryEst = (rate) => {
  const {
    display_name: shippingName,
    delivery_estimate: { minimum, maximum },
  } = rate;

  /*
  
  delivery_estimate has following format:
  {
    maximum: { unit: 'business_day', value: 3 }, 
    minimum: { unit: 'business_day', value: 2 }  
  },
  
  or 
  {
    maximum: { unit: 'business_day', value: 1 },   
    minimum: { unit: 'business_day', value: 1 }    
  }
  
  */

  const min = minimum.value; // => Number
  const max = maximum.value; // => Number
  const timeUnit = maximum.unit.replace('_', ' ');

  let deliveryEst;
  if (min === max) {
    deliveryEst = numOf(max, timeUnit);
    // e.g.'1 business day'
  } else {
    deliveryEst = min + ' - ' + numOf(max, timeUnit);
    // e.g.'2 - 3 business days'
  }

  return { shippingName, deliveryEst };
};

export const getShippingRates = async (opts) => {
  const res = await stripe.shippingRates.list({ active: true, ...opts });
  return res.data;
};
// Stripe doesn't allow deletion of any ShippingRate (they have their supposed reasons), however, we can disable them by "archiving" them.
// The `active: true` option ensures that only non-archived rates are returned.

export const sortShippingRates = (rates) => {
  rates.sort((rate1, rate2) => rate1.fixed_amount.amount - rate2.fixed_amount.amount);
};

export const genShippingOptions = (rates) => rates.map((rate) => ({ shipping_rate: rate.id }));

const genLineItems = (items) => {
  return items.map(({ priceId, quantity }) => ({ price: priceId, quantity }));
};

export const getLineItems = async (checkoutId, opts) => {
  const res = await stripe.checkout.sessions.listLineItems(checkoutId, opts);
  return res.data;
};

export const trimLine_Items = (line_items) =>
  line_items.map((li) => {
    const {
      description,
      quantity,
      price: { id: priceId, product: productId, recurring },
    } = li;

    return { priceId, quantity };
  });
