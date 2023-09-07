const Joi = require("joi");

exports.registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
    passwordConfirm: Joi.ref("password"),
  })
    .with("password", "passwordConfirm")
    .options({ abortEarly: false });

  return schema.validate(data);
};

exports.updateUserValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
  }).options({ abortEarly: false });

  return schema.validate(data);
};

exports.recordValidator = (data) => {
  const schema = Joi.object({
    country: Joi.string().required(),
    countryCode: Joi.string().required(),
    cityName: Joi.string().required(),
    date: Joi.string().required(),
    status: Joi.string().required().valid("plannig", "visited"),
    rating: Joi.when("status", {
      is: "visited",
      then: Joi.string().min(1).max(5).required(),
    }),
    position: Joi.string().required(),
    description: Joi.string().min(1).max(100).required(),
  }).options({ abortEarly: false });

  return schema.validate(data);
};
