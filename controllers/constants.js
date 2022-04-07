// Constants
const DEFAULT_PORT = 35907; 
const DB_PATH = './db/';

// Languages
const LANGUAGES = ['it','es','en','fr','de','pt'];

// Bible Loaded
const BIBLES_VERSIONS = [
 			       {'language' : 'it',
				'name' : 'NR94',
				'default' : 'Y',
				'description' : 'Nuova Riveduta 1994',
				'detailed_info' : 'Copyright © 1994 by Geneva Bible Society',
				'file' : 'NR94.SQLite3'},
				{'language' : 'en',
				'name' : 'ESV',
				'default' : 'Y',
				'description' : 'English Standard Version 2001, 2016',
				'detailed_info' : 'The Holy Bible, English Standard Version. Copyright © 2001 by Crossway Bibles, a publishing ministry of Good News Publishers.',
				'file' : 'ESV.SQLite3'},
				{'language' : 'es',
				'name' : 'RVA15',
				'default' : 'Y',
				'description' : 'Reina Valera Actualizada, 2015',
				'detailed_info' : 'Version Reina Valera Actualizada, Copyright © 2015 by Editorial Mundo Hispano',
				'file' : 'RVA15.SQLite3'},
				{'language' : 'fr',
				'name' : 'FRC97',
				'default' : 'Y',
				'description' : 'La Bible en français courant',
				'detailed_info' : 'Current Language Bible - La Bible en français courant Copyright © 1997, Société biblique française.',
				'file' : 'FRC97.SQLite3'},
				{'language' : 'de',
				'name' : 'ELBBK',
				'default' : 'Y',
				'description' : 'Elberfelder Übersetzung (Version von bibelkommentare.de)',
				'detailed_info' : 'Elberfelder Translation (Version of bibelkommentare.de) - Elberfelder Übersetzung (Version von bibelkommentare.de)', 
				'file' : 'ELBBK.SQLite3'},
				{'language' : 'pt',
				'name' : 'LTT18',
				'default' : 'Y',
				'description' : 'Bíblia de Estudo LTT 2018',
				'detailed_info' : 'Bíblia Literal do Texto Tradicional (com Notas de Rodapé). 2a. Edição (nov. 2018). Sem arcaísmos. Com títulos de seções.',
				'file' : 'LTT18.SQLite3'},
			];


module.exports = {
    DEFAULT_PORT: DEFAULT_PORT,
    LANGUAGES: LANGUAGES,
    DB_PATH: DB_PATH,
    BIBLES_VERSIONS: BIBLES_VERSIONS
};