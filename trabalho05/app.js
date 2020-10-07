const express = require ('express');
const app = express();
const http = require('http');
const debug = require('debug')('nodestr:server');
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");



//http://localhost:8080/
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta' + port);

function normalizePort(val){
    const port = parseInt(val, 10);

    if (isNaN(port)){
        return port;
    }

    if (port >= 0){
        return port;
    }
}

function onError(error){
    if (error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port == 'string' ?
        'Pipe ' + port :
        'Port ' + port;
    
    switch (error.code){
        case 'EACCES':
            console.error(bind + ' requises elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            Console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

//handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

//bodyParser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Rotas
app.get('/formulario', function(req, res){
    res.render('formulario');
});

app.get('/informacoes', function(req, res){
    res.render("informacoes");
});

app.post('/informacoes', function(req, res){
    
    //calcular a idade
    var data = req.body.nascimento;
    var calc_idade = require("./modules/calIdade")
    var idade = calc_idade(data); 


    res.send("Nome: "+ req.body.nome + "<br>Matricula: " + req.body.matricula 
    + "<br>Data de Nascimento: " + req.body.nascimento + "<br>Idade: "+idade);
    
})

