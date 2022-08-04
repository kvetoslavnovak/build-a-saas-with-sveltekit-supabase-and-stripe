<script>
    // import { user } from '$lib/authStore';
    import { session } from '$app/stores';
    // console.log("user from store: ", $user);
    console.log("Test page, user from session: ", $session.user);
</script>
<!-- {JSON.stringify($user)} -->
{JSON.stringify($session.user)}
Test