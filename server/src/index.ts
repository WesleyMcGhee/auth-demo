import express from "express";
import cors from "cors";

const app = express();
const port: number = 3001;

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Server is running on ${port}`));
