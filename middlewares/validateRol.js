import jwt from "jsonwebtoken";

export function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Token no proporcionado");
  }

  const role = jwt.decode(authHeader.slice(7)).role;

  if (role === "admin") {
    next();
  } else {
    return res.status(401).json({ error: "no tiene los permisos suficientes" });
  }
}
