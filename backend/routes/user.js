import express from "express";
import USER_CONTROLLER from "../controllers/user.js";
import userMiddleware from "../middleware/create-user.js";

const USER_ROUTER = express.Router();
const {
  CREATE_USER,
  LOGIN_USER,
  VERIFY_USER,
  GET_USER_CLIENT_SIDE,
  GET_EMAIL_EXIST,
} = USER_CONTROLLER;

USER_ROUTER.post("/", userMiddleware, CREATE_USER);
USER_ROUTER.post("/login", LOGIN_USER);
USER_ROUTER.post("/verify", VERIFY_USER);
USER_ROUTER.post("/get-user", GET_USER_CLIENT_SIDE);
USER_ROUTER.post("/get-email-exist", GET_EMAIL_EXIST);

export default USER_ROUTER;

/*  */
