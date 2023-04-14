import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()

import routes from './routes/index.js';

import {handleApplicationErrors} from "./middlewares/errorsMiddleware.js"

const server = express();

server.use(express.json())
server.use(cors())
server.use(routes)
server.use(handleApplicationErrors)

const port = 5000 || process.env.PORT

server.listen(port, () => console.log(`Server running on port: ${port}`))