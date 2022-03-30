var Constants = require('./constants');


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

const dbRandom = (db, res) => {

     let ret = { error : null,
                 info : null,
                 verse : null}
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
               ret.verse = resVerse['0'];
               res.status(200).json(Object.assign({},ret.verse));	
            })
            .catch(err => {
                    ret.error = 'Error : ' + err;
                    res.status(401).json(Object.assign({},ret.error));	
            })
     })
     .catch(err => {
          ret.error = 'Error : ' + err;
          res.status(401).json(Object.assign({},ret.error));	
     }) 
     return ret;
}

module.exports = {
  dbBible: dbBible,
  dbRandom: dbRandom
};