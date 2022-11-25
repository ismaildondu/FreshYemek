import USER from "../model/user.js";
import { generateToken } from "../services/auth.js";
import { verifyToken } from "../services/auth.js";

const CREATE_USER = async (req, res) => {
  const { name, surname, email, password, birthday } = req.body;

  USER.create({ name, surname, email, password, birthday }, (err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.status(200).json({
      success: true,
    });
  });
};

const LOGIN_USER = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }
  const USER_OBJ = await USER.findOne({ email });

  if (!USER_OBJ) {
    return res.status(400).json({
      message: "Email or password is incorrect",
    });
  } else {
    USER_OBJ.comparePassword(password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(400).json({
          message: "Email or password is incorrect",
        });
      } else {
        const token = generateToken(USER_OBJ);
        res.status(200).json({
          token,
          success: true,
        });
      }
    });
  }
};

const VERIFY_USER = async (req, res) => {
  const { token } = req.body;
  const USER_OBJ = await verifyToken(token);
  if (USER_OBJ && USER_OBJ._id) {
    res.status(200).json({
      success: true,
      USER_OBJ,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

const GET_USER_CLIENT_SIDE = async (req, res) => {
  const { token } = req.body;
  const USER_TOKEN = await verifyToken(token);
  if (USER_TOKEN && USER_TOKEN._id) {
    const USER_OBJ = await USER.findOne({ _id: USER_TOKEN._id });
    res.status(200).json({
      success: true,
      USER_OBJ,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

const GET_EMAIL_EXIST = async (req, res) => {
  const { email } = req.body;

  const USER_OBJ = await USER.findOne({ email });
  if (USER_OBJ && USER_OBJ._id) {
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

const USER_CONTROLLER = {
  CREATE_USER,
  LOGIN_USER,
  VERIFY_USER,
  GET_USER_CLIENT_SIDE,
  GET_EMAIL_EXIST,
};

export default USER_CONTROLLER;
