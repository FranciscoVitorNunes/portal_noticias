const express = require('express');
const mongoose = require('mongoose');

var bodyParser = require('body-parser')

const path = require('path');

const app = express();

const Posts = require('./Posts.js');

mongoose.connect('mongodb+srv://franvinu:Vito5757!@cluster0.nk6o00b.mongodb.net/portal_news?retryWrites=true&w=majority&appName=Cluster0', {useNewUrlParser: true, useUnifiedTopology: true}).then(function(){
    console.log('Conectado com  sucesso');
}).catch(function(err){
    console.log("fala na conexão!!!");
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));


app.get('/', async (req, res) => {
    if (!req.query.busca) {
        try {
            const posts = await Posts.find({}).sort({ _id: -1 });
            console.log(posts[0]);
            res.render('home', { posts });
        } catch (err) {
            console.error(err);
            res.status(500).send("Erro ao buscar posts");
        }
    } else {
        res.render('busca', {});
    }
});


app.get('/:slug',(req,res)=>{
    //res.send(req.params.slug);
    res.render('single',{});
})



app.listen(5000,()=>{
    console.log('server rodando!');
})