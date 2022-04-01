var Constants = require('./constants');
var utility = require('./utility');


const getRandomArbitrary = (min, max) => {
  return Math.trunc(Math.random() * (max + 1 - min) + min);
}

const dbBible = (bibleInfo) => {
	const dbFileName = Constants.DB_PATH + bibleInfo.bible;
  const db = require('knex')({
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

  db.select('book_number', 'short_name', 'long_name')
    .from('books')
    .orderBy('book_number')
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

const dbRandom = (db, res, retBible) => {
     db('verses').count('verse as vrs')
     .then(count => {
            const verse = getRandomArbitrary(1,count[0].vrs);
            console.log('Verse : ' + verse);
            db.select('books.book_number', 'books.short_name', 'books.long_name','verses.chapter','verses.verse','verses.text')
            .from('books')                         
            .join('verses','books.book_number','verses.book_number')
            .where('verses.rowid','=',verse)
            .then( resVerse => {
               console.log(Object.assign({},resVerse));
               let books = [];
               books.push(resVerse['0']);
               const ret = utility.formatMsg(retBible, books);
               //res.status(200).json(Object.assign({},resVerse['0']));	
               res.status(200).json(Object.assign({},ret));	
            })
            .catch(err => {
                res.status(401).json(utility.retErr(401,'dbRandom',err.code + ' : ' + err.message));	
            })
     })
     .catch(err => {
          res.status(401).json(utility.retErr(401,'dbRandom',err.code));	
     }) 
     return;
}

const dbFind = (db, res, retBible, search) => {
     db('books').join('verses','books.book_number','verses.book_number')
            .select('books.book_number', 'books.short_name', 'books.long_name','verses.chapter','verses.verse','verses.text')
            .whereLike('verses.text', '%grano%')
            .then( resVerses => {
               console.log('resVerses : >' || resVerses || '<');
               console.log(Object.assign({},resVerses));
               let books = [];
               if ( typeof resVerses['0'] === 'undefined' ) {
                 const ret = utility.formatMsg(retBible, []);
               } else {
                 books.push(resVerses['0']);
                 const ret = utility.formatMsg(retBible, books);
               }
               //res.status(200).json(Object.assign({},resVerse['0']));	
               res.status(200).json(Object.assign({},ret));	
        })
        .catch(err => {
               res.status(401).json(utility.retErr(401,'dbFind',err.stack));	
     })
}

module.exports = {
  dbBible: dbBible,
  dbRandom: dbRandom,
  dbBooks: dbBooks,
  dbFind: dbFind,
};