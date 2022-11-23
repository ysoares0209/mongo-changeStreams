import {
  Db,
  ChangeStreamInsertDocument,
  ChangeStreamUpdateDocument,
  ChangeStreamReplaceDocument,
  ChangeStreamDeleteDocument,
} from "mongodb";

//const triggerPipeline = [];

type Event =
  | ChangeStreamInsertDocument
  | ChangeStreamUpdateDocument
  | ChangeStreamReplaceDocument
  | ChangeStreamDeleteDocument;

export default (db: Db) => {
  const changStream = db.watch([]);
  changStream.on("change", (event: Event) => {
    try {
      console.log("database event", event);
    } catch (error) {
      console.log(error);
    }
  });
  changStream.on("error", (event) => {
    console.log("error event", event);
  });
};
