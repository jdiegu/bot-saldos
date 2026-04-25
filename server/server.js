const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

app.use(cors())
app.use(bodyParser.json())


app.use("/api/saldo", require("./routes/client.routes"));


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected...'))
    .catch((err) => console.log(err))

app.listen(process.env.PORT, () => console.log(`App listening at port: ${process.env.PORT}`))
