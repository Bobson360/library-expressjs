var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/admin', (req, res, next) => {
  const { email, pass } = req.body.user
  res.json({
      user: email,
      pass: pass
  })
});

router.get('/', (req, res, next) => {
    res.send('Admin page')
})

module.exports = router;
