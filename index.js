import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import linkRouter from "./routes/link.route.js";
import authRouter from "./routes/auth.route.js";
import fieldRouter from "./routes/field.route.js";
import reserRouter from "./routes/reserva.route.js";
import historialRouter from "./routes/historial.route.js"


const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

// configurando cors
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Error de CORS origin : " + origin + " No autorizado!");
    },
    credentials: true,
  })
);

app.use(express.json());

// Habilitando el uso de Cookies
app.use(cookieParser());

// Routas
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);
app.use("/api/v1/fields", fieldRouter);
app.use('/api/v1/reservas', reserRouter);
app.use('/api/v1/historial', historialRouter);




// Ejemplo de login y token
app.use(express.static('public'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("🔥🔥🔥 http://localhost:" + PORT));
