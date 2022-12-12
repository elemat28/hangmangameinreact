
import RandomWordGenerator from "../data_fetch/RandomWordGenerator";
import FetchDefinition from "../data_fetch/FetchDefinition";

let randomWord;


test("Returned value is a string", () => {
    randomWord = RandomWordGenerator();
    
    expect(typeof randomWord ==  "string").toBe(true);
})


test("Generated word is longer than 0 characters", () => {
    expect(randomWord.length > 0).toBe(true);
})

test("Random value returned after each call", () => {
    expect(RandomWordGenerator()).not.toEqual(randomWord);
})

test("Function accepts parameters", () => {
    expect(() => {RandomWordGenerator("noun")}).not.toThrow();
})



test("Function accepts 'noun' as parameter", () => {
    expect(RandomWordGenerator("noun")).not.toBeNull();
})

test("Function accepts 'verb' as parameter", () => {
    expect(RandomWordGenerator("verb")).not.toBeNull();
})

test("Function accepts 'adjective' as parameter", () => {
    expect(RandomWordGenerator("adjective")).not.toBeNull();
})

test("Function accepts 'adverb' as parameter", () => {
    expect(RandomWordGenerator("adverb")).not.toBeNull();
})

test("Function returns null when unsupported parameter passed", () => {
    expect(RandomWordGenerator("asdf")).toBeNull();
})

test("Argument 'noun' returns a noun", () => {
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



test("Argument 'verb' returns a verb", () => {
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

test("Argument 'adjective' returns an adjective", () => {
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

test("Argument 'adverb' returns an adverb", () => {
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


