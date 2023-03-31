import Stripe from 'stripe';

import {
  createProduct,
  updateProduct,
  deleteProduct,
  addUserSubscription,
  updateUserSubscription,
  resetUserSubscription,
  updateProductPricing,
  createOrder,
} from '../controllers/stripe-webhook-controller';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Also going to need to protect Webhook endpoint to check that it was actually Stripe making the call. Use Webhook signatures for this: https://stripe.com/docs/webhooks#webhook-endpoint-four
// This is your Stripe CLI webhook secret for testing your endpoint locally.

export const stripeEventHandler = async (req, res) => {
  const signature = req.headers['stripe-signature'];

  // this code is used to confirm that the POST request to our webhook endpoint is actually from Stripe
  // we take the request body and create a Stripe event from it. If successful, we handle the event.

  //   let e;
  //   try {
  //     e = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  //   } catch (err) {
  //     return res.status(400).send(`Webhook Error: ${err.message}`);
  //   }

  const e = req.body;
  const data = e.data.object;
  const prevProps = e.data.previous_attributes; // only exists on `.updated` events. Contains changed properties and their old values

  console.log({ stripe_event: e.type });

  // Handle the event
  switch (e.type) {
    // PRODUCTS
    case 'product.created':
      await createProduct(data);
      break;
    case 'product.updated':
      await updateProduct(data, prevProps);
      break;
    case 'product.deleted':
      await deleteProduct(data);
      break;

    case 'price.created':
    case 'price.updated':
      await updateProductPricing(data);
      break;

    // PAYMENTS
    case 'payment_intent.succeeded':
      // runs once payment has been confirmed
      // paymentIntent.payment_method_datails.card.brand returns the card brand e.g. "visa"
      // for a card payment, paymentIntent.payment_method_details.last4 returns the last 4 digits of the card used
      // both of these are often found in orders e.g. "Payment Method: VISA - 4242"
      // I would implement this but since this runs before the checkout completes, I'd probably have to have a separate `OrderPayment` model, create a document with payment data there
      // and then populate the `order` document with it (via aggregation) when the order is being fetched. The order document would also need to be passed a `paymentIntentId` field (CheckoutSession object provides this reference) to lookup the `OrderPayment` document. Too much work
      // paymentIntent.receipt_url also returns a URL to Stripe's own receipt page for the order
      break;
    case 'checkout.session.completed':
      // runs once checkout has been completed
      if (data.mode !== 'subscription') {
        await createOrder(data);
      }
      break;
    case 'invoice.payment_succeeded':
      // ❔ for subscription payment, I think. Test.
      // do something with `invoice`
      // plan and price Objects are also on invoice, but deeply nested i.e. invoice.lines.data[0].plan/.price. So not practical

      break;

    //SUBSCRIPTIONS - Each Subscription also includes { plan }, the created Plan=Obj
    case 'customer.subscription.created':
      await addUserSubscription(data);
      break;
    case 'customer.subscription.updated':
      await updateUserSubscription(data);
      break;
    case 'customer.subscription.deleted':
      await resetUserSubscription(data);
      break;

    default:
      console.log(`Unhandled Stripe event: ${e.type}`);
  }

  // Return a 200 response to Stripe to acknowledge event receipt
  return res.json({ received: true });
};
