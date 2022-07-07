import express from "express";
import cors from "cors";
import "express-async-errors";

import router from "./routes/index.js";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandlingMiddleware);

app.listen(4000, () => {
  console.log("App online on port 4000");
});