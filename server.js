const express = require('express');
const cors = require('cors');

//import * as Constants from './controllers/constants';
const pjson = require('./package.json');
const Constants = require('./controllers/constants');
const dbBible = require ('./controllers/dbBible');
const checkFun = require ('./controllers/checkFun');
const utility = require('./controllers/utility');
//import { dbBible } from './controllers/dbBible.js';

// App definition
const app = express();

// To read body correctly 
app.use(express.json());

// Access Permission between client and server
app.use(cors());

const port=process.env.PORT || Constants.DEFAULT_PORT;

app.get('/',(req,res)=>{
	res.send('Server ' + pjson.name + ' version ' + pjson.version + ' is running on port ' + port);
})

// Return all Bibles versions loaded BIBLES_VERSIONS Constant Array
app.get('/versions',(req,res)=>{
	res.send({'versions' : Constants.BIBLES_VERSIONS});
})

// Return all Books for a version passing two parameters language={es, it, en} version={NR94, ESV, RVA15, ...} [version is optional, if not present will use default version for language] 
app.get('/books',(req,res)=>{
	const { language, version } = req.query;
	const retBible = checkFun.checkParameters( language, version);

        if ( retBible.error === null ) {
	  const db = dbBible.dbBible(retBible);

	  if ( db != null ) {
             dbBible.dbBooks(db, res, retBible);
	  } else {
	    res.status(401).json(utility.retErr(401,'server.js','Error Connection DB'));
	  }
	} else {
	  res.status(400).json(retBible.error);
	}

})


// Return all languages managed
app.get('/languages',(req,res)=>{
	res.send({'languages' : Constants.LANGUAGES});
})

// Call random passing two parameters language={es, it, en} version={NR94, ESV, RVA15, ...} [version is optional, if not present will use default version for language] 
app.get('/random',(req,res)=>{
	const { language, version } = req.query;
	const retBible = checkFun.checkParameters( language, version);

	if ( retBible.error === null ) {
	  const db = dbBible.dbBible(retBible);

	  if ( db != null ) {
             dbBible.dbRandom(db, res, retBible);
	  } else {
	    res.status(400).json('Error Connection DB');
	  }
	} else {
	  res.status(400).json(retBible.error);
	}
})

// Find and return verses.
app.get('/find',(req,res)=>{
	const { language, version, search } = req.query;
	const retBible = checkFun.checkParameters( language, version);
	if ( retBible.error != null ) {
	   res.status(400).json(retBible.error);	
	}	
	const retCheck = checkFun.checkGenericParam('search', search);
        if ( retCheck.error ) {
	     res.status(400).json(retCheck);
	     return;
	}

	const db = dbBible.dbBible(retBible);
	if ( db === null ) {
	   res.status(400).json(utility.retErr(400,'find','Error Connection DB'));
	   return;
	}	

	const retSearch = checkFun.checkSearch(search, db);
	//res.status(200).json(Object.assign({},retSearch));	
        
	if ( retSearch.error ) {
	   res.status(400).json(utility.retErr(400,'find',retSearch.error));
	   return;
	} else {
	   dbBible.dbFind(db, res, retBible, retSearch['toSearch']);	
	}
})

// Search a word or a sentence and return how many is present in each book 
app.get('/search',(req,res)=>{
	const { language, version, word, limit } = req.query;

	const retBible = checkFun.checkParameters( language, version);
	if ( retBible.error != null ) {
	   res.status(400).json(retBible.error);	
	}	

	const retCheck = checkFun.checkGenericParam('word', word);
        if ( retCheck.error ) {
	     res.status(400).json(retCheck);
	     return;
	}

	if ( !checkFun.checkNumeric(limit) ) {
	   res.status(400).json(utility.retErr(400,'search','Error limit not numeric.'));
	   return;   	
	}

	const db = dbBible.dbBible(retBible);
	if ( db === null ) {
	   res.status(400).json(utility.retErr(400,'search','Error Connection DB.'));
	   return;
	}	

	dbBible.dbSearch(db, res, retBible, word, limit);
})

console.log('Starting Server ...... ');

app.listen(port, () => {
	console.log('Server ' + pjson.name + ' version ' + pjson.version + ' is running on port ' + port)
});