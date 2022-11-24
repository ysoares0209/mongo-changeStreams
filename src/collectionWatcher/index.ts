import {
  Db,
  ChangeStreamInsertDocument,
  ChangeStreamDeleteDocument,
  ChangeStreamInvalidateDocument,
} from "mongodb";

const triggerPipeline = [
  {
    $match: {
      operationType: { $in: ["insert", "delete", "invalidate"] },
    },
  },
];

type Event =
  | ChangeStreamInsertDocument
  | ChangeStreamInvalidateDocument
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
      if (operationType === "invalidate") {
        console.log(`Invalidate event detected...`);
      }
    } catch (error) {
      console.log("collection error", error);
    }
  });
};
