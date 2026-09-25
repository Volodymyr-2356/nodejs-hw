import mongoose from 'mongoose';

// import dns from 'node:dns';

// export const connectMongoDB = async () => {
//   try {
//     console.log('DNS servers before:', dns.getServers());

//     dns.setServers(['8.8.8.8']);

//     console.log('DNS servers after:', dns.getServers());

//     const mongoUrl = process.env.MONGO_URL;

//     await mongoose.connect(mongoUrl);

//     console.log('✅ MongoDB connection established successfully');
//   } catch (error) {
//     console.error('❌ Failed to connect to MongoDB');

//     console.dir(error, {
//       depth: null,
//       colors: true,
//     });

//     if (error instanceof Error) {
//       console.error('\n--- Error details ---');
//       console.error('name:', error.name);
//       console.error('message:', error.message);

//       console.error('cause:', error.cause);
//       console.error('stack:', error.stack);
//     }

//     process.exit(1);
//   }
// };

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1); // аварійне завершення програми
  }
};
