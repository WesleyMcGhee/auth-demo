import express from "express";
import cors from "cors";
import {
  postSignin,
  postSignup,
  authenticateToken,
} from "./controllers/authController";
import Helmet from "helmet";
import {
  deleteWaifu,
  getWaifu,
  getWaifus,
  postWaifu,
  updateWaifu,
} from "./controllers/waifuController";

const app = express();
const port: number = 3001;

app.use(express.json());
app.use(cors());
app.use(Helmet());

app.get("/auth/signup", postSignup);
app.post("/auth/signin", postSignin);

app.get("/waifu", authenticateToken, getWaifus);
app.get("/waifu/:id", authenticateToken, getWaifu);
app.post("/waifu", authenticateToken, postWaifu);
app.patch("/waifu/:id", authenticateToken, updateWaifu);
app.delete("/waifu/:id", authenticateToken, deleteWaifu);

app.listen(port, () => console.log(`Server is running on ${port}`));
