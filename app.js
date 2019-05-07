var app = require('./config/server');

app.listen(process.env.SERVER_PORT || 3000, function(){
    console.log('rodando');
});