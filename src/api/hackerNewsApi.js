function handleErrors(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
  }
  return response;
}
const URL = "https://hacker-news.firebaseio.com/v0";

const fetchStories = type =>
  fetch(`${URL}/${type}.json`)
    .then(handleErrors)
    .then(response => response);

const fetchItem = id =>
  fetch(`${URL}/item/${id}.json`)
    .then(handleErrors)
    .then(response => response);

export { fetchStories, fetchItem };
