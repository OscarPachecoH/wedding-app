const express = require('express');
const cors = require('cors');

const { PORT } = require('./src/config.js');

const loginRoutes = require('./src/routes/login.routes.js');
const personasRouter = require('./src/routes/personas.routes.js');
const casarRouter = require('./src/routes/casar.routes.js');

const app = express();

app.use(cors());

app.use(express.json());

app.use(loginRoutes);

app.use(personasRouter);

app.use(casarRouter);

app.use((req, res, next) => {
    res.status(500).json({
        message: 'Endpoint not found'
    })
})

app.listen(PORT);
console.log('Server is running', PORT);