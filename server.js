const express = require('express');
const cors = require('cors');

//import * as Constants from './controllers/constants';
const Constants = require('./controllers/constants');
const dbBible = require ('./controllers/dbBible');
//import { dbBible } from './controllers/dbBible.js';



const checkParameters = (language, version) => {
	let retValue = { 'error' : null,
                         'bible' : null};
	if ( typeof language === 'undefined' ) {
	   retValue = {'error' : 'Error language parameter not present.'};
	}
	else {
	   if ( Constants.LANGUAGES.includes(language) === false ) {
	      retValue = {'error' : 'Error language <' + language + '> not managed.'}
	   }
	}
	if ( retValue.error === null ) {
           let i; 
           for (i = 0; i < Constants.BIBLES_VERSIONS.length; i++) {
	       if ( Constants.BIBLES_VERSIONS[i].language === language &&
		    ((typeof version != 'undefined' && Constants.BIBLES_VERSIONS[i].name === version) ||
		    (typeof version === 'undefined' && Constants.BIBLES_VERSIONS[i].default === 'Y'))
		  ) {
	          retValue['bible'] = Constants.BIBLES_VERSIONS[i].file;
	          break;	   
               }
           }

	   if ( i === Constants.BIBLES_VERSIONS.length ) {
	      retValue = {'error' : 'Error Bible version <' + version + '> for languge <' + language + '> not found.'};
	   }
	}	
	return retValue;
}

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
	res.send(Constants.BIBLES_VERSIONS);
})

// Call random passing two parameters language={es, it, en} version={NR94, ESV, RVA15} [version is optional]
app.get('/random',(req,res)=>{
	const { language, version } = req.query;
	const retBible = checkParameters( language, version);

	if ( retBible.error === null ) {
	  const db = dbBible.dbBible(retBible);

	  if ( db != null ) {
		  const ret = dbBible.dbRandom(db, res);
	  }
	} else {
	  res.status(400).json(retBible);
	}
})


console.log('Starting Server ...... ');

app.listen(port, () => {
	console.log('Server holybible_api version ' + Constants.VERSION_SERVER + ' is running on port ' + port)
});