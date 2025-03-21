const express = require("express");
const app = express();
var logger = require("morgan");
var path = require("path");
var cookieParser = require("cookie-parser");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");

const taskRoutes = require("./routes/task.routes");
var indexRouter = require("./routes/index");
const authRoutes = require("./routes/user.routes");
const authenticate = require("./middleware/auth");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3005",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", authenticate, taskRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
