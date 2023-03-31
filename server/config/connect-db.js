import mongoose from 'mongoose';

const config = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, config);
    console.log(`✳️  MongoDB Atlas: connected to database!`);
  } catch (err) {
    console.log(`✳️  MongoDB Atlas: ${err.message}`);
    process.exit(1);
  }
};
