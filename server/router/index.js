const Router = require("koa-router");
const axios = require("axios");
const details = require("../mock/details.js")

const route = new Router();

route.get("/list", async (ctx, next) => {
  try {
    const response = await axios.get("https://www.jianshu.com/asimov/trending/now")
    ctx.body = response.data
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      message: "服务器错误"
    }
  }
  next()
});
route.get("/details/:id", async (ctx, next) => {
  try {
    const response = await axios.get(`https://www.jianshu.com/asimov/p/${ctx.params.id}`)
    ctx.body = response.data
  } catch (error) {
    ctx.status = 404
    ctx.body = {
      message: "页面不存在"
    }
  }
  next()
});

route.get("/mock/details", async (ctx, next) => {
  
  try {
    ctx.body = {
      data: details
    }
  } catch (error) {
    ctx.status = 404
    ctx.body = {
      message: "页面不存在"
    }
  }
  next()
});

route.get("/mock/404", async (ctx, next) => {
  ctx.status = 404
  ctx.body = {
    message: "页面不存在"
  }
  next()
});
route.get("/mock/500", async (ctx, next) => {
  ctx.status = 500
  ctx.body = {
    message: "服务器错误"
  }
  next()
});
module.exports = route;