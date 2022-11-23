import connection from "../dbConnection/mongoConnection";

const script = async () => {
  try {
    const client = await connection();
    const address = client.db("users").collection("address");
    const mockData = { county: "North Yorkshire" };
    await address.insertOne(mockData);
    console.log("collection created!");
  } catch (error) {
    console.log(`Error... failed to connect`, error);
  }
};

script();
