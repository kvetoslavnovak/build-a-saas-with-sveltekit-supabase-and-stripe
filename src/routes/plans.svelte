<script>
    import { session } from '$app/stores';
    import {loadStripe}  from '@stripe/stripe-js'

    export let plans;

    // // with JS and POST and body
    // async function subscribe (planName) {
        // const res = await fetch(`/api/${planName}_subscribe_stripe.json`, {
        // method: "POST", 
        // body: JSON.stringify(planName),
        // }
        // );
    //     console.log("POST clicked subscription", planName);
    // }

    //     // with JS and POST and params
    //     async function subscribe (planName) {
    //         const res = await fetch(`/api/${planName}_subscribe_stripe.json`, {
    //     method: "POST", 
    //     }
    //     );
    //     console.log("POST clicked subscription", planName);
    // }

    // wiht JS and GET and params
    async function subscribe (planName) {
        const res = await fetch(`/api/${planName}_subscribe_stripe.json`);
        let data = await res.json();
        const stripe = await loadStripe (import.meta.env.VITE_STRIPE_PUBLIC_KEY);
        await stripe.redirectToCheckout({sessionId: data.id});

    }
</script>

<h2>Plans</h2>

<div>
    {#each plans as plan}
<h3>{plan.name}</h3>
<p>
    {plan.currency.toUpperCase()} {plan.price/100} / {plan.interval}
</p>

{#if $session?.user == null}
Please sign in.
{/if}

{#if $session?.user?.customer_profile.is_subscribed == false}
<!-- equest to endpont with JS -->
{$session.user.email} you may <button on:click={() => subscribe(plan.id)}>Subscribe</button> 

<!-- request to endpont with a form -->
<!-- <form action="/api/[id]_subscribe_stripe.json" method="POST">
    <input type="hidden" name="plan" value="{plan.name}" />
    <input type="submit">
</form> -->
{/if}
{/each}
</div>