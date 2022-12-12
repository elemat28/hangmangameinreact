
import RandomWordGenerator from "../data_fetch/RandomWordGenerator";
import FetchDefinition from "../data_fetch/FetchDefinition";

let randomWord;

it("Has a function RandomWordGenerator()", () => {
    expect(RandomWordGenerator).toBeDefined();
})

it("Returns a string", () => {
    randomWord = RandomWordGenerator();
    
    expect(typeof randomWord ==  "string").toBe(true);
})


it("Generates word that is longer than 0 characters", () => {
    expect(randomWord.length > 0).toBe(true);
})

it("Returns different value on each call", () => {
    expect(RandomWordGenerator()).not.toEqual(RandomWordGenerator());
})

it("Accepts parameters", () => {
    expect(() => {RandomWordGenerator("noun")}).not.toThrow();
})



it("Accepts 'noun' as parameter", () => {
    expect(RandomWordGenerator("noun")).not.toBeNull();
})

it("Accepts 'verb' as parameter", () => {
    expect(RandomWordGenerator("verb")).not.toBeNull();
})

it("Accepts 'adjective' as parameter", () => {
    expect(RandomWordGenerator("adjective")).not.toBeNull();
})

it("Accepts 'adverb' as parameter", () => {
    expect(RandomWordGenerator("adverb")).not.toBeNull();
})

it("Returns null when unsupported parameter passed", () => {
    expect(RandomWordGenerator("asdf")).toBeNull();
})

it("Returns a noun when called with 'noun' as argument", () => {
    let correctType = false;
    let generatedWord = RandomWordGenerator("noun");
    let definitions = FetchDefinition(generatedWord);
    definitions[0].meanings.forEach(element => {
        if(element.partOfSpeech === "noun"){
            correctType = true;
        }
    });

    expect(correctType).toEqual(true);

})



it("Returns a verb when called with 'verb' as argument", () => {
    let correctType = false;
    let generatedWord = RandomWordGenerator("verb");
    let definitions = FetchDefinition(generatedWord);
    definitions[0].meanings.forEach(element => {
        if(element.partOfSpeech === "verb"){
            correctType = true;
        }
    });

    expect(correctType).toEqual(true);

})

it("Returns an adjective when called with 'adjective' as argument", () => {
    let correctType = false;
    let generatedWord = RandomWordGenerator("adjective");
    let definitions = FetchDefinition(generatedWord);
    definitions[0].meanings.forEach(element => {
        if(element.partOfSpeech === "adjective"){
            correctType = true;
        }
    });

    expect(correctType).toEqual(true);

})

it("Returns an adverb when called with 'adverb' as argument", () => {
    let correctType = false;
    let generatedWord = RandomWordGenerator("adverb");
    let definitions = FetchDefinition(generatedWord);
    definitions[0].meanings.forEach(element => {
        if(element.partOfSpeech === "adverb"){
            correctType = true;
        }
    });

    expect(correctType).toEqual(true);

})


