const express = require("express");
const app = express();
const multer = require("multer");
const port = 8000;

const cookieParser = require("cookie-parser");
const session = require("express-session");

const http = require("http").Server(app);
const io = require("socket.io")(http);
const router = require("./routes");
const apiRouter= require("./routes/api")

// { path: '/', httpOnly: true, secure: false, maxAge: null }
const sessionObj = {
	secret: "wegf6124@#$@#!", // salt -> 암호화를 할 때 필요한 요소값
	resave: false,
	saveUninitialized: true,
	// store: new Memorystore({ checkPeriod: maxAge }), // 서버를 저장할 공간 설정,
	// checkPeriod : 서버쪽 세션의 유효기간
	// cookie: {
	// 	maxAge: maxAge,
	// },
	// 브라우저 쿠키의 유효기간
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
});

http.listen(port, () => {
	console.log("Server port : ", port);
});

