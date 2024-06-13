//Note: Importing everything needed
const express = require('express');
const db = require('./config/connections');
const routes = require('./routes');

//Note: Creating an instance of an Express application & defining the port
const app = express();
const PORT = process.env.PORT || 3001;

//Note: Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

//Note: Once db connection is open, start the server
db.once('open', () => {
    app.listen(PORT, () => {
    console.log(`API server is running on the following port: ${PORT}`); 
    });
});