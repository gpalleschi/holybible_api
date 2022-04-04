# holybible_api
Bible API RESTful Node.js based Multilingual (Italian, Spanish, French, German, English) 
<hr />

### API

### Versions Api
Return all bible versions loaded.

`http://localhost:35907/versions`

####Examples :   

`http://localhost:35907/random?versions`
```
{
  "versions": [
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
    },
    {
      "language": "fr",
      "name": "FRC97",
      "default": "Y",
      "description": "La Bible en français courant",
      "detailed_info": "Current Language Bible - La Bible en français courant Copyright © 1997, Société biblique française.",
      "file": "FRC97.SQLite3"
    },
    {
      "language": "de",
      "name": "ELBBK",
      "default": "Y",
      "description": "Elberfelder Übersetzung (Version von bibelkommentare.de)",
      "detailed_info": "Elberfelder Translation (Version of bibelkommentare.de) - Elberfelder Übersetzung (Version von bibelkommentare.de)",
      "file": "ELBBK.SQLite3"
    }
  ]
}
```

### Books Api
Return all books

`http://localhost:35907/books?language=[Language]`

####Examples :   

`http://localhost:35907/random?language=en`

```
{
  "language": "en",
  "name": "ESV",
  "description": "English Standard Version 2001, 2016",
  "books": [
    {
      "book_number": 10,
      "short_name": "Gen",
      "long_name": "Genesis",
      "chapters": 50,
      "verses": 1533
    },
    {
      "book_number": 20,
      "short_name": "Exo",
      "long_name": "Exodus",
      "chapters": 40,
      "verses": 1213
    },
    {
      "book_number": 30,
      "short_name": "Lev",
      "long_name": "Leviticus",
      "chapters": 27,
      "verses": 859
    },
    {
      "book_number": 40,
      "short_name": "Num",
      "long_name": "Numbers",
      "chapters": 36,
      "verses": 1288
    },
    ...
    ...
  ]
}
```

### Find Api
Find and return verses.

`http://192.168.56.210:35907/find?language=[Language]&search=[String Search]`

Actually values for [Language] : es (spanish), it (italian), en (english), fr (french), de (german)  

Syntax for [String Search] is :

[**book short name***].[**chapter**]:[**from verse**]-[**to verse**]  

####Ex.

Ge.1:2-3
Le.4
Ru

You can specify more than one extraction separating each other with ;.

####Examples :

`http://localhost:35907/find?language=it&search=Ge.9:4-5;Le.10;Ru`

```
{
  "language": "it",
  "name": "NR94",
  "description": "Nuova Riveduta 1994",
  "books": [
    {
      "book_number": 10,
      "short_name": "Ge",
      "long_name": "Genesi",
      "chapters": [
        {
          "chapter": 9,
          "verses": [
            {
              "verse": 4,
              "text": "ma non mangerete carne con la sua vita <f>[1]</f>, cioè con il suo sangue."
            },
            {
              "verse": 5,
              "text": "Certo, io chiederò conto del vostro sangue, del sangue delle vostre vite; ne chiederò conto a ogni animale; chiederò conto della vita dell'uomo alla mano dell'uomo, alla mano di ogni suo fratello."
            }
          ]
        }
      ]
    },
    {
      "book_number": 30,
      "short_name": "Le",
      "long_name": "Levitico",
      "chapters": [
        {
          "chapter": 10,
          "verses": [
            {
              "verse": 1,
              "text": "<pb/><f>ⓐ</f> Nadab <f>[1]</f> e Abiu <f>[2]</f> figli d'Aaronne, presero ciascuno il suo turibolo, vi misero dentro del fuoco, vi posero sopra dell'incenso, e offrirono davanti al Signore del fuoco estraneo, diverso da ciò che egli aveva loro ordinato."
            },
            ...
            ...
```


### Random Api
Return a random verse.

`http://localhost:35907/random?language=[Language]`

Actually values for [Language] : es (spanish), it (italian), en (english), fr (french), de (german)  

####Examples :   

`http://localhost:35907/random?language=it`

```
{
  "language": "it",
  "name": "NR94",
  "description": "Nuova Riveduta 1994",
  "books": [
    {
      "book_number": 330,
      "short_name": "Ez",
      "long_name": "Ezechiele",
      "chapters": [
        {
          "chapter": 43,
          "verses": [
            {
              "verse": 9,
              "text": "Ora allontaneranno da me le loro prostituzioni e i cadaveri dei loro re, e io abiterò in mezzo a loro per sempre."
            }
          ]
        }
      ]
    }
  ]
}
```
`http://localhost:35907/random?language=es`
```
{
  "language": "es",
  "name": "RVA15",
  "description": "Reina Valera Actualizada, 2015",
  "books": [
    {
      "book_number": 560,
      "short_name": "Ef",
      "long_name": "Efesios",
      "chapters": [
        {
          "chapter": 3,
          "verses": [
            {
              "verse": 18,
              "text": "ustedes sean plenamente capaces de comprender, junto con todos los santos, cuál es la anchura, la longitud, la altura y la profundidad,"
            }
          ]
        }
      ]
    }
  ]
}
```
`http://localhost:35907/random?language=en`
```
{
  "language": "en",
  "name": "ESV",
  "description": "English Standard Version 2001, 2016",
  "books": [
    {
      "book_number": 300,
      "short_name": "Jer",
      "long_name": "Jeremiah",
      "chapters": [
        {
          "chapter": 18,
          "verses": [
            {
              "verse": 9,
              "text": "And if at any time I declare concerning a nation or a kingdom that I will <f>ⓙ</f>build and plant it,"
            }
          ]
        }
      ]
    }
  ]
}
```
### Prerequisites  

* Node v16.13.1 or upper
* npm  v7.19.1 or upper

### Built With  
* [Visual Code Editor](https://code.visualstudio.com)  

### NPM Modules
npm install  

### Run
npm start

### Authors  

* **Giovanni Palleschi** - [gpalleschi](https://github.com/gpalleschi)  


### License

This project is licensed under the GNU GENERAL PUBLIC LICENSE 3.0 License - see the [LICENSE](LICENSE) file for details 