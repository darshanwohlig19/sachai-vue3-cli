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

//Latest
config.GET_ALL_BLOGS_FOR_WEB = config.PORT_IP.LOGIN + "/news/getAllBlogsForWeb";
// config.ADD_BOOKMARK = config.PORT_IP.LOGIN + "/bookmark/addBookmark/${id}";

//Campaign
config.API_FOR_TOPICS_FOR_WEB =
  config.PORT_IP.LOGIN + "/topic/apiForTopicsForWeb/65e17ea9842874dab8c45010";

//Category_News
config.GET_ALL_CATEGORY = config.PORT_IP.LOGIN + "/category/getAllCat";
export default config;
