<script>
	export let errors;
	export let values;
</script>

<section>
	<div>
		<h1>Sign in</h1>
		{#if errors}
			<div>{errors.form}</div>
		{/if}
		<form method="post">
			<div>
				<label for="email">Email</label>
				<p>
					<input
						id="email"
						name="email"
						value={values?.email ?? ''}
						type="email"
						placeholder="Email"
						required
					/>
				</p>
			</div>
			<div>
				<label for="password">Password</label>
				<p>
					<input
						id="password"
						name="password"
						value={values?.password ?? ''}
						type="password"
						placeholder="Password"
						required
					/>
				</p>
			</div>
			<div>
				<p>
					<button>Sign in</button>
				</p>
			</div>
		</form>

		<div>
			<p>
				Don't have an account? <a href="/signup">Sign up</a>
			</p>
		</div>
	</div>
</section>
