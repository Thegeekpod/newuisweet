import cookie from 'cookie';
import crypto from 'crypto';

export const setLoginCookie = (res, user) => {
  const token = generateSessionToken(user.id);
  res.setHeader('Set-Cookie', cookie.serialize('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  }));
};

export const parseCookies = (req) => {
  return cookie.parse(req.headers.cookie || '');
};

const generateSessionToken = (userId) => {
  return crypto.createHash('sha256').update(userId + process.env.SESSION_SECRET).digest('hex');
};

export const verifySession = (req) => {
  const cookies = parseCookies(req);
  const token = cookies.session;

  // Verify the session token
  if (token) {
    // Decode token to extract userId
    return true; // Implement your session token verification logic here
  }
  return false;
};
