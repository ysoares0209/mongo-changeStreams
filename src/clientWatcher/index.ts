import { MongoClient, ChangeStreamDocument } from "mongodb";

export default (client: MongoClient) => {
  const changStream = client.watch([]);
  changStream.on("change", (event: ChangeStreamDocument) => {
    try {
      console.log("client watch", event);
    } catch (error) {
      console.log("client error", error);
    }
  });
};
