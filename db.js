const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://alpha:${process.env.DB_PASSWORD}@alpha.w0gtbvm.mongodb.net/userDB?retryWrites=true&w=majority&appName=ALPHA`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log('MongoDB connected');
  } catch (err) {
    console.log('MongoDB connection error:', err);
    process.exit(1); 
  }
};

    module.exports = connectDB;
    

