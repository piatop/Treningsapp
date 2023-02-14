
import en from '../test/lan/en.json' assert { type: 'json' };
import no from '../test/lan/no.json' assert { type: 'json' };

class Dictionary{

    constructor(...languages){
        this.languagefiles = languages
        this.dictionary = null;
        this.currentLanguage = null;
    }

    setLanguage = async function(lang){
        // Velger språket som skal brukes.

        let languageFile = this.languagefiles.find( file => {
             return file.indexOf(lang) != -1
            });
        
        this.currentLanguage = lang;

        this.dictionary = await import(languageFile, { assert: { type: "json" } });
    }

    get = function(key){
        // Henter riktig verdi basert på key i dictionary.
        //console.log(this.dictionary.key[]);
        return this.dictionary[key];
    }


    keys = function(){
        // retunerer alle keys i dictionary 
        return Object.keys(this.dictionary);
    }
    
}

let DICTIONARY_KEYS = {
    end:"end"
}

let dictionary = new Dictionary('./test/lan/');
dictionary.setLanguage(no);
dictionary.get(DICTIONARY_KEYS.end);
console.log(dictionary.currentLanguage);


export default Dictionary;