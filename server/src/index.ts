import express from "express";
import cors from "cors";
import { postSignup } from "./controllers/authController";

const app = express();
const port: number = 3001;

app.use(express.json());
app.use(cors());

app.get("/auth/signup", postSignup);

app.listen(port, () => console.log(`Server is running on ${port}`));
