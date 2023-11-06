const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

mongoose
  .connect(config.mongoose.url)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });

const PORT = config.port;

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})