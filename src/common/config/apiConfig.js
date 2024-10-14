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
config.CHAT_BOT_DATA = config.PORT_IP.LOGIN + "/chats/addQnAV2";
config.GET_CHAT_BOT_DATA = config.PORT_IP.LOGIN + "/chats/getChatsperUser";
config.CHAT_BOT_Feedback = config.PORT_IP.LOGIN + "/chats/answerFeedback";
config.CHAT_BOT_LIMIT = config.PORT_IP.LOGIN + "/chats/questionLimitV2";

//Trending
config.GET_CATEGORY_WISE_NEWS_FOR_WEB =
  config.PORT_IP.LOGIN + "/news/getCategoryWiseNewsForWeb";

//Featured
config.GET_TRENDING_NEWS = config.PORT_IP.LOGIN + "/news/getTrendingNews";

config.GET_RELATED_NEWS = config.PORT_IP.LOGIN + "/pinecone/getRelatedNews";

//Latest
config.GET_ALL_BLOGS_FOR_WEB = config.PORT_IP.LOGIN + "/news/getAllBlogsForWeb";
config.ADD_BOOKMARK = config.PORT_IP.LOGIN + "/bookmark/addBookmark/";
config.GET_RELATED_NEWS = config.PORT_IP.LOGIN + "/pinecone/getRelatedNews/";

//Campaign
config.API_FOR_TOPICS_FOR_WEB =
  config.PORT_IP.LOGIN + "/topic/apiForTopicsForWeb/65e17ea9842874dab8c45010";

//Category_News
config.GET_ALL_CATEGORY = config.PORT_IP.LOGIN + "/category/getAllCat";

//Footer
config.GET_TRENDING_TOPICS = config.PORT_IP.LOGIN + "/news/getTrendingTopics";

//Navbar
config.SEARCH_NEWS_FROM_WEB = config.PORT_IP.LOGIN + "/news/searchNewsFromWeb";
config.LOGOUT_EVENT = config.PORT_IP.LOGIN + "/user/logoutEvent";

//Bookmark
config.GET_BOOKMARK_DATA = config.PORT_IP.LOGIN + "/bookmark/getBookmarkData";

//Login
config.LOGIN_V2 = config.PORT_IP.LOGIN + "/user/loginv2/";

export default config;
