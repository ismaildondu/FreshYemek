import express from "express";
import PRODUCT_CONTROLLER from "../controllers/product.js";

const PRODUCT_ROUTER = express.Router();

const { CREATE_PRODUCT, GET_PRODUCT, DELETE_PRODUCT } = PRODUCT_CONTROLLER;

PRODUCT_ROUTER.post("/", CREATE_PRODUCT);
PRODUCT_ROUTER.get("/", GET_PRODUCT);
PRODUCT_ROUTER.delete("/", DELETE_PRODUCT);

export default PRODUCT_ROUTER;
