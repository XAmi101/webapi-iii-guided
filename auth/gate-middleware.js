
module.exports = function gate (req, res, next) {
    const password = req.headers.password;
  
    if (password && password === "mellon") {
    next();
    }
    else {
    res.status(401).json({you: "Shall not pass"})

    //next(401); or next("Shall not pass"); << goes to the error handler in server.js
    }
  }