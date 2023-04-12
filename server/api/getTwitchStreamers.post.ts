export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${body.bearer}`,
    },
  };

  const data = await fetch(`https://api.twitch.tv/helix/users`, options);
  console.log(data);
  return data.json();
});
