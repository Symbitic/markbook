import Koa from 'koa'
import { PassThrough } from 'stream'
import send from 'koa-send'
import { status } from '../common/log'

const createServer = (hostname, port) => config => {
  const app = new Koa()
  const stream = new PassThrough()

  // eslint-disable-next-line no-unused-vars
  const reload = data => stream.write(`event:reload\ndata:${data}\n\n`)

  const root = ctx =>
    send(ctx, /\/$/.test(ctx.path) ? ctx.path + 'index.html' : ctx.path, {
      root: config.destination
    })

  const sse = (ctx, next) => {
    ctx.req.setTimeout(0)

    ctx.type = 'text/event-stream; charset=utf-8'
    ctx.set('Cache-Control', 'no-cache')
    ctx.set('Connection', 'keep-alive')
    ctx.req.on('close', () => ctx.res.end())
    ctx.req.on('finish', () => ctx.res.end())
    ctx.req.on('error', () => ctx.res.end())

    ctx.body = stream

    // reload('/index.html')
  }

  app.use(ctx => (ctx.path === '/sse' ? sse(ctx) : root(ctx)))

  process
    .on('SIGINT', () => process.exit(1))
    .on('SIGTERM', () => process.exit(1))

  app.listen(port, hostname)
  status(`Server running on http://${hostname}:${port}/`)

  return config
}

export default createServer
