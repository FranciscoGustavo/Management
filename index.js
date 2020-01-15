const express = require('express');
const app = express();

const cors = require('cors');

const morgan = require('morgan');
const { port } = require('./config');

const AuthRoutes = require('./routes/AuhtRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');

app.use(cors('*'))
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

AuthRoutes(app);
CategoryRoutes(app);

app.listen(port, () => console.log(`Server is runing in port: ${port}`));