const AUTH_URL = 'https://id.twitch.tv/oauth2/authorize';
export const VALIDATE_URI = 'https://id.twitch.tv/oauth2/validate';
const RESPONSE_TYPE = 'response_type=token';
const CLIENT_ID = `client_id=${process.env.REACT_APP_CLIENT_ID}`;
const REDIRECT_URI = 'redirect_uri=http://localhost:4040/twitch';
const SCOPE = 'scope=chat:read';
export const AUTH_URI = `${AUTH_URL}?${RESPONSE_TYPE}&${CLIENT_ID}&${REDIRECT_URI}&${SCOPE}`;
