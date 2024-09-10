import axios from "axios";

export const addBookmark = async (id, blogs) => {
  try {
    const token = localStorage.getItem("apiDataToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Find the news item to check its current bookmark status
    const newsItem = blogs.value.find((news) => news._id === id);

    // Toggle the status between "Enabled" and "Disabled"
    const newStatus = newsItem.bookmarked ? "Disabled" : "Enabled";

    await axios.post(
      `https://api-uat.newsshield.io/bookmark/addBookmark/${id}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    // Update the local state and local storage to reflect the new bookmark status
    newsItem.bookmarked = !newsItem.bookmarked;
    localStorage.setItem(
      `bookmark_${id}`,
      newsItem.bookmarked ? "Enabled" : "Disabled"
    );

    console.log(
      `News item ${id} bookmark status updated successfully to ${newStatus}`
    );
  } catch (error) {
    console.error(`Error updating bookmark status for news item ${id}:`, error);
  }
};
