export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const options = {
    headers: {
      Authorization: `Bearer ${body.bearer}`,
      'Client-Id': config.twitchClientId,
    },
  };
  const streamers = body.streamersNames.join('&login=');
  // console.log(streamers);
  const data = await fetch(
    `https://api.twitch.tv/helix/users?login=${streamers}`,
    options,
  );
  return data.json();
});
