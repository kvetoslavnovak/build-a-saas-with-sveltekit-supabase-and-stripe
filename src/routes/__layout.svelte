<script>
	import { session } from '$app/stores';
	import { supabaseClient } from '$lib/sb';
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';

	// console.log("user in session: ", $session?.user);

</script>

<svelte:head>
	<title>New Eurlex - JWT Auth Server Side Payment Test</title>
</svelte:head>

<SupaAuthHelper {supabaseClient} {session}>
	<main>
		<div>
			<h2>
				<a href="/">New Eurlex - JWT Auth Server Side Payment Test</a>
			</h2>

			<slot />

			<div>
				{#if $session?.user?.id}
					<a href="/api/auth/logout">Sign out</a>
				{/if}
			</div>
		</div>
	</main>
</SupaAuthHelper>
