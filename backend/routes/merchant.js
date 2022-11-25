import express from "express";
import MERCH_CONTROLLER from "../controllers/merchant.js";

const MERCHANT_ROUTER = express.Router();
const { CREATE_MERCHANT, GET_MERCHANT, DELETE_MERCHANT, SEARCH_MERCHANT } =
  MERCH_CONTROLLER;

MERCHANT_ROUTER.post("/", CREATE_MERCHANT);
MERCHANT_ROUTER.get("/", GET_MERCHANT);
MERCHANT_ROUTER.delete("/", DELETE_MERCHANT);
MERCHANT_ROUTER.get("/search/:name", SEARCH_MERCHANT);
export default MERCHANT_ROUTER;
