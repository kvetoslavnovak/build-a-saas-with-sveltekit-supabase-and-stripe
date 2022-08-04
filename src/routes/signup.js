import { supabaseClient } from '$lib/sb';

export const GET = async ({ locals }) => {
	// if the user is already logged in, then redirect to the dashboard
	if (locals.user) {
		return {
			status: 303,
			headers: {
				location: '/dashboard'
			}
		};
	}
	return {
		status: 200
	};
};

export const POST = async ({ request, url }) => {
	const data = await request.formData();

	const email = data.get('email');
	const password = data.get('password');

	const errors = {};
	const values = { email, password };

	const { error } = await supabaseClient.auth.signUp(
		{ email, password }, 
		{ redirectTo: `${url.origin}/logging-in`}
	);

	if (error) {
		errors.form = error.message;
		return {
			status: 400,
			body: {
				errors,
				values
			}
		};
	}

	return {
		status: 200,
		body: {
			message: 'Please check your email for a confirmation email.'
		}
	};
};
