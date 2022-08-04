import initStripe from 'stripe';
import dotenv from 'dotenv';
import { supabaseServerClient, withApiAuth } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from '$lib/sb';
import { createClient } from "@supabase/supabase-js";
dotenv.config();

 const getServiceSupabase = () =>
  createClient(
    import.meta.env.VITE_SUPABASE_URL,
    process.env['SUPABASE_SERVICE_KEY']
  );


// export const GET = async () => {
//   const stripe = initStripe(process.env['STRIPE_SECRET_KEY']);
//   const customer = await stripe.customers.create({
//     email: "baaaaaaaaabb@aa.com"
//   });
//     return {
// 		body: {
//             message: `stripe customer created with id ${customer.id}`
//         }
// 	};
// };

export const POST = async ({request, url}) => {
  if (url.searchParams.get('API_ROUTE_SECRET') !== process.env['API_ROUTE_SECRET']) {
    return {
			status: 401,
      body : {
        meaasege: "you are not authorised to call this API"
      }
		};
  }

  console.log("request", request);

  const data = await request.json();
  console.log("data", data);
  const email = data.record.email;
  const stripe = initStripe(process.env['STRIPE_SECRET_KEY']);
  const customer = await stripe.customers.create({
    email
  });

  const susu = getServiceSupabase();

console.log(customer.id)

await susu
  .from("customer_profiles")
  .update({
      stripe_customer: customer.id
    })
    .eq("id", 
    data.record.id
    );

    return {
      body: {
        message: `stripe customer created with id ${customer.id}`
    }
	};
};



// export const POST = async ({request, locals, url}) =>
//   {
//     const { user, accessToken } = locals;

//     if (url.searchParams.get('API_ROUTE_SECRET') !== process.env['API_ROUTE_SECRET']) {
//       return {
//         status: 401,
//         body : {
//           meaasege: "you are not authorised to call this API"
//         }
//       };
//     }

//     const req = await request.json();
//     const email = req.record.email;
//     const stripe = initStripe(process.env['STRIPE_SECRET_KEY']);
//     const customer = await stripe.customers.create({
//       email
//     });

//     console.log("req", req);
//     console.log("customer.id", customer.id);
//     console.log("accessToken", locals.user);

//     let {data} = await supabaseServerClient(accessToken)
//     .from("customer_profiles")
//     .update({
//         stripe_customer: customer.id
//       })
//       .eq("id", 
//       req.record.id
//       );
  
//       console.log("data", data);
//       return {
//         status: 200,
//         body: {
//           data
//         }
//       };
//   }
