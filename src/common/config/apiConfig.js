const config = {
  PORT: 3000,
  PROTOCOL: "https",
  HOST: "api-uat.newsshield.io",
  // HOST: "dev-api.newsshield.io",
  // PROTOCOL: "http",
  // HOST: "localhost",
};
config.PROTOCOL = `${config.PROTOCOL}://${config.HOST}`;
// config.PROTOCOL_STR = `${config.PROTOCOL}://${config.HOST}:${config.PORT}`;

config.PORT_IP = {
  LOGIN: config.PROTOCOL,
};

config.BOOKMARK = config.PORT_IP.LOGIN + "/bookmark/addBookmark";

config.GET_CATEGORY_WISE_NEWS_FOR_WEB =
  config.PORT_IP.LOGIN + "/news/getCategoryWiseNewsForWeb";

//chatbot
config.ADD_QA_DATA = config.PORT_IP.LOGIN + "/chats/saveClickedSuggestedQnA";
config.CHAT_BOT_DATA = config.PORT_IP.LOGIN + "/chats/addQnA";
config.GET_CHAT_BOT_DATA = config.PORT_IP.LOGIN + "/chats/getChatsperUser";
config.CHAT_BOT_Feedback = config.PORT_IP.LOGIN + "/chats/answerFeedback";
config.CHAT_BOT_LIMIT = config.PORT_IP.LOGIN + "/chats/questionLimitV2";

//Trending
config.GET_CATEGORY_WISE_NEWS_FOR_WEB =
  config.PORT_IP.LOGIN + "/news/getCategoryWiseNewsForWeb";

//Featured
config.GET_TRENDING_NEWS = config.PORT_IP.LOGIN + "/news/getTrendingNews";
export default config;
