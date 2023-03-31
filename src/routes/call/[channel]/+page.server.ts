// import { env } from '$env/dynamic/private';
// import { env as publicEnv } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import TokenServerImport from 'agora-access-token';
import { env } from 'process';
const { RtcRole, RtcTokenBuilder } = TokenServerImport;
import type { PageServerLoadEvent } from '../$types';

export async function load(event: PageServerLoadEvent) {
	const { params, url } = event;
	let uid = url.searchParams.get('uid');
	try {
		const channel = new URLSearchParams(params).get('channel');
		console.log(channel, uid);

		if (!channel) {
			throw error(400, 'channel is required');
		}

		if (!uid) {
			uid = '0';
		}

		const token = await RtcTokenBuilder.buildTokenWithUid(
			env.PUBLIC_APP_ID as string,
			env.APP_CERTIFICATE as string,
			channel,
			parseInt(uid),
			RtcRole.PUBLISHER,
			Math.floor(Date.now() / 1000) + 600
		);

		console.log(token);

		return { token, uid, channel };
	} catch (e) {
		throw error(400, `json expected: ${JSON.stringify(e)}`);
	}
}
