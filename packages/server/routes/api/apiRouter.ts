import express from 'express'

export const apiRouter = express.Router()

apiRouter.route('/').get((req, res) => {
  res.json(`👋 Howdy from the server :) ${req.baseUrl}`)
})
