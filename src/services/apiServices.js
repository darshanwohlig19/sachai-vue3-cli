import axios from "axios";

const handle401Error = () => {
  localStorage.clear();
};

const getAuthHeaders = () => ({
  Authorization: localStorage.getItem("apiDataToken"),
});

const handleRequest = async (httpType, url, data, options) => {
  try {
    let response;

    switch (httpType.trim().toLowerCase()) {
      case "get":
        response = await axios.get(url, {
          headers: getAuthHeaders(),
        });
        break;
      case "post":
        response = await axios.post(url, data, {
          headers: getAuthHeaders(),
        });
        break;
      case "put":
        response = await axios.put(url, data, {
          headers: getAuthHeaders(),
          ...options, // Merge options with default headers
        });
        break;
      case "delete":
        response = await axios.delete(url, {
          headers: getAuthHeaders(),
          data,
        });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${httpType}`);
    }

    return response;
  } catch (error) {
    if (error?.response?.status === 401) {
      handle401Error();
    }

    // Standardize error response
    return {
      status: error?.response?.status || 500,
      data: error?.response?.data || {
        message: "An unexpected error occurred",
      },
    };
  }
};

export default {
  apiCall: handleRequest,
};
