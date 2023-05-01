import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb' }));
