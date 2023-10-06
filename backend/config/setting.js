exports.helmetSetting = () => {
  return {
    crossOriginResourcePolicy: false,
  };
};

exports.corsSetting = () => {
  return {
    origin: process.env.FRONTEND,
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true,
  };
};

exports.sessionSetting = () => {
  let isSecure;

  if (process.env.NODE_ENV === "production") {
    isSecure = true;
  } else {
    isSecure = false;
  }

  return {
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      secure: isSecure,
      sameSite: "none",
    },
  };
};

exports.rateLimitSetting = () => {
  return {
    max: 500,
    windowMs: 60 * 60 * 1000,
    message: "Sending too many requests from the same IP within one hour.",
  };
};
