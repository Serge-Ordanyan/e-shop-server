var express = require('express')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


require('dotenv/config');

app.use(cors());
app.options('*',cors());


const api = process.env.API_URL;
const productsRouter = require('./routers/products');
const categoriesRoutes = require('./routers/categories');
const usersRoutes = require('./routers/users');
const orderRoutes = require('./routers/orders')
const {process_params} = require("express/lib/router");

//middlewqre
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads',express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//Routers
app.use(`${api}/products`,productsRouter);
app.use(`${api}/categories`,categoriesRoutes);
app.use(`${api}/users`,usersRoutes);
app.use(`${api}/orders`,orderRoutes);





//Database
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser : true,
   useUnifiedTopology : true,
   dbName : 'eshop-database'
})

  .then(()=>{
      console.log('Database Connection is ready...')
  })
  .catch((err)=>{
      console.log(err)
  })



//Development
  //Server
// app.listen(3000,()=>{
//
//     console.log('Server is running http://localhost:3000 ')
// });





//Production
const server = app.listen(process.env.PORT || 3000,function (){
    var port = server.adress().port;
    console.log("Express is workin on port" + port)
})
