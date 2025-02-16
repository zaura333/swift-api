import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import routes from "./routes/routes";
import { connect } from "./utils/db";

dotenv.config();
connect();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
