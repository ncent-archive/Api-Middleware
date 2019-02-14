const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const postgreSQLStore = require("connect-pg-simple")(session);
const app = express();
const cookieParser = require("cookie-parser");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
    session({
        key: "session_token",
        secret: "somesecret",
        resave: true,
        saveUninitialized: false,
        cookie: {
            expires: 100000000000
        },
        store: new postgreSQLStore({
            conString: "postgres://@localhost:5432/hybrid-dev"
        })
    })
);

app.use((req, res, next) => {
    if (req.cookies.session_token && !req.session.user) {
        res.clearCookie('session_token');
    }
    next();
});

require("./server/routes")(app);

app.get("*", (req, res) =>
    res.status(200).send({
        message: "Welcome to the nCent API Middleware server."
    })
);

module.exports = app;