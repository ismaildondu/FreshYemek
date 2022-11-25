import MERCH from "../model/merchant.js";
import getCalculateReview from "../services/review.js";
const CREATE_MERCHANT = async (req, res) => {
  const { name, category, image, minOrder, deliveryTime, deliveryFee } =
    req.body;
  const MERCH_OBJ = await new MERCH({
    name,
    category,
    image,
    minOrder,
    deliveryTime,
    deliveryFee,
  });
  MERCH_OBJ.save((err, data) => {
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

const GET_MERCHANT = async (req, res) => {
  const query = req.query;

  let MERCH_OBJ = await MERCH.find(query);

  MERCH_OBJ = await Promise.all(
    MERCH_OBJ.map(async (item) => {
      const { averageScore, totalReviews } = await getCalculateReview(item._id);
      return {
        ...item._doc,
        averageScore,
        totalReviews,
      };
    })
  );

  res.status(200).json({
    MERCH_OBJ,
  });
};

const DELETE_MERCHANT = async (req, res) => {
  const query = req.body;
  MERCH.deleteOne(query, (err, data) => {
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

const SEARCH_MERCHANT = async (req, res) => {
  const query = req.params.name;

  const MERCH_OBJ = await MERCH.find({
    name: { $regex: query, $options: "i" },
  });

  let cleanedMerch = MERCH_OBJ.map((item) => {
    return { name: item.name, slug: item.slug, _id: item._id };
  });

  res.status(200).json({
    cleanedMerch,
  });
};

const MERCH_CONTROLLER = {
  CREATE_MERCHANT,
  GET_MERCHANT,
  DELETE_MERCHANT,
  SEARCH_MERCHANT,
};

export default MERCH_CONTROLLER;
