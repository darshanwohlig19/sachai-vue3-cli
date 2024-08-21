// utils/globalState.js
export const globalState = {
  hasLocalStorageData: false,
};

export const checkLocalStorage = () => {
  globalState.hasLocalStorageData = !!localStorage.getItem("apiDataToken");
};
