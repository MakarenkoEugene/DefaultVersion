import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';
const port = 3001;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://mongo:27017/todos', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api', routes);

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
}
