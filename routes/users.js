var express = require('express');
var router = express.Router();
var db = require('../db/evaluation')
//jwt
var jwt = require('jsonwebtoken')

const config = require('../config')
var bcrypt = require('bcrypt')

const handleToken = (req, res, next) => {
  //if autorization and valid token
  //return next
  //if not 401
   //[0] = Bearer ===== [1] = token
   let token = req.headers['authorization'].split(' ')[1]
   jwt.verify(token, config.JWT_KEY, (err, decode) => {
       
       if(!err){
           next()
       }else{
           res.status(401).json({
               success: false,
               error: err
           })
       }
   })
}

//insert
router.post('/register', (req, res, next) => {
  const { book, conservation, content, user } = req.body.userEvaluation

    const dataToInsert = {
    Livro: book,
    Conservação: conservation,
    Conteúdo: content,
    user:user
  }
 console.log(dataToInsert)
  const handler = (err, result) => {
    if(!err){
      res.json({
          success: true,
          message: "Avaliação Registrada",
          error: err
      })
    }else{
      res.json({
        success: false,
        message: "Não foi possivel registrar sua avaliação",
        error: err
    })
    }
  }
  db.register(dataToInsert, handler)

})

/* GET users listing. */
router.post('/listusers', handleToken, (req, res, next) => {
  //needto be authorization (verify the tojen)
  //return the list os user
  const handler = (err, result) => {
    if(!err && result != null){
      result.toArray((err, data) => {
        if(!err){
          res.json({
              success: true,
              message: "The List users",
              data: data
          })
        }
      })
    }else{
      res.json({
        success: false,
        message: "An error happened",
        error: err
    })
    }
  }
  db.findAll(handler)
})

router.post('/avaliar', (req, res, next) => {
  const {Livro, user} = req.body.user
  let data = {Livro:Livro, user:user}
 
  const handler = (err, result) => {
    if(!err && result != null){
      result.toArray((err, data) => {
        var avaliar = data.length > 0 ? false:true
        if(!err){
          if(avaliar){
            res.json({
              success: true,
              message: "Você pode Avaliar",
              data: data
          })
          
          }else{
            res.json({
              success: false,
              message: "Você já avaliou este livro",
              data: data
            })
          }
          console.log(avaliar)
          
        }
      })
    }else{
      res.json({
        success: false,
        message: "Ocorreu um erro",
        error: err
    })
    }
  }

  console.log(data)
  db.findBook(data, handler)
})



module.exports = router;
