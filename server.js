const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const dbConnection = require("./config/db");
dbConnection.once("open", () => console.log("succefuly connect to local db"));

app.use(
  express.json({
    extended: false,
  })
);
app.use("/", require("./routes/redirect"));
app.use("/api/url", require("./routes/url"));

app.listen(PORT, console.log(`server started at PORT ${PORT}`));
