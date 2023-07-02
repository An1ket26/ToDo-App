const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoutes=require("./Routes/UserRoutes")
const TaskRoutes=require("./Routes/TaskRoutes")
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user",UserRoutes);
app.use("/api/task",TaskRoutes);


mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    app.listen(process.env.PORT, (err) => {
      if (!err) {
        console.log("server running at port 5000");
      } else {
        console.log(err);
      }
    });
  }).catch((err)=>{
    console.log(err);
  })
