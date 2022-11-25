import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const ENV = process.env;

export const generateToken = (user) => {
  return jsonwebtoken.sign(
    {
      _id: user._id,
    },
    ENV.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const verifyToken = (token) => {
  if (!token) return false;
  return new Promise((resolve, reject) => {
    try {
      jsonwebtoken.verify(token, ENV.JWT_SECRET, (err, decode) => {
        if (err) {
          reject(err);
        }
        resolve(decode);
      });
    } catch (err) {
      reject(err);
    }
  });
};
