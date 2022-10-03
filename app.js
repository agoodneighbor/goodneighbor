const express = require("express");
const app = express();
const multer = require("multer");
const port = 8000;
const session = require("express-session");

const http = require("http").Server(app);
const io = require("socket.io")(http);
const router = require("./routes");
const apiRouter = require("./routes/api");

const sessionObj = {
	secret: "wegf6124@#$@#!", // salt -> 암호화를 할 때 필요한 요소값
	resave: false,
	saveUninitialized: true,
};

app.use(session(sessionObj));

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRouter);
app.use("/", router);
app.set("view engine", "ejs");

// let maxAge = 60 * 1000;

io.on("connection", (socket) => {
	console.log(socket.id);

	socket.on("roomentry", (msg) => {
		console.log("msg", msg);
		socket.join(msg);
	});
	socket.on("sendto", (msg) => {
		console.log(msg);
		socket.broadcast.to(msg.roomname).emit("recieve", msg.msg);
	});
});

http.listen(port, () => {
	console.log("Server port : ", port);
});
