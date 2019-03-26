import chokidar from 'chokidar'
import Koa from 'koa'
import { PassThrough } from 'stream'
import send from 'koa-send'
import { status, error } from '../common/log'
import EventEmitter from 'events'

const createServer = (hostname, port) => config => {
  const app = new Koa()
  const dispatcher = new EventEmitter()

  const root = ctx =>
    send(ctx, /\/$/.test(ctx.path) ? ctx.path + 'index.html' : ctx.path, {
      root: config.destination
    })

  const sse = (ctx, next) => {
    ctx.req.setTimeout(0)

    ctx.response.status = 200
    ctx.type = 'text/event-stream'
    ctx.set('Cache-Control', 'no-cache')
    ctx.set('Connection', 'keep-alive')

    const stream = new PassThrough()

    const reload = path =>
      stream.writable && stream.write(`event:reload\ndata:${path}\n\n`)
    const finish = () => dispatcher.removeListener('reload', reload)

    ctx.body = stream
    dispatcher.on('reload', reload)
    ctx.req.on('close', finish)
    ctx.req.on('finish', finish)
    ctx.req.on('error', finish)
  }

  app.use(ctx => (ctx.path === '/sse' ? sse(ctx) : root(ctx)))

  chokidar
    .watch(config.source)
    .on('change', path => dispatcher.emit('reload'))
    .on('error', err => {
      error(`Chokidar Error: ${err}`)
      process.exit(1)
    })

  process
    .on('SIGINT', () => process.exit(1))
    .on('SIGTERM', () => process.exit(1))

  app.listen(port, hostname)
  status(`Server running on http://${hostname}:${port}/`)

  return config
}

export default createServer
