import yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required().max(32),
  surname: yup.string().required().max(32),
  email: yup.string().email().required().max(64),
  password: yup
    .string()
    .required()
    .min(10)
    .matches(/[A-Z]/, "must contain at least one uppercase letter")
    .matches(/[a-z]/, "must contain at least one lowercase letter")
    .matches(/[0-9]/, "must contain at least one number")
    .matches(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      "must contain at least one special character"
    ),
  birthday: yup.date().required(),
});

const userMiddleware = async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res.status(400).json({ message: err.errors });
  }
};

export default userMiddleware;
