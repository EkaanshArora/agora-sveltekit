export const ssr = false;

/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  runtime: 'edge',
  envVarsInUse: ['PUBLIC_APP_ID', 'APP_CERTIFICATE'],
};