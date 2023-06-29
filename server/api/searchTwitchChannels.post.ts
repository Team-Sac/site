export default defineEventHandler(async (event): Promise<object> => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const options = {
    headers: {
      Authorization: `Bearer ${body.bearer}`,
      'Client-Id': config.twitchClientId,
    },
  };

  const query = `?query=${body.query}&first=10`;

  const data = await fetch(
    `https://api.twitch.tv/helix/search/channels${query}`,
    options,
  );

  return data.json();
});
