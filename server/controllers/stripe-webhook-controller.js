import { Basket, Order, Product, User } from '../models/index.js';
import { genCountryName } from '../utils/helpers.js';
import {
  genShippingNameAndDeliveryEst,
  getLineItems,
  getProductName,
  getShippingRate,
  trimLine_Items,
} from '../utils/stripe-utils.js';

// PRODUCTS
export const createProduct = async (product) => {
  const { id: productId, name, description, images: imageURLs } = product;
  // Stripe creates `price=Obj` afterwards, so here, `product.default_price === null`

  const newProduct = new Product({
    productId,
    name,
    description,
    imageURLs, // is multiple images possible vua dashboard?
    stockCount: 7,
  });

  await newProduct.save();
};

// ❌ when product is updated, "product.updated" is fired twice by Stripe ❓
export const updateProduct = async (product, prevProps) => {
  const { id: productId, name, description, images: imageURLs } = product;

  // temporary fix for now - the second call only has an `updated` property, which was already in the first call anyway
  if (Object.keys(prevProps).length === 1) return;

  const update = { name, description, imageURLs };

  await Product.updateOne({ productId }, { $set: update });
};

export const deleteProduct = async (product) => {
  const productId = product.id;

  await Product.deleteOne({ productId });
};

// ❌ when product price updated, product.updated (why!?, none of its data updates? e.g. priceId remains the same) -> price.updated (makes sense) -> product.updated (even no data changes here too?!)
export const updateProductPricing = async (pricing) => {
  const {
    id: priceId,
    product: productId,
    type, // either 'one-time' or 'recurring'
    unit_amount: price,
    currency,
    recurring,
  } = pricing;

  const update = {
    priceId,
    price,
    ...(type === 'recurring' && {
      recurrence: {
        interval: recurring.interval,
        intervalCount: recurring.interval_count,
        trialDayCount: recurring.trial_period_days,
      },
      stockCount: Infinity,
    }),
  };

  await Product.updateOne({ productId }, { $set: update });
};

// USER SUBSCRIPTIONS
export const addUserSubscription = async (subscription) => {
  const {
    customer: customerId,
    plan: { product: productId },
    current_period_end,
  } = subscription;

  // plan also contains other subscription details: { id, created, amount, currency, interval, trial_period_days }
  // plan.id => original priceId (try find out more about this)

  const newSubscription = {
    name: await getProductName(productId), // no other way to access it, really
    isTrialling: true,
    endingAt: new Date(current_period_end * 1000),
  };

  await User.updateSubscription(customerId, newSubscription);
};

export const updateUserSubscription = async (subscription) => {
  const {
    customer: customerId,
    plan: { product: productId },
    status,
    current_period_end,
    cancel_at_period_end, // => `true`, if cancellation gets scheduled by customer
  } = subscription;

  const updatedSubscription = {
    name: await getProductName(productId),
    isTrialling: status === 'trialing',
    endingAt: new Date(current_period_end * 1000),
    isEnding: cancel_at_period_end,
  };

  await User.updateSubscription(customerId, updatedSubscription);
};

export const resetUserSubscription = async (subscription) => {
  const customerId = subscription.customer;

  const defaultSubscription = {
    name: null,
    isTrialling: false,
    endingAt: null,
    isEnding: false,
  };

  await User.updateSubscription(customerId, defaultSubscription);
};

// ORDERS
export const createOrder = async (checkoutSession) => {
  const {
    metadata: { userId },
    customer: customerId,
    id: checkoutId, // the CheckoutSession's ID

    status, // => Str e.g. 'complete'
    amount_subtotal,
    shipping_cost, // contains shipping costs and rateId, but not the rate's name nor delivery estimate
    amount_total,
    customer_details: {
      address: { line1, line2, city, state, country: countryISO, postal_code },
    },
    payment_intent: paymentIntentId,
    mode,
    payment_method_types,
    payment_status,
    created,
  } = checkoutSession;

  const line_items = await getLineItems(checkoutId); // no other way to access it
  const lineItems = trimLine_Items(line_items);

  const shippingRateId = shipping_cost.shipping_rate;
  const shippingRate = await getShippingRate(shippingRateId); // no other way to access it
  const { shippingName, deliveryEst } = genShippingNameAndDeliveryEst(shippingRate);

  const newOrder = new Order({
    userId,
    customerId, // may not need, but save just in case
    checkoutId, // may not need, but save just in case
    lineItems,
    costs: {
      subtotal: amount_subtotal,
      shipping: shipping_cost.amount_total,
      total: amount_total,
    },
    payment: {
      mode,
      method: payment_method_types[0],
      brand: 'visa',
      last4Nums: 4242,
      isPaid: payment_status === 'paid',
      paidAt: new Date(created * 1000),
    },
    shipping: {
      name: shippingName,
      deliveryEst,
    },
    addresses: {
      shipping: {
        line1,
        line2,
        city,
        state,
        country: genCountryName(countryISO),
        postCode: postal_code,
      },
    },
  });

  await newOrder.save();
};

/*
ok so recently we changed the API to help reduce latency 
so we no longer send the line_items on the checkout related events 
instead you should be using https://stripe.com/docs/api/checkout/sessions/line_items 
to retrieve the line_items and then get the data you need
*/
