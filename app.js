import express, { json } from 'express';
import logger from 'morgan';
import expressFileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRouter, adminRouter } from './routes';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(json());
app.use(logger('dev'));
app.use(expressFileUpload({ useTempFiles: true }));
app.use(cors());

app.get('/', (req, res) => res.json({ welcome: 'hello' }));
app.use(userRouter);
app.use(adminRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
