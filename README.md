# holybible_api
Bible API RESTful Node.js based Multilingual (Italian, Spanish, French, German, English and Portuguese) is a free, open source bible api to get verses, chapters or search words or sentence.  

## API Reference

- [Get Versions](#Versions)  
- [Get Books](#Books)  
- [Find verses](#Find)  
- [Random verse](#Random)  
- [Search a word or a sentence](#Search)  
- [Error Managment](#Error-Managment)


<hr/>

## Versions

```HTTP
GET /versions
```

Return all bible versions loaded.

**Query parameters**  

None

**Response**

```ts
{
  versions: array<{
    // Language code
    language: string
    // Bible version name
    name: string
    // Flag default
    default: string
    // Bible version description 
    description: string
    // Bible version detail info
    detail_info: string
    // Bible version file name
    file: string
  }>
}
```
**Examples**

`http://localhost:35907/versions`

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
    ...
    ...
  ]
}
```
<hr/>

## Books

```HTTP
GET /books
```

Return all books available.

**Query parameters**  

| Param     | Type     | Description   | Mandatory                                                                                                                                                                                                                                                                                                                          |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---|
| language | `String`    | Language Code (ex. en, pt, it, ...) | Yes | 
| version | `String`    | Bible Version Name | No                   |

**Response**  

```ts
{
    // Language code
    language: string
    // Bible version name
    name: string
    // Bible version description 
    description: string
    // Bible books list
    books: array<{
      // Language code
      book_number: number
      // Book short name
      short_name: string
      // Book long name
      long_name: string
      // Total Chapters
      chapters: number
      // Total verses 
      verses: number
    }>
  }>
}
```
**Examples**

`http://localhost:35907/books?language=en`

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
    ...
    ...
  ]
}
```
<hr/>

## Find

```HTTP
GET /find
```

Find and return verses.

**Query parameters**  

| Param     | Type     | Description   | Mandatory     | 
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---|
| language | `String`    | Language Code (ex. en, pt, it, ...) | Yes | 
| search | `String`    | Search String in format : [**book short name***].[**chapter**]:[**from verse**]-[**to verse**] <br><br>Examples :<br> Ge.1:2-3 - Genesis chapter 1 from verses 2 to 3 <br> Le.4     : Leviticus chapter 4 <br> Ru       - All Ruth  | Yes                                 |
| version | `String`    | Bible Version Name | No                                          |


**Response**  
```ts
{
    // Language code
    language: string
    // Bible version name
    name: string
    // Bible version description 
    description: string
    // Bible books list
    books: array<{
      // Language code
      book_number: number
      // Book short name
      short_name: string
      // Book long name
      long_name: string
      // Chapters list
      chapters: array<{
        // Chapter number
        chapter_number: number
        // Verses List
        verses: array<{
          // Verse Number
          verse: number
          // Verse Text
          text: string
        }> 
      }> 
    }>
  }>
}
```
**Examples**

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

<hr/>

## Random  

```HTTP
GET /random
```

Return a random verse.

**Query parameters**  

| Param     | Type     | Description   | Mandatory                                                                                                                                                                                                                                                                                                                          |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---|
| language | `String`    | Language Code (ex. en, pt, it, ...) | Yes | 
| version | `String`    | Bible Version Name | No                   |


**Response**  
```ts
{
    // Language code
    language: string
    // Bible version name
    name: string
    // Bible version description 
    description: string
    // Books List 
    books: array<{
      // Language code
      book_number: number
      // Book short name
      short_name: string
      // Book long name
      long_name: string
      // Chapters list
      chapters: array<{
        // Chapter number
        chapter_number: number
        // Verses List
        verses: array<{
          // Verse Number
          verse: number
          // Verse Text
          text: string
        }> 
      }> 
    }>
  }>
}
```
**Examples**

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
<hr/>

## Search

```HTTP
GET /random
```

Return verses contains a word or a sentence.

**Query parameters**  

| Param     | Type     | Description   | Mandatory                                                                                                                                                                                                                                                                                                                          |
| :-------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |---|
| language | `String`    | Language Code (ex. en, pt, it, ...) | Yes | 
| word | `String`    | Word or sentence to find | Yes                   |
| version | `String`    | Bible Version Name | No                   |
| limit | `Number`    | Maximum number of results | No                   |


**Response**  
```ts
{
    // Language code
    language: string
    // Bible version name
    name: string
    // Bible version description 
    description: string
    // String to search 
    search: string    
    // Total Number of matches
    total: number    
    // Limit Number of matches to show
    limit: number    
    // Results List 
    searches: array<{
      // Language code
      book_number: number
      // Book short name
      short_name: string
      // Book long name
      long_name: string
      // Chapter number
      chapter: number
      // Verse Number
      verse: number
      // Verse Text
      text: string
      }> 
    }>
  }>
}
```
**Examples**

`http://localhost:35907/search?language=en&word=bread&limit=2`

```
{
  "language": "en",
  "name": "ESV",
  "description": "English Standard Version 2001, 2016",
  "search": "bread",
  "total": 376,
  "limit": 2,
  "searches": [
    {
      "book_number": 10,
      "short_name": "Gen",
      "long_name": "Genesis",
      "chapter": 3,
      "verse": 19,
      "text": "<t>By the sweat of your face </t><t>you shall eat bread, </t><t>till you return to the ground, </t><t>for out of it you were taken; </t><t><f>ⓤ</f>for you are dust, </t><t>and <f>ⓥ</f>to dust you shall return.” </t>"
    },
    {
      "book_number": 10,
      "short_name": "Gen",
      "long_name": "Genesis",
      "chapter": 6,
      "verse": 15,
      "text": "This is how you are to make it: the length of the ark 300 cubits, <f>[5]</f> its breadth 50 cubits, and its height 30 cubits."
    }
  ]
}
```

## Error Managment

**Error Response**  
```ts
{
    // Language code
    error: number,
    function: string,
    description: string
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