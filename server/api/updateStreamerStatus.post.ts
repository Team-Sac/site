import crypto from 'crypto';
import { setResponseStatus } from 'h3';

// eslint-disable-next-line consistent-return
export default defineEventHandler(async (event): Promise<void> => {
  const body = await readRawBody(event);
  const { headers } = event.node.req;

  // Notification request headers
  const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase();
  // eslint-disable-next-line
  const TWITCH_MESSAGE_TIMESTAMP =
    'Twitch-Eventsub-Message-Timestamp'.toLowerCase();
  // eslint-disable-next-line
  const TWITCH_MESSAGE_SIGNATURE =
    'Twitch-Eventsub-Message-Signature'.toLowerCase();

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
  if (verifyMessage(hmac, headers[TWITCH_MESSAGE_SIGNATURE])) {
    // Get JSON object from body, so you can process the message.
    const notification = body ? JSON.parse(body) : {};

    if (MESSAGE_TYPE_NOTIFICATION === headers[MESSAGE_TYPE]) {
      try {
        await fetch(
          `https://directus.teamsac.xyz/items/streams/${notification.event.broadcaster_user_name}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${process.env.NUXT_DIRECTUS_SECRET_KEY}`,
            },
            body: JSON.stringify({
              online: notification.subscription.type === 'stream.online',
            }),
          },
        );
      } catch (e) {}

      setResponseStatus(event, 204);
    } else if (MESSAGE_TYPE_VERIFICATION === headers[MESSAGE_TYPE]) {
      return notification.challenge;
    } else if (MESSAGE_TYPE_REVOCATION === headers[MESSAGE_TYPE]) {
      setResponseStatus(event, 204);
    } else {
      setResponseStatus(event, 204);
    }
  } else {
    setResponseStatus(event, 403);
  }
});
