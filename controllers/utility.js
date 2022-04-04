
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

	let retMsg = { "language" : infoBible.language,
                       "name": infoBible.version,
                       "description": infoBible.description,
		       "books" : []
	};

        let i;
	for(i=0;i<books.length;i++) {
		if ( previousBook != books[i].long_name ) {
			if ( verse ) {
			   booksToAdd.push({"book_number": books[i].book_number,
                                            "short_name": books[i].short_name,
                                            "long_name": books[i].long_name,
                                            "chapters" : []
			                   });
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
		          booksToAdd[booksToAdd.length-1].chapters.push({"chapter" : books[i].chapter,
		                                                         "verses" : []})	  
		          previousChapter = books[i].chapter;			  
		   }

		   booksToAdd[booksToAdd.length-1].chapters[booksToAdd[booksToAdd.length-1]
		             .chapters.length-1].verses.push({"verse": books[i].verse,
			                                      "text" : books[i].text});
		}
	}
	retMsg.books = booksToAdd;

	return retMsg;
}

module.exports = {
  retErr : retErr,
  formatMsg : formatMsg,
};