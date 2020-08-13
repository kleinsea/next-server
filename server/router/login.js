const Router = require("koa-router");
const axios = require("axios");
const { logger } = require('../log/config');

const route = new Router();

route.get("/api/facebook/userInfo", async(ctx, next) => {
  try {
    // ? why https://www.haixiao.online need `/`
    const response = await axios.get("https://graph.facebook.com/v8.0/oauth/access_token", {
      params: {
        client_id: "320868815625915",
        redirect_uri: "https://www.haixiao.online/",
        client_secret: "d3cbe95cdb62eed889d52f706da07862",
        code: ctx.query.code
      }
    })
    const userInfo = await axios.get("https://graph.facebook.com/me", {
      params: {
        access_token: response.data.access_token
      }
    })
    ctx.body = userInfo.data
  } catch (error) {
    logger.error(error)
    ctx.status = 500
    ctx.body = (error.response || {}).data
  }
  next()
})

route.get("/api/facebook/userInfoBySDK", async(ctx, next) => {
  try {
    const response = await axios.get(`https://graph.facebook.com/${ctx.query.user_id}`, {
      params: {
        fields: "id,name",
        access_token: ctx.query.access_token
      }
    })
    ctx.body = response.data
  } catch (error) {
    logger.error(error)
    ctx.status = 500
    ctx.body = (error.response || {}).data
  }
  next()
})

route.get("/api/google/userInfoBySDK", async(ctx, next) => {
  try {
    const response = await axios.get("https://www.googleapis.com/oauth2/v3/tokeninfo", {
      params: {
        id_token: ctx.query.id_token
      }
    })
    ctx.body = response.data
  } catch (error) {
    logger.error(error)
    ctx.status = 500
    ctx.body = (error.response || {}).data
  }
  next()
})
module.exports = route;