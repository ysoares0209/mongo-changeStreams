import connection from "../dbConnection/mongoConnection";

const script = async () => {
  try {
    const client = await connection();
    const users = client.db("users").collection("users");
    users.drop();
    console.log("collection dropped!");
  } catch (error) {
    console.log(`Error... failed to connect`, error);
  }
};

script();
