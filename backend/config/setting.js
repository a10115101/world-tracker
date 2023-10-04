exports.corsSetting = () => {
  return {
    origin: process.env.FRONTEND,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };
};

exports.sessionSetting = () => {
  return {
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: { secure: true },
  };
};

exports.rateLimitSetting = () => {
  return {
    max: 500,
    windowMs: 60 * 60 * 1000,
    message: "Sending too many requests from the same IP within one hour.",
  };
};
