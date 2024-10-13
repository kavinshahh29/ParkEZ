const app = require("./app");
const dbConnection = require("./db/dbConnection");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const startServer = async () => {
  try {
    await dbConnection();
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  } catch (err) {
    app.on("error", (err) => {
      console.log("Error starting the server", err);
    });
  }
};

startServer();
