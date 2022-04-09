import jwt from 'jsonwebtoken';

const DEFAULT_JWT_KEY = process.env.JWT_KEY || "jwtkey";
const DEFAULT_JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1d";

function generateToken(
  payload: string | object | Buffer,
  secret: string = DEFAULT_JWT_KEY,
  expiration: string | number = DEFAULT_JWT_EXPIRATION
) {
  const token = jwt.sign(payload, secret, {
    expiresIn: expiration,
  });
  return token;
}

export { generateToken };
