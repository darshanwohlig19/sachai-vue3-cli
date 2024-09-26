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
  LOGIN: config.PROTOCOL,
};

//api-uat.newsshield.io/bookmark/addBookmark

config.BOOKMARK = config.PORT_IP.LOGIN + "/bookmark/addBookmark";

config.GET_CATEGORY_WISE_NEWS_FOR_WEB =
  config.PORT_IP.LOGIN + "/news/getCategoryWiseNewsForWeb";

//chatbot
config.ADD_QA_DATA = config.PORT_IP.LOGIN + "/chats/saveClickedSuggestedQnA";
config.CHAT_BOT_DATA = config.PORT_IP.LOGIN + "/chats/addQnA";
config.GET_CHAT_BOT_DATA = config.PORT_IP.LOGIN + "/chats/getChatsperUser";
config.CHAT_BOT_Feedback = config.PORT_IP.LOGIN + "/chats/answerFeedback";
config.CHAT_BOT_LIMIT = config.PORT_IP.LOGIN + "/chats/questionLimitV2";

export default config;
