// Dynamic BASE_URL based on environment
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://skillintern-e-commerce-website.onrender.com";

export default BASE_URL;