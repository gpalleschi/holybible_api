
const retErr = (errorCode, functionName, errorDesc) => {
	return ( { 'error' : errorCode,
	           'function' : functionName,
	           'description' : errorDesc
	});
}

//
// books are sorted, and verses too
//
const formatMsg = (infoBible, books, verse=true) => {

	let previousBook = 'xyxyx';
	let previousChapter = -1;
	let booksToAdd = [];
	let chaptersToAdd = [];
	let versesToAdd = [];

	let retMsg = { "language" : infoBible.language,
                    "name": infoBible.version,
                    "description": infoBible.description,
		    "books" : booksToAdd
	};

        let i;
	for(i=0;i<books.length;i++) {
		if ( previousBook != books[i].long_name ) {
			if ( verse ) {

			   booksToAdd.push({"book_number": books[i].book_number,
                                            "short_name": books[i].short_name,
                                            "long_name": books[i].long_name,
                                            "chapters" : chaptersToAdd
			                   });
			   chaptersToAdd.splice(0, chaptersToAdd.length);
			   versesToAdd.slice(0,versesToAdd.length);
			} else {
			   booksToAdd.push({"book_number": books[i].book_number,
                                            "short_name": books[i].short_name,
                                            "long_name": books[i].long_name,
					    "chapters": books[i].chapters,
					    "verses": books[i].verses,
			                   });

			}
			previousBook = books[i].long_name;		
		}
		if ( verse ) {

		   if ( previousChapter != books[i].chapter ) {
		          chaptersToAdd.push({"chapter" : books[i].chapter,
		                              "verses" : versesToAdd})	  
		          versesToAdd.slice(0,versesToAdd.length);
		          previousChapter = books[i].chapter;			  
		   }
   	           versesToAdd.push({"verse": books[i].verse,
			             "text" : books[i].text});
		}
	}
	return retMsg;
}

module.exports = {
  retErr : retErr,
  formatMsg : formatMsg,
};