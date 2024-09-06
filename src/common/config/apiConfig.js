const config = {
  PORT: 3000,
  PROTOCOL: "https",
  HOST: "api-uat.newsshield.io",
  // PROTOCOL: "http",
  // HOST: "localhost",
};
config.PROTOCOL_STR = `${config.PROTOCOL}://${config.HOST}`;
// config.PROTOCOL_STR = `${config.PROTOCOL}://${config.HOST}:${config.PORT}`;

config.PORT_IP = {
  LOGIN: config.PROTOCOL_STR,
};

// NodalOfficer Api
config.ADD_QA_DATA = config.PORT_IP.LOGIN + "/chats/saveClickedSuggestedQnA";

export default config;
