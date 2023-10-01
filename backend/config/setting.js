exports.corsSetting = () => {
  return {
    origin: process.env.FRONTEND_PORT,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };
};

exports.sessionSetting = () => {
  let isSecure;

  if (process.env.NODE_ENV === "development") {
    isSecure = false;
  } else {
    isSecure = true;
  }

  return {
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: isSecure },
  };
};

exports.rateLimitSetting = () => {
  return {
    max: 500,
    windowMs: 60 * 60 * 1000,
    message: "Sending too many requests from the same IP within one hour.",
  };
};
