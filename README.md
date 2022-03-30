# holybible_api
Bible API RESTful Node.js based Multilingual  
<hr />

### API

#### Versions Api
Return all bible versions loaded.

`http://localhost:35907/versions`

#####Examples :   

`http://localhost:35907/random?versions`
```
[
  {
    "language": "it",
    "name": "NR94",
    "default": "Y",
    "description": "Nuova Riveduta 1994",
    "detailed_info": "Copyright © 1994 by Geneva Bible Society",
    "file": "NR94.SQLite3"
  },
  {
    "language": "en",
    "name": "ESV",
    "default": "Y",
    "description": "English Standard Version 2001, 2016",
    "detailed_info": "The Holy Bible, English Standard Version. Copyright © 2001 by Crossway Bibles, a publishing ministry of Good News Publishers.",
    "file": "ESV.SQLite3"
  },
  {
    "language": "es",
    "name": "RVA15",
    "default": "Y",
    "description": "Reina Valera Actualizada, 2015",
    "detailed_info": "Version Reina Valera Actualizada, Copyright © 2015 by Editorial Mundo Hispano",
    "file": "RVA15.SQLite3"
  }
]
```

#### Random Api
Return a random verse.

`http://localhost:35907/random?language=[Language]`

Actually values for [Language] : es (spanish), it (italian), en (english)

#####Examples :   

`http://localhost:35907/random?language=it`

```
{
  "book_number": 440,
  "short_name": "Ag",
  "long_name": "Aggeo",
  "chapter": 2,
  "verse": 13,
  "text": "Aggeo disse: «Se uno è impuro per aver toccato un cadavere e tocca qualcuna di quelle cose, questa diventerà impura?» I sacerdoti risposero e dissero: «Sí, diventerà impura»."
}
```
`http://localhost:35907/random?language=es`
```
{
  "book_number": 230,
  "short_name": "Sal",
  "long_name": "Salmos",
  "chapter": 104,
  "verse": 29,
  "text": "<t>Escondes tu rostro, y se desvanecen; </t><t>les quitas el aliento, y dejan de ser. Así vuelven a ser polvo.</t>"
}
```
`http://localhost:35907/random?language=en`
```
{
  "book_number": 250,
  "short_name": "Eccl",
  "long_name": "Ecclesiastes",
  "chapter": 9,
  "verse": 10,
  "text": "Whatever your hand finds to do, <f>ⓞ</f>do it with your might, <f>[3]</f> <f>ⓟ</f>for there is no work or thought or knowledge or wisdom in Sheol, to which you are going."
}

```
### Prerequisites  

* Node v16.13.1 or upper
* npm  v7.19.1 or upper

#### Built With  
* [Visual Code Editor](https://code.visualstudio.com)  

#### NPM Modules
npm install  

#### Run
npm start

#### Authors  

* **Giovanni Palleschi** - [gpalleschi](https://github.com/gpalleschi)  


#### License

This project is licensed under the GNU GENERAL PUBLIC LICENSE 3.0 License - see the [LICENSE](LICENSE) file for details 