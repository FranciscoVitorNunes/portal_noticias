const express = require('express');
const mongoose = require('mongoose');

var bodyParser = require('body-parser')

const path = require('path');

const app = express();

const session = require('express-session')

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
app.use(session({secret:'dg236d623d63',cookie:{mxAge:60000}}));

app.get('/', async (req, res) => {
    if (!req.query.busca) {
        try {
            const postsDB = await Posts.find({}).sort({ _id: -1 });
            const posts = postsDB.map(function(val){
                return {
                    titulo: val.titulo,
                    conteudo: val.conteudo,
                    descricaoCurta: val.conteudo.substring(0, 10),
                    imagem: val.imagem,
                    slug: val.slug,
                    categoria: val.categoria
                }
            });
            const postsTopList = await Posts.find({}).sort({ 'views': -1 }).limit(3);
            const postsTop = postsTopList.map(function(val){
                return {
                    titulo: val.titulo,
                    conteudo: val.conteudo,
                    descricaoCurta: val.conteudo.substring(0, 10),
                    imagem: val.imagem,
                    slug: val.slug,
                    categoria: val.categoria,
                    views: val.views
                }
            });
            res.render('home', { posts: posts, postsTop: postsTop });
        } catch (err) {
            console.log(err);
            res.status(500).send("Erro ao buscar posts");
        }
    } else {
        try{
            const buscaPosts = await Posts.find({titulo: {$regex: req.query.busca, $options:"i"}});
            console.log(buscaPosts);
            res.render('busca', {posts: buscaPosts, contagem:buscaPosts.length});
        
    } catch (err){
        console.log(err);
    }

    }
});


app.get('/:slug', async (req, res) => {
    try {
        const resposta = await Posts.findOneAndUpdate(
            { slug: req.params.slug },
            { $inc: { views: 1 } },
            { new: true }
        );

        const postsTopList = await Posts.find({}).sort({ 'views': -1 }).limit(3);
        const postsTop = postsTopList.map(function(val){
            return {
                titulo: val.titulo,
                conteudo: val.conteudo,
                descricaoCurta: val.conteudo.substring(0, 10),
                imagem: val.imagem,
                slug: val.slug,
                categoria: val.categoria,
                views: val.views
            }
        });

        res.render('single', {
            noticia: resposta, postsTop: postsTop
        });
    } catch (err) {
        res.redirect('/');
    }
});

const usuarios = [
    { usuario: "vitor", senha: "1" }
]
app.post('/admin/login', (req, res) => {
    const { login, senha } = req.body;
    const user = usuarios.find(u => u.usuario === login && u.senha === senha);

    if (user) {
        req.session.login = user.usuario;
        return res.redirect('/admin/login');
    } else {
        return res.send('Login inválido');
    }
});
app.post('/admin/cadastrar',(req,res)=>{
    Posts.create({
        titulo: req.body.titulo,
        imagem: req.body.imagem,
        categoria: req.body.categoria,
        conteudo: req.body.conteudo,
        slug: req.body.slug,
        autor: 'Vitor',
        views: 0      
    })
    res.redirect('/admin/login');
})
app.get('/admin/excluir/:id',(req,res)=>{
    Posts.deleteOne({_id:req.params.id}).then(()=>{
        res.redirect('/admin/login');
    })
})
app.post('/admin/editar/:id',(req,res)=>{
    Posts.updateOne({
        titulo: req.body.titulo,
        imagem: req.body.imagem,
        categoria: req.body.categoria,
        conteudo: req.body.conteudo,
        slug: req.body.slug,
    });

})

app.get('/admin/login', async(req,res)=>{
    if(req.session.login== null) {
        res.render('admin-login');
    } 
    else{
        try {
            const postsDB = await Posts.find({}).sort({ _id: -1 });
            const posts = postsDB.map(function(val){
                return {
                    id: val._id,
                    titulo: val.titulo,
                    conteudo: val.conteudo,
                    descricaoCurta: val.conteudo.substring(0, 10),
                    imagem: val.imagem,
                    slug: val.slug,
                    categoria: val.categoria
                }
            });
            
            res.render('admin-painel', { posts: posts });
        } catch (err) {
            console.log(err);
            res.status(500).send("Erro ao buscar posts");
        }    }
});

app.listen(5000,()=>{
    console.log('server rodando!');
})