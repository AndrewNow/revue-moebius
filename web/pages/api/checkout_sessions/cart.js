import { validateCartItems } from "use-shopping-cart/utilities";
import Stripe from "stripe";
import { client } from "../../../lib/sanity/client";
import { allPurchasableProductQuery } from "../../../lib/sanity/numeroQuery";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02",
});

export default async function handler(req, res) {
  // This endpoint will send the POST request to Stripe's servers.
  if (req.method === "POST") {
    try {
      // Validate the cart details that were sent from the client.
      const cartItems = req.body;

      // Sanity client performs numeroListQuery
      let sanityData = await client.fetch(allPurchasableProductQuery);

      // The POST request is then validated against the data from Sanity.
      const line_items = validateCartItems(sanityData, cartItems);
      // console.log(JSON.stringify(line_items, 0, 2));

      // Create Checkout Sessions from body params.
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        // uncomment to enable shipping collection
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        //The cart items are inserted.
        line_items,
        allow_promotion_codes: true,
        automatic_tax: {
          // https://stripe.com/docs/payments/checkout/taxes
          enabled: false,
        },
        // disbled while tax_rates are active
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}`,

        payment_intent_data_description: `Revue Moebius - Commande `
      };

      const checkoutSession = await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
