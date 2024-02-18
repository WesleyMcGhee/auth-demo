import express from "express";
import cors from "cors";
import { postSignup } from "./controllers/authController";
import Helmet from "helmet";

const app = express();
const port: number = 3001;

app.use(express.json());
app.use(cors());
app.use(Helmet());

app.get("/auth/signup", postSignup);

app.listen(port, () => console.log(`Server is running on ${port}`));
