import { APP_CERTIFICATE } from '$env/static/private';
import { PUBLIC_APP_ID } from '$env/static/public';
import { error } from '@sveltejs/kit';
import TokenServerImport from 'agora-access-token';
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
		let token = '';
		try {
			token = await RtcTokenBuilder.buildTokenWithUid(
				PUBLIC_APP_ID,
				APP_CERTIFICATE,
				channel,
				parseInt(uid),
				RtcRole.PUBLISHER,
				Math.floor(Date.now() / 1000) + 600
			);
		} catch (e) {
			throw error(400, `token error: ${JSON.stringify(e)}`);
		}

		return { token, uid, channel };
	} catch (e) {
		throw error(400, `json expected: ${JSON.stringify(e)}`);
	}
}
