const express = require('express');
var cors = require('cors')
var http = require('http');

const router = express.Router({ mergeParams: true });
require("./dbconnection/db");

const app = express()
app.use(
    express.urlencoded({limit: '50mb'})
);
let server = http.Server(app);



app.use(express.json({limit: '50mb'}));

app.use(cors())
const donate=require('./router/donationcardrouter');
const reason=require('./router/reasonrouter');
const banner=require('./router/banner');



app.use('/api',donate);
app.use('/api',reason);
app.use('/api',banner);





//-----------------------------------------------------------port--------------------------------------------------------------------
const port = process.env.PORT || 5000;


server.listen(port, (req, res) => {
    console.log('server start at ' + port);
})