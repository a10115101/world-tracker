const Joi = require("joi");

exports.signupDataValidate = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
  }).options({ abortEarly: false });

  return schema.validate(data);
};

exports.loginDataValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(20).required(),
  });

  return schema.validate(data);
};

exports.updateUserDataValidate = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
  }).options({ abortEarly: false });

  return schema.validate(data);
};

exports.recordDataValidate = (data) => {
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
