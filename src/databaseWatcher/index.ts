import { Db, ChangeStreamDocument } from "mongodb";

//const triggerPipeline = [];

export default (db: Db) => {
  const changStream = db.watch([]);
  changStream.on("change", (event: ChangeStreamDocument) => {
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
