import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import healthRoute from "./Routes/healthPredict.js";


const app = express();
const PORT = process.env.PORT || 8001;

const corsOptions = {
  origin: true,
};


app.get("/", (req, res) => {
  res.send("Hello, World!");
});


// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/", healthRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});