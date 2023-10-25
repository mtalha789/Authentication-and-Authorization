const express =require('express')
const bcrypt = require('bcryptjs')
const connection = require('./db')
const jwt = require('jsonwebtoken')

const router = express.Router()
const secretKey = 'papaKoBalaluGa'

router.post('/signup',(req,res)=>{
    try {
        const { username , name , email ,password } =req.body 
        password && name && email && username ? null : res.status(400).json('fields required');
            bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, (err, hash) =>{   
                if(err){
                    console.log(err);
                    res.send(err)
                }
                else{
                    const query = `
                    INSERT INTO  user 
                    (email,name,username,password)
                    VALUES
                    ('${email}','${name}','${username}','${hash}');
                    `
                    connection.query(query,(error,rows,cols)=>{
                        if (error) 
                            res.status(400).json({message:error})
                        else
                            res.send('registered successfully')
                    })
                }
            });
        });
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
})

router.post('/signin',(req,res)=>{
    try {
        const { email , password } = req.body
        const query = `SELECT * FROM user WHERE email ='${email}'`
        connection.query(query,(err,result)=>{
            if(err) console.log(err);
            if(result.length===0){
                res.status(400).json({message:'Email is not registered'})
            }
            else{
                const hash = result[0].password
                bcrypt.compare(password,hash,(error,response)=>{
                    if(response){
                        jwt.sign({email,password:hash},secretKey,(err,token)=>{
                            res.cookie('authenticatin',token)
                            res.send('Logged in successfully')
                        })
                    }
                    else
                        res.status(400).json({message:'Incorrect Password'})
                })
            }
        })
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
})

module.exports=router