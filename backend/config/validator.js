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
    photo: Joi.any(),
    gender: Joi.string().allow("").valid("Male", "Female"),
    birthday: Joi.date().allow("").max("now"),
    language: Joi.string().allow("").valid("zh", "en"),
    introduction: Joi.string().allow("").max(100),
    isPublic: Joi.boolean(),
  }).options({ abortEarly: false });

  return schema.validate(data);
};

exports.recordDataValidate = (data) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    continent: Joi.string().required(),
    country: Joi.string().required(),
    countryCode: Joi.string().required(),
    cityName: Joi.string().required(),
    status: Joi.string().required().valid("planning", "visited"),
    date: Joi.when("status", {
      is: "visited",
      then: Joi.date().less("now").required(),
      otherwise: Joi.date().greater("now").required(),
    }),
    rating: Joi.when("status", {
      is: "visited",
      then: Joi.number().min(1).max(5).required(),
      otherwise: Joi.forbidden(),
    }),
    position: {
      coordinates: Joi.array().items(Joi.number().required()),
    },
    description: Joi.string().min(1).max(100).required(),
  }).options({ abortEarly: false });

  return schema.validate(data);
};

exports.updateRecordDataValidate = (data) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    status: Joi.string().required().valid("planning", "visited"),
    date: Joi.when("status", {
      is: "visited",
      then: Joi.date().less("now").required(),
      otherwise: Joi.date().greater("now").required(),
    }),
    rating: Joi.when("status", {
      is: "visited",
      then: Joi.number().min(1).max(5).required(),
      otherwise: Joi.forbidden(),
    }),
    description: Joi.string().min(1).max(100).required(),
  }).options({ abortEarly: false });

  return schema.validate(data);
};
