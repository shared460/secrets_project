const express = require('express')
const bodyParser = require('body-parser')


const server = express()
const port = 8080;
server.listen(port, ()=>{
    console.log(`server starts at ${port}`)
})

//if this is true then we will load our secret page otherwise no
let authorisation = false

//it is used so that our matter can passed into the body of req
server.use(bodyParser.urlencoded({extended: true}));

server.use((req, res, next)=>{
    //here this body is on json form so password and email are in string
    if(req.body.email === 'secrets@gmail.com' && req.body.password === '12345'){
        authorisation = true;
    }
    next();
})

server.get('/', (req, res) =>{
    res.sendFile('/Users/sharadpoddar/Desktop/web2/secrets_project/src/index.html');
})

server.post('/secrets', (req,res)=>{
    console.log(req.body);
    if(authorisation){
        res.sendFile('/Users/sharadpoddar/Desktop/web2/secrets_project/src/secrets.html');
        authorisation = false
    }else{
        //on failde of authorisation it will redirect to out home page
        res.redirect('/')
    }
})


