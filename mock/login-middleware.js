module.exports = (req, res, next) => {
  console.log(1111, req.path)
  if (req.method === 'POST' && req.path.indexOf('/login') >= 0) {
    if (req.body.username === 'admin' && req.body.password === '123456') {
      res.status(200).json({
        result: 'success',
        token: 'h21dh2398ru9su98u23d989dsacih2399wfd'
      })
    } else {
      res.status(400).json({
        result: 'error',
        message: 'login failed'
      })
    }
  } else {
    next()
  }
}
