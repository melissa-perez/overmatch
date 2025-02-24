import mongoose from 'mongoose';

const connectDB = async (url: string): Promise<void> => {
  return mongoose
    .connect(url)
    .then(() => console.log('Connection to database established...'))
    .catch((error) => {
      console.error(error);
    });
};

export default connectDB;
