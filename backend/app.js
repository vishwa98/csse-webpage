const express = require("express");

const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const cors = require("cors");
require("dotenv").config();

//import routes

const buildingRoutes = require("./routes/building");
const roomRoutes = require("./routes/room");
const routeRoutes = require("./routes/route");
const inspectorRoutes = require("./routes/inspector");
const driverRoutes = require("./routes/driver");


// db
mongoose
  .connect(
    "mongodb+srv://Vishwa12345:CSSEDatabase123@cssecluster.dyiip.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected"));

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(cors());

//routes

app.use("/api", buildingRoutes);
app.use("/api", roomRoutes);
app.use("/api", routeRoutes);
app.use("/api", inspectorRoutes);
app.use("/api", driverRoutes);

const port = process.env.SERVER_PORT || 8000;

app.listen(port, (err) => {
  if (err) {
    console.log("Error when serving the app: ", err);
  }

  console.log(`Server is listening on port ${port} @ http://localhost:${port}`);
});
