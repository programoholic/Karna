const jwt = require("jsonwebtoken");
import { jwtdetails } from '../../appconfig'

export function createJWTToken(user) {
  const token = jwt.sign(
    {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      rollId: user.rollId,
    },
    jwtdetails.secret,
    { expiresIn: jwtdetails.expiryTime }
  );
  return token;
}
