// 开发环境地址
const dev = "http://127.0.0.1:44444/api";
// 生产环境地址
const prod = "http://127.0.0.1:44444/api";

const url = process.env.NODE_ENV === "development" ? dev : prod;

export default url;
