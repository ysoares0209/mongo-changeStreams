import connection from "../dbConnection/mongoConnection";

const script = async () => {
  try {
    const client = await connection();
    const users = client.db("users").collection("users");
    await users.deleteMany({});
    console.log("Data deleted :o");
  } catch (error) {
    console.log(`Error... failed to connect`, error);
  }
};

script();
