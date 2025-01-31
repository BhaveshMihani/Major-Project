import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumsRoutes from "./routes/albums.route.js";
import statsRoutes from "./routes/stats.route.js";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import fileupload from "express-fileupload";
import path from "path";
import cors from "cors";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(clerkMiddleware()); // this will add auth to req obj => req.auth
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, //10MB max file size
    },
  })
);

app.use(express.json()); // to parse req.body

// Route handling
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/song", songRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/stats", statsRoutes);

// Error Handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // Pass to default error handler if headers are already sent
  }
  res.status(500).json({
    message: process.env.NODE_ENV === "production" ? "Internal Server error" : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  connectDB();
});

// todo: Socket io will be added here later
