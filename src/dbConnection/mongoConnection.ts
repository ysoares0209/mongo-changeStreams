import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionUri = process.env.MONGO_URI as string;

const connect = async () => {
  const client = new MongoClient(connectionUri, {
    writeConcern: {
      w: "majority",
    },
    retryWrites: true,
  });
  try {
    await client.connect();
    await client.db("users").command({ ping: 1 });

    return client;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connect;
