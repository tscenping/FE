import http from 'http'
import { parse } from 'url'
import next from 'next'

const dev: boolean = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT: number = 8000

app.prepare().then(() => {
  http
    .createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
      const parsedUrl = parse(req.url!, true)
      handle(req, res, parsedUrl)
    })
    .listen(PORT, (err?: Error) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${PORT}`)
    })

  const https = require('https')
  const fs = require('fs')
  const options = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem'),
  }
  https
    .createServer(options, function (req: http.IncomingMessage, res: http.ServerResponse) {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url!, true)
      handle(req, res, parsedUrl)
    })
    .listen(PORT + 1, (err?: Error) => {
      if (err) throw err
      console.log(`> Ready on https://localhost:${PORT + 1}`)
    })
})
