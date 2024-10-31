import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const dbName = process.env.DB_NAME || "Crawler";

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(`${mongoURI}/${dbName}`, {
        serverSelectionTimeoutMS: 5000, //Thời gian lâu nhất mà mongo đợi để connect db
        socketTimeoutMS: 45000,
      });

      console.log(`Mongoose connected to ${dbName}`);

      mongoose.connection.on("error", (err) => {
        console.error(`Mongoose connection error : ${err.message}`);
      });

      mongoose.connection.on("disconnected", () => {
        console.warn("Mongoose disconnected from the database");
      });
    } catch (error) {
      console.error(
        "MongoDB connection failed, retrying in 5 seconds...",
        error
      );
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    }
  };
  connectWithRetry();
};
