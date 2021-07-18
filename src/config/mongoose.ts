import mongoose from 'mongoose';
import environnement from './environnement';

// const mongoUri = `mongodb://${environnement.MONGO_USER}:${environnement.MONGO_PASSWORD}@${environnement.MONGO_HOST}:${environnement.MONGO_PORT}
const mongoUri = `mongodb://localhost:27017/${environnement.MONGO_DATABASE}`;

mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});
