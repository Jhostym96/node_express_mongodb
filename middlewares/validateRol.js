import jwt from "jsonwebtoken";

export function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Token no proporcionado");
  }
  const token = authHeader.slice(7);

  const decoded = jwt.decode(token);

  const role = decoded.role;

  if (role === "admin") {
    next();
  } else {
    return res.status(401).json({ error: "no tiene los permisos suficientes" });
  }
}
