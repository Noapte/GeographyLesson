
    // initialize ActiveXObject and create an object of Scripting.FileSystemObject.  
    var fso = new ActiveXObject("Scripting.FileSystemObject");  
  var table = ["Albania",
"Andora",
"Austria",
"Belgia",
"Białoruś",
"Bośnia i Hercegowina",
"Bułgaria",
"Chorwacja",
"Czarnogóra",
"Czechy",
"Dania",
"Estonia",
"Finlandia",
"Francja",
"Grecja",
"Hiszpania",
"Holandia",
"Irlandia",
"Islandia",
"Kazachstan",
"Liechtenstein",
"Litwa",
"Luksemburg",
"Łotwa",
"Macedonia",
"Malta",
"Mołdawia",
"Monako",
"Niemcy",
"Norwegia",
"Polska",
"Portugalia",
"Rosja",
"Rumunia",
"San Marino",
"Serbia",
"Słowacja",
"Słowenia",
"Szwajcaria",
"Szwecja",
"Turcja",
"Ukraina",
"Watykan",
"Węgry",
"Wielka Brytania",
"Włochy"];
  for(var a in table)
    // creates a folder with specified name at the specified location  
    fso.CreateFolder("D:\\systemy multimedialne\\GeographyLesson\\data\\" + table[a]);  
  
    fso = null;  