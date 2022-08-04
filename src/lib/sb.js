import { createSupabaseClient } from '@supabase/auth-helpers-sveltekit';

export const { supabaseClient } = createSupabaseClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

// export { supabaseClient };

