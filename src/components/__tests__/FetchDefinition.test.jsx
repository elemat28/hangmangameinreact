import ExpectedHelloDefintionResponse from "./expected/definition/hello.json"
import FetchDefinition from "../data_fetch/FetchDefinition.jsx";

let fetchHelloResult;
test("Result of fetch definition not empty", () => {
    fetchHelloResult = FetchDefinition("hello");
    expect(fetchHelloResult).not.toBeNull();
})

test("Result of fetch for 'hello' equals the expected value", () => {
    expect(fetchHelloResult).toEqual(ExpectedHelloDefintionResponse);
})