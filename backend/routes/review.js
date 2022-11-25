import express from "express";
import REVIEW_CONTROLLER from "../controllers/review.js";

const REVIEW_ROUTER = express.Router();
const { ADD_REVIEW } = REVIEW_CONTROLLER;

REVIEW_ROUTER.post("/", ADD_REVIEW);

export default REVIEW_ROUTER;
