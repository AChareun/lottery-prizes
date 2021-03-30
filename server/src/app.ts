import * as express from 'express';
import * as cors from 'cors';

export const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.json('Hello, World!')
});
