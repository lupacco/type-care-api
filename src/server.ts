import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()

const server = express();

server.use(express.json())
server.use(cors())


const port = 5000 || process.env.PORT

server.listen(port, () => console.log(`Server running on port: ${port}...`))