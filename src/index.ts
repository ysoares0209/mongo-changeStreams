import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();

import connect from "./dbConnection/mongoConnection";

//watchers
import collectionWatcher from "./collectionWatcher";
import databaseWatcher from "./databaseWatcher";
import clientWatcher from "./clientWatcher";

const app: Express = express();
const port = process.env.PORT;

const startServer = async () => {
  try {
    const client = await connect();
    app.listen(port, async () => {
      console.log(`Server listening on port ${port}`);
    });

    const usersDb = client.db("users");

    collectionWatcher(usersDb);
    databaseWatcher(usersDb);
    clientWatcher(client);
  } catch (error) {
    console.log(`Error starting server...`, error);
  }
};

startServer();
