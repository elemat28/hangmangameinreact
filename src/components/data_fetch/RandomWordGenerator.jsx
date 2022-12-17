import React from "react";
import axios from "axios";
const randomWordAxiosClient = axios.create({
  baseURL: `https://api.api-ninjas.com/v1`,
  headers: {
    "X-Api-Key": process.env.REACT_APP_API_NINJAS_API_KEY,
  },
});

randomWordAxiosClient.interceptors.response.use(
  function (response) {
    return response.data.word;
  },
  function (error) {
    if (error.response.status === 404) {
      //ToDo: display word that was queried
      console.error("No definition found for:");
      console.error(error);
      return null;
    }
  }
);

export default async function RandomWordGenerator(typeOfWord = null) {
  if (typeOfWord == null) {
    return randomWordAxiosClient.get("/randomword");
  } else {
    let typeArgument;
    switch (typeOfWord.toLowerCase()) {
      default:
        return null;
      case "noun":
        typeArgument = "noun";
        break;
      case "verb":
        typeArgument = "verb";
        break;
      case "adjective":
        typeArgument = "adjective";
        break;
      case "adverb":
        typeArgument = "adverb";
        break;
    }
    return randomWordAxiosClient.get(`/randomword?type=${typeArgument}`);
  }
}
