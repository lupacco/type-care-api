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

const port = process.env.PORT || 5000

server.listen(port, () => console.log(`Server running on port: ${port}`))