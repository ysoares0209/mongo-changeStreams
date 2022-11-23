import connection from "../dbConnection/mongoConnection";

const usersData = [
  { name: "John", surname: "Doe", occupation: "teacher" },
  { name: "Jane", surname: "Doe", occupation: "doctor" },
  { name: "Elon", surname: "Musk", occupation: "he fires people" },
];

const script = async () => {
  try {
    const client = await connection();
    const users = client.db("users").collection("users");
    await users.insertMany(usersData);
    console.log("Data inserted :+1:");
  } catch (error) {
    console.log(`Error... failed to connect`, error);
  }
};

script();
