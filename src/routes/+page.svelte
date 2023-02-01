<script>
	import './styles.css'
	let channel = 'test'
	let uid = 0
	const handleClick = () => {
		window.location.href = `/call/${channel}?uid=${uid}`
	}
</script>

<h1>SvelteKit x Agora</h1>
<div class="text-column">
	<label>
		Channel Name:
		<input bind:value={channel} name="channel" type="text" />
	</label>
	<label>
		UID:
		<input bind:value={uid} name="uid" type="number" />
	</label>
	<button on:click={handleClick}>Join Channel</button>
</div>
