export default {
  variables: {
    fallbackImage:
      "https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp",
  },

  companyDetails: {},
  sessionChecked: false, // Flag to track if session check has been performed
  TOAST: {
    MESSAGES: {
      ERROR: {},
      SUCCESS: {},
      INFO: {},
    },
    DURATION: 4000,
    SEVERITY: {
      SUCCESS: "success",
      INFO: "info",
      ERROR: "error",
    },
  },
  REGEX_PATTERNS: {
    AADHAAR_NUMBER: /^\d{12}$/,
    PAN_NUMBER: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i,
    MOBILE_REG: /^[1-9]\d{9}$/,
    LANDLINE_REG: /^(\d{9}|\d{10})$/,
    EMAIL:
      /^(?=.{1,256}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
    EMAIL_PROFILE:
      /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
    EMAIL_PROFILE_NEW:
      /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/,
    ONLY_ALPHABET: /^[A-Za-z]+$/,
    ONLY_NUMBERS: /^[0-9.]+$/,
    // WEBSITE: /^((https?:\/\/)?(www\.)?(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/i,
    WEBSITE: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}(\/\S*)?$/,
    ALPHA_NUMERIC: /^[a-zA-Z0-9 ]+$/,
    ALPHABET_CHECK: /^[A-Za-z ]+$/,
    DATE_DDMMYYYY: /^(0?[1-9]|[1-2]\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/, // to check 'dd/mm/yyyy' format dates
    POLICY_NUMBER: /^[ A-Za-z0-9/\-:]*$/,
  },
};
