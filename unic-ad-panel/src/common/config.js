require("dotenv").config();
export default {};

export const API_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/"
        : "https://college.uni-dubna.ru:8443/api/";
