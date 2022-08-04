<script>
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let redirectPath = '/dashboard';

	$: {
		const redirectTo = $page.url.searchParams.get('redirect');
		if (redirectTo) {
			redirectPath = redirectTo;
		}
		// check if user has been set in session store then redirect
		if ($session?.user?.id) {
			goto(redirectPath);
		}
	}
</script>

<section>
	<div>
		<progress class="progress" max="100" />
	</div>
	<div>
		Signing in from the email confirmation link  ...
	</div>
</section>

<style>
	.progress:indeterminate {
		animation-duration: 3.8s;
	}
</style>
