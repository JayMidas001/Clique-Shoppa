const express = require("express");
require("./config/dbConfig");
require(`dotenv`).config()
const port = process.env.port || 7117;
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUploader = require("express-fileupload");
const keepServerAlive = require(`./helpers/keepServerAlive`);
const resellerRouter = require("./routers/resellerRouter");
const supplierRouter = require("./routers/supplierRouter");

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUploader({
  useTempFiles: true,
  tempFileDir: '/tmp/',  // Temporary directory for storing files
  limits: { fileSize: 50 * 1024 * 1024 }  // Set file size limit if needed (5MB example)
}))
app.use(cors({ origin: "*", credentials: true}));
app.use(morgan("dev"));

app.use("/api/v1/user", resellerRouter);
app.use("/api/v1", supplierRouter);

keepServerAlive();


app.get('/1', (req, res) => {
   res.send('Server is alive!');
});

app.get("/", (req, res) => {
  res.send("Welcome to Clique Shoppa!");
});


app.listen(port, () => {
  console.log("App is currently Up & Running, server is listening to port:", port);
});