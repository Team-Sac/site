export default defineEventHandler(async (event): Promise<object> => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const options = {
    headers: {
      Authorization: `Bearer ${body.bearer}`,
      'Client-Id': config.twitchClientId,
    },
  };
  const streamers = body.streamersNames.join('&login=');
  const data = await fetch(
    `https://api.twitch.tv/helix/users?login=${streamers}`,
    options,
  );
  return data.json();
});
