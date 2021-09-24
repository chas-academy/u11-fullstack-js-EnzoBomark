import mongoose from 'mongoose';
import config from 'config';
import log from '../logger';

const connectToDataBase = async () => {
  const mongodbUri =
    process.env.MONGODB_URI || (config.get('MONGO_URI') as string);

  await mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  try {
    log.info('Mongodb connected');
  } catch (error) {
    log.error('Mongodb error', error);
    process.exit(1);
  }
};

export default connectToDataBase;
