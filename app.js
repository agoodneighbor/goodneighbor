const express = require("express");
const app = express();
const multer =require("multer")
const port = 8000;

const http = require("http").Server(app);
const io = require("socket.io")(http);
const router = require("./routes");

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.set("view engine", "ejs");

io.on("connection", (socket) => {});

http.listen(port, () => {
	console.log("Server port : ", port);
});
