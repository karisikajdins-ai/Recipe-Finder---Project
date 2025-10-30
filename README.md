# Recipe-Finder---Project - Mat Guiden
Jag har skapat Mat guiden som är en webbsida där man kan söka efter maträtter och se recept samt hur man tillagar den.
Sökresultaten visas som kort med bild och namn, och man kan klicka på ett kort för att få information kring receptet.
I HTML-filen byggde jag sidan med strukturerade taggar där "header" används för rubrikerna, "Main" innehåller huvud innehållet och "section" används för sökfältet, resultaten och receptdetaljerna.
I CSS filen har jag stylat sidan med färger, padding och hover effekter för att den ska se modern ut och vara lätt att använda.
För sökfältet använde jag flexbox så att inputfältet och knappen ligger på samma rad, centrerade och med lagom mellanrum.
I javascriptfilen hämtar jag data från TheMealDB API med hjälp av fetch, vilket gör att sidan kan visa information från ett öppet API.
Jag valde TheMealDB API då den var enkel att arbeta med och ger mycket data såsom bider, ingredienser och instruktioner osv.
Fetch() använde jag för att kunna hämta data som visade resultat direkt på websidan med JS.
Jag la till en grundläggande felhantering med try catch. Om API anropet misslyckas eller om ens sökning inte ger resultat så kommer "inga måltider hittades" upp på skärmen.
