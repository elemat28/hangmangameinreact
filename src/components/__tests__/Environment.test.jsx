it("has .env variable for the api key defined", () => {
  expect(process.env.REACT_APP_API_NINJAS_API_KEY).toBeDefined();
});
