const express = require('express');
const cors = require('cors');

//import * as Constants from './controllers/constants';
const Constants = require('./controllers/constants');
const dbBible = require ('./controllers/dbBible');
const checkFun = require ('./controllers/checkFun');
//import { dbBible } from './controllers/dbBible.js';


// App definition
const app = express();

// To read body correctly 
app.use(express.json());

// Access Permission between client and server
app.use(cors());

const port=process.env.PORT || Constants.DEFAULT_PORT;

app.get('/',(req,res)=>{
	res.send('Server mypersonalshopper_api version ' + Constants.VERSION_SERVER + ' is running on port ' + port);
})

// Return all Bibles versions loaded BIBLES_VERSIONS Constant Array
app.get('/versions',(req,res)=>{
	res.send({'versions' : Constants.BIBLES_VERSIONS});
})

// Return all languages managed
app.get('/languages',(req,res)=>{
	res.send({'languages' : Constants.LANGUAGES});
})

// Call random passing two parameters language={es, it, en} version={NR94, ESV, RVA15} [version is optional]
app.get('/random',(req,res)=>{
	const { language, version } = req.query;
	const retBible = checkFun.checkParameters( language, version);

	if ( retBible.error === null ) {
	  const db = dbBible.dbBible(retBible);

	  if ( db != null ) {
             const ret = dbBible.dbRandom(db, res, retBible);
	  } else {
	    res.status(400).json('Error Connection DB');
	  }
	} else {
	  res.status(400).json(retBible);
	}
})

// Find a string in all verses passing three parameters language={es, it, en} version={NR94, ESV, RVA15} [version is optional] search={ String to search }
app.get('/find',(req,res)=>{
	const { language, version, search } = req.query;
	const retBible = checkFun.checkParameters( language, version);
	const retCheck = checkFun.checkGenericParam('search', search);

	if ( retCheck.error ) {
	    res.status(400).json(retCheck);
	}
	else {
	  if ( retBible.error === null ) {
	     const db = dbBible.dbBible(retBible);
	     if ( db != null ) {
                const ret = dbBible.dbFind(db, res, retBible, search);
	     } else {
	       res.status(400).json('Error Connection DB');
	     }
	  }
	}
})

console.log('Starting Server ...... ');

app.listen(port, () => {
	console.log('Server holybible_api version ' + Constants.VERSION_SERVER + ' is running on port ' + port)
});