import express, { Express, NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';

const server: Express = express();
server.use(express.json({limit: '10mb'}));
server.use(fileUpload());
server.use();

export default server;
