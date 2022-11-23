import {
  MongoClient,
  ChangeStreamInsertDocument,
  ChangeStreamUpdateDocument,
  ChangeStreamReplaceDocument,
  ChangeStreamDeleteDocument,
} from "mongodb";

type Event =
  | ChangeStreamInsertDocument
  | ChangeStreamUpdateDocument
  | ChangeStreamReplaceDocument
  | ChangeStreamDeleteDocument;

export default (client: MongoClient) => {
  const changStream = client.watch([]);
  changStream.on("change", (event: Event) => {
    try {
      console.log("client watch", event);
    } catch (error) {
      console.log("client error", error);
    }
  });
};
