import initStripe from 'stripe';
// import { createSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { getServiceSupabase } from '$lib/sbService';

export const POST = async ({request}) => {
    const stripe = initStripe(process.env['STRIPE_SECRET_KEY']);
    const signingSecret = process.env['STRIPE_SIGNING_SECRET'];
    const signature = request.headers.get("stripe-signature");

    const arraybuffer = await request.arrayBuffer();
    const requestBuffer = Buffer.from(new Uint8Array(arraybuffer));

    let stripeEvent;
    try {
      stripeEvent = stripe.webhooks.constructEvent(requestBuffer, signature, signingSecret);
      // console.dir(stripeEvent, {depth: null});
    } catch (error) {
      console.log(error.message);
      return {
        status: 401,
        body : {
          meaasege: `stripe webhook error: ${error.message}`,
        }
      };
    }
    
    // console.dir(stripeEvent, {depth: null});
   
const susu = getServiceSupabase();

    switch (stripeEvent.type) {
      case 'customer.subscription.created': 
      await susu
      .from('customer_profiles')
      .update({
        is_subscribed : true, 
        subscribed_plan: stripeEvent.data.object.plan.product
      })
      .eq('stripe_customer', stripeEvent.data.object.customer);
    }

return {
  body : {
    meaasege: `stripe subscription webhook received and verified ok`,
  }
}
  };
