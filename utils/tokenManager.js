import jwt from "jsonwebtoken";

export const generateToken = (uid) => {

  const expiresIn = 60 * 15

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn })
    return { token, expiresIn }
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (uid) => {
  const expireIn = 60 * 60 * 24 * 30
  try {
    const RefreshToken = jwt.sign({uid}, process.env.JWT_REFRESH)
  } catch (error) {
    console.log(error);
  }
}