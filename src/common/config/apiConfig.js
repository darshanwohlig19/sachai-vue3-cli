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
config.CHAT_BOT_DATA = config.PORT_IP.LOGIN + "/chats/addQnA";
config.GET_CHAT_BOT_DATA = config.PORT_IP.LOGIN + "/chats/getChatsperUser";
config.CHAT_BOT_Feedback = config.PORT_IP.LOGIN + "/chats/answerFeedback";

export default config;
