import build from '../book/build'
import chokidar from 'chokidar'
import EventEmitter from 'events'
import { handleErrors } from '../common/errors'
import Koa from 'koa'
import { PassThrough } from 'stream'
import path from 'path'
import send from 'koa-send'
import { enableLog, disableLog, status, error } from '../common/log'

const createServer = (fulldir, hostname, port) => config => {
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

  // status(`Rendering ${path.relative(config.source, file)}`)
  const onChange = file => {
    status(`Rendering ${path.relative(config.source, file)}`)
    disableLog()
    return build(fulldir)
      .then(() => {
        enableLog()
        dispatcher.emit('reload')
      })
      .catch(handleErrors)
  }

  chokidar
    .watch(config.source)
    .on('change', onChange)
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
