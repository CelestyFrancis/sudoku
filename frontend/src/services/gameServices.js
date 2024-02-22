import { BASEURL } from "../constants/constants";
export const gameServices = {
  getSudoku
};

function getSudoku(value) {
  return fetch(`${BASEURL}/sudoku?difficulty=${value}`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("user"),
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "same-origin"
  }).then(response => handleResponse(response));
}

function handleResponse(response) {
  return response.json().then(text => {
    let data = text;
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("user");
      }
      if (response.status === 400) {
      }
      const error = (data && data.message) || response.statusText;
      return error;
    }
    return data;
  });
}
