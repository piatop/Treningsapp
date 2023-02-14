// Her importerer vi express rammeverket (som vi tidligere har instalert via nmp install express)
import express from 'express'

// Her tar vi i bruk (instansierer) express, slik at vi kan begynne å bygge vår egen server.
const server = express();

// Her sjekker vi om vi har blitt diktert en port ellers så bruker vi 8080.
// Vi kan tenke på process som kontakten vårt programm har med operativ systemet. 
const port = (process.env.PORT || 8080);
// nå er vi sikker på at vi har en port, så da forteller vi serveren vår om den. 
server.set('port', port);

// Ved å lage en mappe public så kan vi nå hoste statiske resurser der (html, bilder, css, js filer)
server.use(express.static('public'));

/*
// Her begynner jeg å definere API for denne servern.
// APIet har 2 endepunkter /fact og /facts (siste kan bare brukes til å slette)
// Det er http metoden vi bruker med eks fetch som avgjør hvilken av funksjonene som blir trigget. 
// En god resurs for å lære om å lage ulike typer endpoints (url'er) finner du her http://bit.ly/3YeUifu 
// Husk at get,post,delete etc kommer fra HTTP standarden, det er ikke express som bestemmer det.
server.get("/fact/:index?",retriveFact); // Her er det en mulighet å sende med en index, men ikke påkrevd, det er ? som indikerer at det ikke er påkrevd
server.post("/fact", storeANewFact)
server.delete("/fact/:index",deleteFact); // Her må det sendes med en verdi for index.
server.delete("/facts",deleteAllFacts);

// For denne demoen lagrer jeg bare faktaene i minnet på serveren 
// MEN! jeg kunne skrevet til fil, jeg kunne lagret det i en database etc. Her er det behovet som dikterer hva man velger.
let facts = ["A beard second is the avrage lenght of beard groth on a physesist in 1 second (about 4nm"]

// ------------ Route Handlers --------------------------------------
// Under følger funksjonene som utfører handlingene som er definert av APIet vårt.

// Sletter en spesefikk fakta basert plaseringen i arrayet vårt.
function deleteFact(req,res,next){

    const indexFromClient = request.params.index;
    
    // Vi har ingen garanti for at clienten har sendt oss en gyldig index, så det må vi teste for.
    // 1. Fikk vi en index?
    // 2. Er den indexen innen for grensene til listen vår?
    if(indexFromClient !== undefined && indexFromClient < facts.length ){
       // Dette er en grei måte å slette noe i mitten av en liste (https://mzl.la/3HJl2O9)
       facts.splice(factIndex,1);
       // Sier fra til Client at alt er ok
       res.status(200);
    }else{
        // Signalisere til Client at den spurte om noe som ikke er mulig.
        res.status(404);
    } 
    res.end(); // Husk at etter at end er kallet så kan vi ikke sende mer data. 
    next(); // next er fint om dere husker å kalle.
}

// Vi tar i mot en ny fakta fra client
function storeANewFact(req,res,next){
    // Når POST brukes som metode, så er dataen (vår fakta i dette tilfelet) i body delen av requestet.
    const newFact = req.body;
    // Hved å bruke console.log så kan vi se i terminalen hva som skjer inne i serveren vår når den kjører.
    console.log("New fact recived : " + newFact);
    facts.push(newFact);
    res.status(200).end();
    next();
}

// I denne funksjonen skal vi retunere en fakta som clienten har etterspurt. 
// clienten kan etterspøre en spesefikk eller tilfeldig fakta.
// Måten vi skiller på detter er om parameteren index er satt i url som er brukt. 
function retriveFact(request,respons,next){
    // henter ut en mulig index fra params 
    // Params er bare en liste med alle parametere sendt med en request. 
    const indexFromClient = request.params.index;
    // Velger en tilfeldig index i tilfellet vi trenger det. 
    let factIndex = Math.floor(Math.random() * facts.length -1) +1;
    // sjekker om vi faktisk fikk en index med i request og at den ligger innen for grensene til listen vår med fakta.
    if(indexFromClient !== undefined && indexFromClient < facts.length ){
       factIndex = indexFromClient; // den er trygg, så vi bruker den isteden for den tilfeldige.
    } 
    // sender et fakta tilbake basert på den index vi fikk til slutt.
    respons.send(facts[factIndex]);
}

// Jeg hadde aldri skrevet parametrene på denne måten.
// Her har jeg gjort det for å påminne dere om at rekke følgen på parameterene til en "route" funksjon ALTID er request, respons, next
function deleteAllFacts(...stuff){
    facts = [];
    stuff[1].status(200).end();
}
*/
// Vi starter serveren med funksjonen listen. 
// Den krever en port så den henter vi fra det vi satt i serveren vår tidligere. 
server.listen(server.get('port'), function () {
    console.log('server running', server.get('port')); // dersom alt gikk som forventet så skal du se denne meldingen i terminalen / log
});