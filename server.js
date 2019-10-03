const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');
const gate = require ("./auth/gate-middleware.js")

const server = express();


//custom middleware
function methodLogger(req, res, next) {
  // console.log(`${req.method} Request`);
  console.log(`${req.method} Request to ${req.path}`);

  next();
}


// function gate (req, res, next) {
//   const password = req.headers.password;

//   if (password && password === "mellon") {
//   next();
//   }
//   else {
//   res.status(401).json({you: "Shall not pass"})
//   }
// }

/*these 3 are setup for global middleware 
(these look at every middleware that comes into the server and is normally called on the "server." or the "router." )>>> */
    server.use(methodLogger);  //<< we are calling next(); which then moves the request t o the next middleware  which os line 15 with "server.use(express.json());"

    //<<3rd party middleware
    server.use(helmet()); 

    /* built in middleware */
    server.use(express.json()); //<< next here and the .json then moves the request to line 17  

    // server.use(methodLogger);
    // server.use(addName);


server.get('/free', (req, res) => {
  res.status(200).json({welcome: 'Web 20 Developers!'});
});

server.get('/paid', gate, (req, res) => {
  // res.status(401).json({you: 'Shall not pass!'}); <<moved to gate func
  res.status(200).json({welcome: 'to the mine of Eskard'});

});

function addName(req, res, next) {
  req.name = "CAMII";
  next();
}

server.use('/api/hubs', gate, hubsRouter); //<< the here to the router

server.get('/', addName, (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});




// error handling middleware
server.use((error, req, res, next) => {
  // here you could inspect the error and decide how to respond
  console.log(error)
  res.status(401).json({ message: 'Bad Panda!', error });
});
/* ^^^ this only gets excuted when someone call next(401) and passes a value like the "401" or error , next(error) */ 

// mw > mw > mw > ehw > mw > mw > ehw > mw > mw > mw 



module.exports = server;







/**
 
server.use(errorHandler);

  function errorHandler (error, req, res, next) => {
  // here you could inspect the error and decide how to respond
  console.log(error)
  res.status(401).json({ message: 'Bad Panda!', error });
});

 */