import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  console.log(event.context.params);
  // const config = useRuntimeConfig();
  // const options = {
  //   headers: {
  //     client_id: config.twitchClientId,
  //     Authorization: `Bearer ${event.context.params.bearerToken}`,
  //   },
  // };

  // const data = await fetch(
  //   `https://api.twitch.tv/helix/users?login=yorenfaitdestrucs`,
  //   options
  // );

  // return data.json();
  return true;
});
