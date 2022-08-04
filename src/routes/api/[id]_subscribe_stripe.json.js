import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import initStripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

// // with POST and JS and body
// export const POST = async ({request}) => {
//     const res = await request.json();
//     return {
//       status: 200,
//       body: {
//       }
//     };
//   };

// // with POST and form
// export const POST = async ({request}) => {
//     const res = await request.formData();
//     const plan = res.get("plan");
//     return {
//       status: 200,
//       body: {
//         plan
//       }
//     };
//   };

// // with POST and JS and params
//   export const POST = async (request) => {
//     const id = request.params.id;
//     return {
//       status: 200,
//       body: {
//         id
//       }
//     };
//   };

  // wiht GET and params
  export const GET = async (request) => {

    const { user, accessToken } = request.locals;

      const { data: {stripe_customer} } = await supabaseServerClient(accessToken)
      .from('customer_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    const priceId = request.params.id;
    const stripe = initStripe(process.env['STRIPE_SECRET_KEY']);
    const lineItems = [{
      price: priceId,
      quantity: 1
    }]

    const session = await stripe.checkout.sessions.create(
      {
        customer: stripe_customer, 
        mode: "subscription",
        payment_method_types: ['card'],
        line_items: lineItems, 
        success_url: "http://localhost:5173/payment/success",
        cancel_url: "http://localhost:5173/payment/canceled",
      }
    )
    return {
      status: 200,
      body: {
        id: session.id
      }
    };
  };


