import { connect } from 'mongoose';
import { config } from 'dotenv';

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

config({path: './config.env'});
import app from './app.js';

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

connect(DB, {    
  })
  .then(() => { console.log('DB connection successful!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on ${port}...`);
});

process.on('unhandleRejection', err => {
  console.log('UNHANDLER REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});


