import PRODUCT from "../model/product.js";

const CREATE_PRODUCT = async (req, res) => {
  const { name, description, image, price, merchant } = req.body;
  const PRODUCT_OBJ = await new PRODUCT({
    name,
    description,
    image,
    price,
    merchant,
  });
  PRODUCT_OBJ.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.status(200).json({
      data,
    });
  });
};

const GET_PRODUCT = async (req, res) => {
  let query = req.query;

  let queryLength = Object.keys(query).length;
  if (queryLength > 0) {
    PRODUCT.find(query, (err, data) => {
      if (err) {
        return res.status(400).json({
          err,
        });
      }
      res.status(200).json({
        data,
      });
    });
  } else {
    res.status(400).json({
      message: "No product detail provided",
    });
  }
};

const DELETE_PRODUCT = async (req, res) => {
  const query = req.body;
  PRODUCT.deleteOne(query, (err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.status(200).json({
      data,
    });
  });
};

const PRODUCT_CONTROLLER = {
  CREATE_PRODUCT,
  GET_PRODUCT,
  DELETE_PRODUCT,
};

export default PRODUCT_CONTROLLER;
