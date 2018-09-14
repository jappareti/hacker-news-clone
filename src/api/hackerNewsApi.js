function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}

class HackerNewsApi {
  URL = "https://hacker-news.firebaseio.com/v0";

  fetchTopStories = () =>
    fetch(`${this.URL}/topstories.json`)
      .then(handleErrors)
      .then(response => response)
      .catch(error => error);

  fetchNewStories = () =>
    fetch(`${this.URL}/newstories.json`)
      .then(handleErrors)
      .then(response => response)
      .catch(error => error);

  fetchItem = id =>
    fetch(`${this.URL}/item/${id}.json`)
      .then(handleErrors)
      .then(response => response)
      .catch(error => error);
}

export default HackerNewsApi;
