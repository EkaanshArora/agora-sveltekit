import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { error, json } from '@sveltejs/kit';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';

export async function POST({ request }: { request: Request }) {
	try {
		const { channel, uid } = await request.json();

		if (!channel) {
			throw error(400, 'channel is required');
		}

		const token = RtcTokenBuilder.buildTokenWithUid(
			publicEnv.PUBLIC_APP_ID,
			env.APP_CERTIFICATE,
			channel,
			uid,
			RtcRole.PUBLISHER,
			Math.floor(Date.now() / 1000) + 600
		);

		return json({ token });
	} catch (e) {
		throw error(400, 'json expected');
	}
}
