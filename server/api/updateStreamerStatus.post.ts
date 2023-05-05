import crypto from 'crypto';

export default defineEventHandler(async (event) => {
  const body = await readRawBody(event);
  const { headers } = event.node.req;

  // Notification request headers
  const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase();
  // eslint-disable-next-line
  const TWITCH_MESSAGE_TIMESTAMP = 'Twitch-Eventsub-Message-Timestamp'.toLowerCase();
  // eslint-disable-next-line
  const TWITCH_MESSAGE_SIGNATURE = 'Twitch-Eventsub-Message-Signature'.toLowerCase();

  const MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type'.toLowerCase();

  // Notification message types
  const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification';
  const MESSAGE_TYPE_NOTIFICATION = 'notification';
  const MESSAGE_TYPE_REVOCATION = 'revocation';

  // Prepend this string to the HMAC that's created from the message
  const HMAC_PREFIX = 'sha256=';

  const config = useRuntimeConfig();

  function getSecret() {
    return config.twitchTransportSecret;
  }

  // Build the message used to get the HMAC.
  function getHmacMessage(request: any) {
    return (
      request[TWITCH_MESSAGE_ID] + request[TWITCH_MESSAGE_TIMESTAMP] + body
    );
  }

  // Get the HMAC.
  function getHmac(secret: crypto.BinaryLike, message: any) {
    return crypto.createHmac('sha256', secret).update(message).digest('hex');
  }

  // Verify whether our hash matches the hash that Twitch passed in the header.
  function verifyMessage(hmac: String, verifySignature: any) {
    return crypto.timingSafeEqual(
      Buffer.from(hmac),
      Buffer.from(verifySignature),
    );
  }

  const secret = getSecret();
  const message = getHmacMessage(headers);
  const hmac = HMAC_PREFIX + getHmac(secret, message);

  // Signatures does matches
  if (verifyMessage(hmac, headers[TWITCH_MESSAGE_SIGNATURE]) === true) {
    // Get JSON object from body, so you can process the message.
    const notification = JSON.parse(body);

    if (MESSAGE_TYPE_NOTIFICATION === headers[MESSAGE_TYPE]) {
      // TODO: Do something with the event's data.
      console.log(`Event type: ${notification.subscription.type}`);
      console.log(JSON.stringify(notification.event, null, 4));

      fetch(
        'https://directus.teamsac.xyz/flows/trigger/7d41730f-4083-4bd1-b6e0-ca8979356368',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: notification.event.broadcaster_user_name,
            status: notification.subscription.type === 'stream.online',
          }),
        },
      )
        .then((response) => response.json())
        .then((jsonResponse) => {
          console.log(jsonResponse);
        });

      switch (notification.subscription.type) {
        case 'stream.online':
          console.log('Going live');
          break;
        case 'stream.offline':
          console.log('Stopping live');
          break;
        default:
          console.log(`Live status updated to ${notification.event.type}`);
          break;
      }
      setResponseStatus(event, 204);
    } else if (MESSAGE_TYPE_VERIFICATION === headers[MESSAGE_TYPE]) {
      console.log('Subscription registered.');
      return notification.challenge;
    } else if (MESSAGE_TYPE_REVOCATION === headers[MESSAGE_TYPE]) {
      setResponseStatus(event, 204);
      console.log(`${notification.subscription.type} notifications revoked!`);
      console.log(`reason: ${notification.subscription.status}`);
      console.log(
        `condition: ${JSON.stringify(
          notification.subscription.condition,
          null,
          4,
        )}`,
      );
    } else {
      setResponseStatus(event, 204);
      console.log(`Unknown message type: ${headers[MESSAGE_TYPE]}`);
    }
  } else {
    console.log("403 Signatures didn't match."); // Signatures didn't match.
    setResponseStatus(event, 403);
  }
});
