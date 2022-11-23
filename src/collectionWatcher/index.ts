import {
  Db,
  ChangeStreamInsertDocument,
  ChangeStreamUpdateDocument,
  ChangeStreamReplaceDocument,
  ChangeStreamDeleteDocument,
} from "mongodb";

const triggerPipeline = [
  {
    $match: {
      operationType: { $in: ["insert", "delete"] },
    },
  },
];

type Event =
  | ChangeStreamInsertDocument
  | ChangeStreamUpdateDocument
  | ChangeStreamReplaceDocument
  | ChangeStreamDeleteDocument;

export default (db: Db) => {
  const users = db.collection("users");

  const changeStream = users.watch(triggerPipeline);
  changeStream.on("change", async (event: Event) => {
    try {
      console.log("collection watch", event);
      const { operationType } = event;
      if (operationType === "insert") {
        const { documentKey } = event;
        await users.updateOne(
          { _id: documentKey._id },
          { $set: { createdAt: new Date() } }
        );
      }
      if (operationType === "delete") {
        const { documentKey } = event;
        console.log(`deleting user with _id ${documentKey._id}`);
      }
    } catch (error) {
      console.log("collection error", error);
    }
  });

  changeStream.on("close", () => {
    console.log("collection stream got closed");
  });
};
