import { connectMongoDB } from "../configs/mongo";

export const initMongoDB = async () => {
  await connectMongoDB();
};