<script>
	import { session } from '$app/stores';
	import { supabaseClient } from '$lib/sb';
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';
</script>

<svelte:head>
	<title>New Eurlex - JWT Auth Server Side Payment Test</title>
</svelte:head>

<SupaAuthHelper {supabaseClient} {session}>
	<slot />
</SupaAuthHelper>
