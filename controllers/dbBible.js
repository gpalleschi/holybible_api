var Constants = require('./constants');
var utility = require('./utility');


const getRandomArbitrary = (min, max) => {
  return Math.trunc(Math.random() * (max + 1 - min) + min);
}

const getBook = (book, db, res) => {

  let retBook = { 'error' : null,
                  'book' : null,
                  'chapters' : 0,
                  'verses' : 0};

  db('books').count('short_name as CNT')
             .where('short_name','=',book)
             .then( info => {
               if ( !info[0].CNT ) {
                 retBook['error'] = 'not exists.';
               } else {
                 retBook['book'] = book;
               }
               return retBook;
             })
             .catch(err => {
               res.status(401).json(utility.retErr(401,'getBook',err.code + ' : ' + err.message));	
               return retBook;
             });  
}

const dbBible = (bibleInfo) => {
	const dbFileName = Constants.DB_PATH + bibleInfo.bible;
  const db =  require('knex')({
    client: 'better-sqlite3', // or 'better-sqlite3'
    connection: {
      filename: dbFileName 
    }
  });

  db.raw('select 1+1 as result').catch(err => {
    console.log('Error : ' + err);
  return null;
  }).then(console.log('Db Connection to file ' + dbFileName + ' OK.'));

  return db;
}

const dbBooks = (db, res, retBible) => {

  db.select('books.book_number', 'short_name', 'long_name', db.raw('count(distinct chapter) as chapters, count(verse) as verses'))
    .from('books')
    .join('verses','books.book_number','verses.book_number')
    .groupByRaw('books.book_number, short_name, long_name')
    .orderBy('books.book_number')
    .then( resbooks => {
      let books = [];
      for(let i=0;i<resbooks.length;i++) {
        books.push(resbooks[i.toString()]);
      }
      const ret = utility.formatMsg(retBible, books, false);
      res.status(200).json(Object.assign({},ret));	
    })
    .catch(err => {
           res.status(401).json(utility.retErr(401,'dbBooks',err.code + ' : ' + err.message));	
          })   
}

const dbRandom = (db, res, retBible, book='%%') => {

     db.select('books.book_number', 'books.short_name', 'books.long_name','verses.chapter','verses.verse','verses.text')
       .from('books')                         
       .join('verses','books.book_number','verses.book_number')
       .whereLike('books.short_name',book)
       .orderByRaw('random() limit 1')
       .then( resVerse => {
              let books = [];
              console.log('resVerse.length : ' + resVerse.length );
              if ( !resVerse.length ) {
                 res.status(401).json(utility.retErr(401,'dbRandom','Book ' + book + ' Not found.'));	
              }
              else {
                 books.push(resVerse['0']);
                 const ret = utility.formatMsg(retBible, books);
                 //res.status(200).json(Object.assign({},resVerse['0']));	
                 res.status(200).json(Object.assign({},ret));	
              }
            })
        .catch(err => {
              res.status(401).json(utility.retErr(401,'dbRandom',err.code + ' : ' + err.message));	
        })
     return;
}

const dbFind = async (db, res, retBible, searches) => {
     let books = [];
     let bError = false;

     for(let i=0;i<searches.length;i++) {

       let chapterToFind = (searches[i].chapter === null)?'%%':searches[i].chapter; 
       let verseFrom = (searches[i].from === null)?'0':searches[i].from
       let verseTo = (searches[i].to === null && searches[i].from === null)?'999':((searches[i].to === null)?searches[i].from:searches[i].to)

       try { 
       await db.transaction(async trx => {
          await trx('books').join('verses','books.book_number','verses.book_number')
            .select('books.book_number', 'books.short_name', 'books.long_name','verses.chapter','verses.verse','verses.text')
            .where('books.short_name', searches[i].short_name)
            .whereLike('verses.chapter',chapterToFind)
            .where('verses.verse','>=',parseInt(verseFrom))
            .where('verses.verse','<=',parseInt(verseTo))
            .then( resVerses => {
               for(let j=0;j<resVerses.length;j++) {
                  books.push(resVerses[j.toString()]);
               }

               // If not return nothing 
               if ( !resVerses.length ) {
                  res.status(401).json(utility.retErr(401,'dbFind','Not results for ' + searches[i].input_string + ' .'));	
                  bError = true;
                  return;
               }
            })
            .catch(err => {
               res.status(401).json(utility.retErr(401,'dbFind',err.code + ' : ' + err.message));	
               bError = true;
               return;
           })
      })
     } catch (err) {
       if ( !bError ) {
          res.status(401).json(utility.retErr(401,'dbFind',err.code + ' : ' + err.message));	
          bError = true;
       }
       return;
     }
     }
     if ( !bError ) {
        //res.status(200).json(Object.assign({},books));	
        //return;
        const ret = utility.formatMsg(retBible, books);
        res.status(200).json(Object.assign({},ret));	
     }
}

const dbSearch = async (db, res, retBible, word, limit=99999) => {
     let books = [];
     let bError = false;
     let totSearches = 0;

     let retSearch = { "language" : retBible.language,
                       "name": retBible.version,
                       "description": retBible.description,
                       "search" : word,
                       "total"  : 0,
                       "limit"  : parseInt(limit),
		                   "searches" : [] }

     try { 
        await db.transaction(async trx => {

          trx('verses').select('books.book_number','books.short_name','books.long_name','verses.chapter','verses.verse','verses.text')
                       //.count('verses.verse as total')
                       .from('books')
                       .join('verses','books.book_number','verses.book_number')
                       .whereLike('verses.text','%' + word + '%')
                       //.groupByRaw('books.short_name')
                       .orderBy('books.book_number','verses.chapter','verses.verse')
                       .then( resStats => {
                              for(let j=0;j<resStats.length;j++) {
                                 //console.log(resStats[j.toString()]);
                                 retSearch.searches.push(resStats[j.toString()]);
                                 if ( j+1 >= limit ) break;
                              }
                              retSearch.total = resStats.length;;
                              if ( !bError ) {
                                 res.status(200).json(retSearch);	
                              }
                       })
                       .catch(err => {
                              res.status(401).json(utility.retErr(401,'dbSearch',err.code + ' : ' + err.message));	
                              bError = true;
                              return;
                       })
          })

        } catch (err) {
          if ( !bError ) {
             res.status(401).json(utility.retErr(401,'dbFind',err.code + ' : ' + err.message));	
             bError = true;
          }
          return;
        }                  
}

module.exports = {
  dbBible: dbBible,
  dbRandom: dbRandom,
  dbBooks: dbBooks,
  dbFind: dbFind,
  dbSearch: dbSearch,
  getBook: getBook
};