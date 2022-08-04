import { handleAuth } from '@supabase/auth-helpers-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';

// Add customer in the getSession function
export const handle = sequence( 
	...handleAuth({
		cookieOptions: { lifetime: 1 * 365 * 24 * 60 * 60 }
	})
);

export const getSession = async (event) => {
	const { user, accessToken } = event.locals;
	
	if (user) {
		const { data } = await supabaseServerClient(accessToken)
		.from('customer_profiles')
		.select('*')
		.eq('id', user.id)
		.single();
		user.customer_profile = data;
		// user.customer_profile.is_subscribed = true;
		return {
			user,
			accessToken
		};
	}
	return {

	};
};


// // Other option - Add customer in the handle fucntion
// async function addCustomer({ event, resolve }) {
// 	if (event.locals.user) {
// 	const { data } = await supabaseServerClient(event.locals.accessToken)
// 		.from('customer_profiles')
// 		.select('*')
// 		.eq('id', event.locals.user.id)
// 		.single();
// 		event.locals.user.customer_profile = data;
// 		// user.customer_profile.is_subscribed = true;
// 	}
// 	const result = await resolve(event);
// 	return result;
//   }

// export const handle = sequence( 
// 	...handleAuth({
// 		cookieOptions: { lifetime: 1 * 365 * 24 * 60 * 60 }
// 	}), 
// 	addCustomer
// );

// export const getSession = async (event) => {
// 	const { user, accessToken } = event.locals;
// 	return {
// 		user,
// 		accessToken
// 	};
// };