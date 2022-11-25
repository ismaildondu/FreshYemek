import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import MERCHANT_ROUTER from "./routes/merchant.js";
import PRODUCT_ROUTER from "./routes/product.js";
import USER_ROUTER from "./routes/user.js";
import REVIEW_ROUTER from "./routes/review.js";

dotenv.config();
const ENV = process.env;
mongoose.connect(ENV.MONGO_URL);

const APP = express();
APP.use(bodyParser.json({ limit: "30mb", extended: true }));
APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(cors());

APP.use("/merchant", MERCHANT_ROUTER);
APP.use("/product", PRODUCT_ROUTER);
APP.use("/user", USER_ROUTER);
APP.use("/review", REVIEW_ROUTER);

APP.listen(ENV.PORT);
