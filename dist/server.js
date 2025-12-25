import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.get("/health", (req, res) => {
    res.status(200).send("all good here");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
});
//# sourceMappingURL=server.js.map