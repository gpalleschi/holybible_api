const Constants = require('./constants');
const utility = require('./utility');
const dbBible = require ('./dbBible');

const checkNumeric = ( value ) => {
	let ret = true
	if ( typeof value != 'undefined' ) {
	  if ( !isNaN(value) ) {
	     ret = true;	
          } else {
	     ret = false;	
  	  }
	}

	return ret;
}

// String format es. Ge.3:1-23;Le
const checkSearch = ( search ) =>  {

	let toSearch = [];
	let retValue = {'error' : null,
                        'toSearch' : toSearch};


	// toSearch format :
	//   { 'input_string' : 'Ge.1:1-2'
	//     'short_name' : 'Ge',
	//     'chapter' : 1,
	//     'from' : 1,
	//     'to' : 2 }
	const searches = search.split(';');

	// Loop for searches strings
	for(let i=0;i<searches.length;i++) {
		let book = searches[i].split('.');
		let input_string = searches[i];
		let short_name = book[0];
		if ( book[0].length === 0 ) {
		   retValue.error = 'Error in search string : ' + searches[i] + ' Book ' + book[0] + ' not present.';
		   break;
		}
                let chapter = null;
		let from = null;
		let to = null;
		if ( book.length > 2 ) {
		   retValue.error = 'Error in search string : ' + searches[i] + ' too much . characters .';
		   break;	
		}	
		if ( book.length > 1 ) {
		   const verses = book[1].split(':');
		   if ( !isNaN(verses[0]) ) {
                      chapter = verses[0]; 
		   } else {
		      retValue.error = 'Error in search string : ' + searches[i] + ' chapter not numeric.';
		      break;	
		   }

		   if ( verses.length > 2 ) {
		      retValue.error = 'Error in search string : ' + searches[i] + ' too much : characters.';
		      break;	
		   }

		   if ( verses.length > 1 ) {
			if ( verses.length == 2 ) {
			   let from_to = verses[1].split('-');
			   if ( from_to.length > 0 ) {
		              if ( from_to.length == 1 ) {
				 if ( !isNaN(from_to[0]) ) {
		                    from = from_to[0];
				 } else {
			           retValue.error = 'Error in search string : ' + searches[i] + ' verse : ' + from_to[0] + ' Not numeric.';
				   break;
				 }    

			      } else {
		                if ( from_to.length == 2 ) {		   
				   if ( !isNaN(from_to[0]) && from_to[0].length > 0 ) {
		                      from = from_to[0];
				   } else {
			             retValue.error = 'Error in search string : ' + searches[i] + ' verse : ' + from_to[0] + ' Not numeric.';
				     break;
				   }    					
    				   if ( !isNaN(from_to[1]) && from_to[1].length > 0 ) {
		                      to = from_to[1];
				   } else {
			             retValue.error = 'Error in search string : ' + searches[i] + ' verse : ' + from_to[1] + ' Not numeric.';
				     break;
				   }    

				   if ( from > to ) {
			             retValue.error = 'Error in search string : ' + searches[i] + ' verse to less than to.';
				     break;
				   }
			        } else {
			          // Condizione di errore tipo Ge.1-2-2	
			          retValue.error = 'Error in search string : ' + searches[i] + ' too much - characters.';
			          break;
				}

			      }
			   }
			   toSearch.push({'input_string' : searches[i],
	                                  'short_name' : short_name,
					  'chapter' : chapter,
	                                  'from' : from,
	                                  'to' : to });
			} else {
			   if ( verses.length == 1 ) {	
			      toSearch.push({'input_string' : searches[i],
	                                     'short_name' : short_name,
					     'chapter' : chapter,
	                                     'from' : from,
	                                     'to' : to });
			   }		   
			   else {
			     retValue.error = 'Error in search string : ' + searches[i] + ' not in correct format.';
			     break;
			   }
			}
		   } else {
		      toSearch.push({'input_string' : searches[i],
	                             'short_name' : short_name,
		         	     'chapter' : chapter,
	                             'from' : from,
	                             'to' : to });
		   }
	        } else {
		      toSearch.push({'input_string' : searches[i],
	                             'short_name' : short_name,
		         	     'chapter' : chapter,
	                             'from' : from,
	                             'to' : to });			
		}
	}
	return retValue;
}

const checkGenericParam = (nameParam, value) => {

	let retValue = {'error' : null };

	if ( typeof value === 'undefined' ) {
	   retValue = utility.retErr(101,'checkParameters',`Error ${nameParam} parameter not present.`);
	} else {
	  if ( !value.length ) {
	     retValue = utility.retErr(101,'checkParameters',`Error length ${nameParam} parameter equal 0.`);
	  }
	}
	return retValue;
}

const checkParameters = (language, version) => {
	let retValue = { 'error' : null,
	                 'language' : null,
			 'version' : null,
			 'description' : null,
                         'bible' : null,};
	if ( typeof language === 'undefined' ) {
	   retValue = utility.retErr(101,'checkParameters','Error language parameter not present.');
	}
	else {
	   if ( Constants.LANGUAGES.includes(language) === false ) {
	      retValue = utility.retErr(102,'checkParameters','Error language <' + language + '> not managed.');
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
	          retValue['language'] = Constants.BIBLES_VERSIONS[i].language;
	          retValue['version'] = Constants.BIBLES_VERSIONS[i].name;
	          retValue['description'] = Constants.BIBLES_VERSIONS[i].description;
	          break;	   
               }
           }

	   if ( i === Constants.BIBLES_VERSIONS.length ) {
	      retValue = utility.retErr(103,'checkParameters','Error Bible version <' + version + '> for languge <' + language + '> not found.');
	   }
	}	
	return retValue;
}

module.exports = {
  checkParameters : checkParameters,
  checkGenericParam : checkGenericParam,
  checkSearch : checkSearch,
  checkNumeric : checkNumeric
};
