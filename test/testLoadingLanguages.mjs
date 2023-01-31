import Dictionary from "../Dictionary.mjs"

(function runTests(){
    testCreatingLanguageInterface();
    testSuportingLanguageFiles();
})();


function testCreatingLanguageInterface(){
    const dictionary = new Dictionary();
    test(dictionary != undefined, "Creating instance of Language suport module");
}

function testSuportingLanguageFiles(){
    const languages = ["./lan/no.json", "./lan/en.json"];
    const dictionary = new Dictionary(...languages);
    test(JSON.stringify(dictionary.languagefiles) === JSON.stringify(languages), "Testing setting of languages");
}

function testLoadingLangaugeResources(){
    const languages = ["./lan/no.json", "./lan/en.json"];
    const dictionary = new Dictionary(...languages);
    dictionary.setLanguage("no");
    test(JSON.stringify(dictionary.languagefiles) === JSON.stringify(languages), "Testing setting of languages");
}


function test(test, description){
    if(test){
        console.log(`🟢 ${description}`)
    } else{
        console.log(`🔴 ${description},  ${test}`)
    }
}