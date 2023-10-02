exports.record = (input, user) => {
  if (input.status === "planning") delete input.rating;

  if (input.status === "visited" && !input.rating) input.rating = 1;

  input.user = user.id;
  return input;
};

exports.user = (input) => {
  if (input.setting === "public") {
    delete input.setting;
    input.isPublic = true;
  }

  if (input.setting === "privacy") {
    delete input.setting;
    input.isPublic = false;
  }

  return input;
};
