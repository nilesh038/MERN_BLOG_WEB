//---- step : 1.1
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")


// Load environment variables from a .env file
dotenv.config();


const DB = process.env.MONGODB_URI;

mongoose.connect(DB, {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true,
  //useFindAndModify: false
}).then(() => {
  console.log(`connection successfull`);
}).catch((err) => console.log(`no connection`));

//---- step : 3
const multer = require("multer")
const path = require("path")

//---- step : 2.1
const authRoute = require("./routes/auth")
const authUser = require("./routes/user")
const authPost = require("./routes/posts")
const authCat = require("./routes/categories")

//---- step : 1
//dotenv.config()
//---- step : 2.2
app.use(express.json())
//---- step : 2.3 last ma file crate garne time
app.use("/images", express.static(path.join(__dirname, "/images")))

//---- step : 1.3
// mongoose
//   .connect(process.env.CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     /*  useCreateIndex: true,
//     useFindAndModify: true,*/
//   })
//   .then(console.log("Connected to MongoDB"))
//   .catch((err) => console.log(err))

//---- step : 3
const storage = multer.diskStorage({
  destination: (req, file, callb) => {
    callb(null, "images")
  },
  filename: (req, file, callb) => {
    //callb(null, "file.png")
    callb(null, req.body.name)
  },
})
const upload = multer({ storage: storage })
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded")
})

//---- step : 2
app.use("/auth", authRoute)
app.use("/users", authUser)
app.use("/posts", authPost)
app.use("/category", authCat)

//---- step : 1.2
// // Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
