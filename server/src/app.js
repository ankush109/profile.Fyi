import express from "express";
import cors from "cors";
import createError from "http-errors";
import { authRoutes, userRoute } from "./v1/routes";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:3002",
    ],
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 });
app.use(limiter);

app.use("/v1/auth", authRoutes);
app.use("/v1/user", userRoute);

app.all("/", (req, res) =>
  res.send({ message: "API is Up and Running on render 😎🚀" })
);

app.use((req, res, next) => next(createError.NotFound()));

// Error Handler
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ status: err.status || 500, message: err.message });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 @ http://localhost:${PORT}`);
  console.log(`Connected to ${process.env.DATABASE_URL}`);
});


// used prisma which is a well known ORM easy to use and migrations are also very easy 
// simple node js Application for login / register and fetching the user Details