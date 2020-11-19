const express = require('express')
const compression = require('compression')
const cors = require('cors')

const opening = require('./routes/opening')
const mal = require('./routes/mal')

// create app
const app = express()
const srv = require('http').Server(app)
app.use(compression())
app.use(cors())

// setup routes
app.get('/', (req, res) => res.send({status: 'ok'}))
app.get('/opening', opening)
app.use('/mal', mal)

// listen
srv.listen(process.env.PORT, () => {
  console.log('listening on ' + process.env.PORT)
})
