import 'dotenv/config';
import "./database/connectdb.js";
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import linkRouter from "./routes/link.route.js";
import authRouter from './routes/auth.route.js';

const app = express();

const whiteList = [process.env.ORIGIN1]

// configurando cors
app.use(
    cors({
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            return callback(null, origin)
        }
        return callback("Error de CORS origin :" + origin + "No autorizado!")
    }
}));

app.use(express.json())

// Habilitando el uso de Cookies
app.use(cookieParser());

// Routas
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/links', linkRouter);

// Ejemplo de login y token
// app.use(express.static('public'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('🔥🔥🔥 http://localhost:' + PORT));