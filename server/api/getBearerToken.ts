export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const options = {
    method: 'POST',
    body: new URLSearchParams({
      client_id: config.twitchClientId,
      client_secret: config.twitchClientSecret,
      grant_type: 'client_credentials',
    }),
  };

  const data = await fetch('https://id.twitch.tv/oauth2/token', options);

  return data.json();
});
