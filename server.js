import mysql from 'mysql';
import cors from 'cors';
import express  from 'express';
const app=express();
app.use(express.json());
app.use(cors());
// connected
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'session',
    password:'',

})
db.connect((error)=>{
    if(error){
        console.log('failed connetecd')
    }
    else{
        console.log('connnected')
    }
})
// insert
app.post('/insert',(req,res)=>{
    const{username,password}=req.body;
    const sql="INSERT INTO student(username,password)VALUES(?,?)"
    db.query(sql,[username,password],(error,result)=>{
        if(error) return res.status(500).json('failed')
            return res.status(200).json(result)
    })
})
// insert book
app.post('/insertb',(req,res)=>{
    const{bookname,bborrow	,breturn }=req.body;
    const sql="INSERT INTO books(bookname,bborrow,breturn)VALUES(?,?,?)"
    db.query(sql,[bookname,bborrow,breturn],(error,result,breturn)=>{
        if(error) return res.status(500).json('failed')
            return res.status(200).json(result)
    })
})//selectbook
app.get('/select',(req,res)=>{
    const sql="SELECT * FROM student"
    db.query(sql,(error,result)=>{
      if(error) return res.status(500).json('failed')
            return res.status(200).json(result)   
    })
})
// login session
app.post('/login',(req,res)=>{
    const{username,password}=req.body;
    const sql="SELECT * FROM student WHERE username=? AND password=?"
    db.query(sql,[username,password],(error,result)=>{
       if(error){
        return res.status(500).json('failed')
       }
       if(result.length===0){
        return res.status(401).json('invalid credential')
       }
       return res.status(200).json('welcome loggin')
    })
})


app.listen(2000,()=>{
    console.log('http://localhost:2000')
})