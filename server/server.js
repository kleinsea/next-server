const Koa = require("koa");
const server = new Koa();
const router = require("./router");
const { logger, accessLogger } = require('./log/config');
const cors = require('@koa/cors');
server.use(accessLogger());
server.use(cors());

server.use(async (ctx, next) => {
  // ctx.set({
  //   'Access-Control-Allow-Origin': '*', // 打开跨域
  //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept Authorization',
  //   'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12'
  // })
  try {
    await next();
  } catch (err) {
    logger.error(err)
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    }
  }
})

server.use(router.routes())
server.listen("8888",()=> {
  console.log('Running on port 8888');
})