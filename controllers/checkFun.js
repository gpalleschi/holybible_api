const Constants = require('./constants');
const utility = require('./utility');

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
  checkGenericParam : checkGenericParam
};
