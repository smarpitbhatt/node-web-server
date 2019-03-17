const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT||3000;


var app = express();

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear',()=> {
	return new Date().getFullYear();

});

// hbs.registerHelper('scream',(text)=>{
// 	return text.toUpperCase();
// });
app.set('view engine','hbs');

app.use(express.static(__dirname+'/public'));

app.use((req,res,next) =>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err){console.log("error!")};
	});

	next();
});

// app.use((req,res,next)=>{
// 	res.render('maintainence.hbs');
// });

app.get('/', (req,res) => {

	res.render('home.hbs',{
		pageTitle: 'HOMEPAGE',
		welcomeMessage: 'Heya friend You are welcomed!',
	});

});

app.get('/about',(req,res) => {

	res.render('about.hbs',{
		pageTitle: 'About Page',
	});

});

app.get('/reactiontester',(req,res)=>{
	res.render('reactiontester.hbs');
});

app.listen(port,() => {
	console.log("server is up and running! port ->${port}");
});