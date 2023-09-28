exports.queryStr = (input) => {
  switch (input) {
    case "visited":
      return ["visited"];
    case "planning":
      return ["planning"];
    default:
      return ["visited", "planning"];
  }
};

exports.sorted = (input) => {
  switch (input) {
    case "asc":
      return "date";
    default:
      return "-date";
  }
};
