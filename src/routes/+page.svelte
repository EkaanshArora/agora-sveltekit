<script>
	import './styles.css'
	import { onMount } from 'svelte';
	/**
	 * @type {typeof import("./Videocall.svelte").default}
	 */
	let Videocall;
	let inCall = true;
	onMount(async () => {
		const module = await import('./Videocall.svelte');
		Videocall = module.default;
	});
</script>

<h1>SvelteKit x Agora</h1>
{#if inCall}
	<div style="text-align: center">
		<button
			on:click={() => {
				inCall = false;
			}}>End Call</button
		>
	</div>
	<br>
	<svelte:component this={Videocall} />
{:else}
	<div style="text-align: center">
		<button on:click={() => (inCall = true)}>Start call</button>
	</div>
{/if}
