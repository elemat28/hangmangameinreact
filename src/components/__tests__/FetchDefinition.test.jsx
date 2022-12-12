import ExpectedHelloDefintionResponse from "./expected/definition/hello.json"
import FetchDefinition from "../data_fetch/FetchDefinition.jsx";

let fetchHelloResult;




it("Is defined", () => {
    fetchHelloResult = FetchDefinition("hello");
    expect(FetchDefinition).toBeDefined();
})

it("Doesn't throw an error when word doesn't exist", () => {
    fetchHelloResult = FetchDefinition("qwerty");
    expect(() => {FetchDefinition("qwerty")}).not.toThrow();
})

describe("Returns correct values", () => {
    it("Returns non null value when called with correct word", () => {
        fetchHelloResult = FetchDefinition("hello");
        expect(fetchHelloResult).not.toBeNull();
    })

    it("Returns null value when called with incorrect word", () => {
        fetchHelloResult = FetchDefinition("hello");
        expect(fetchHelloResult).toBeNull();
    })

    it("Fetches correct value for 'hello'", () => {
        expect(fetchHelloResult).toEqual(ExpectedHelloDefintionResponse);
    })
})