const express = require("express");
const app = express();
const router = express.Router();
const compressing = require("compressing");
const multer = require("multer");

const savePath = "/www/wwwroot/fresh-shop/server/public";

const port = "4141";

router.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.send(200);
  else next();
});

router.post("/upload", multer().single("file"), (req, res, next) => {
  let buffer = req.file.buffer;

  // 接收到后直接解压到指定目录
  compressing.zip
    .uncompress(buffer, savePath, { relativePath: "." })
    .then((data) => {
      let message = "Zip文件上传并解压成功！";
      res.json({ code: 200, message });
      console.log(message);
    })
    .catch((err) => {
      let message = "Zip文件上传并解压失败！";
      res.json({ code: 500, message });
      console.log(message);
      console.log(err);
    });
});

app.use("/", router);

app.listen(port, () => {
  console.log("Server at: ", port);
});
