import connection from "../dbConnection/mongoConnection";

const script = async () => {
  try {
    const client = await connection();
    const address = client.db("users").collection("address");
    address.drop();
    console.log("collection dropped!");
  } catch (error) {
    console.log(`Error... failed to connect`, error);
  }
};

script();
