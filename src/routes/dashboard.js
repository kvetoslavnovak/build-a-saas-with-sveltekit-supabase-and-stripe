import { supabaseServerClient, withApiAuth } from '@supabase/auth-helpers-sveltekit';

export const GET = async ({ locals, request }) =>
	withApiAuth(
		{
			redirectTo: '/',
			user: locals.user
		},
		async () => {
			const { data: plans } = await supabaseServerClient(request).from('plans').select('*');
			return {
				body: {
					plans,
					user: locals.user
				}
			};
		}
	);
