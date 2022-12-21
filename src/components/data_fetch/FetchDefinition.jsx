import React from "react";
import axios from "axios";
import { wait } from "@testing-library/user-event/dist/utils";
const dictionaryAxiosClient = axios.create({
  baseURL: `https://api.dictionaryapi.dev/api/v2/entries/en`,
});

dictionaryAxiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response.status === 404) {
      //ToDo: Include word that was queried
      console.warn("No definition found for:");
      console.warn(error);
      return null;
    } else if (error.response.status === 429) {
      wait(10000);
    }
  }
);
export default async function FetchDefinition(word) {
  return dictionaryAxiosClient.get(`/${word}`);
}
