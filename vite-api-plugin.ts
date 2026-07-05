import type { Plugin } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { resolve } from 'node:path'

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolveBody, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      if (!data.trim()) {
        resolveBody({})
        return
      }
      try {
        resolveBody(JSON.parse(data))
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

function createVercelResponse(res: ServerResponse) {
  let statusCode = 200

  return {
    status(code: number) {
      statusCode = code
      return this
    },
    json(payload: unknown) {
      if (!res.writableEnded) {
        res.statusCode = statusCode
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(payload))
      }
      return this
    },
  }
}

export function apiDevPlugin(): Plugin {
  return {
    name: 'vite-api-dev',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split('?')[0]
        if (url === '/webform') {
          const query = req.url?.includes('?') ? `?${req.url.split('?')[1]}` : ''
          req.url = `/webform.html${query}`
        }
        next()
      })

      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url !== '/api/webform') return next()

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        try {
          const mod = await server.ssrLoadModule(resolve(process.cwd(), 'api/webform.ts'))
          const handler = mod.default as (req: unknown, res: unknown) => Promise<unknown>
          const body = req.method === 'POST' ? await readJsonBody(req) : undefined

          await handler(
            {
              method: req.method,
              body,
              headers: req.headers,
            },
            createVercelResponse(res),
          )

          if (!res.writableEnded) {
            res.statusCode = 404
            res.end()
          }
        } catch (error) {
          console.error('[api/webform]', error)
          if (!res.writableEnded) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Internal server error' }))
          }
        }
      })
    },
  }
}
