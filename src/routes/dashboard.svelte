<script>
	import { session } from '$app/stores';
	// BETTER TO USE THE USER (INCLUDING CUSTOMER DETAILS) FROM SESSION THAN FROM ENDPOINT
	export let user;
	export let plans;
</script>

<h3>This is a protected route accesible only for logged in users</h3>

<ul>
	{#each plans as plan}
		<li>
			{plan.title} - {plan.description}
		</li>
	{/each}

	<h3>
		<a sveltekit:prefetch href="plans">Buy Premium Plan</a>
	</h3>
</ul>
<div>
	<p>Hello user {user.email}</p>
</div>
<div>
	<h3>User details:</h3>
	<p>User {user.email} details:</p>
	<pre>{JSON.stringify(user, null, 2)}</pre>
</div>

{#if $session.user?.customer_profile?.is_subscribed}
content for subsribed uusers
{/if}
