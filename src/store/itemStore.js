import { configure, decorate, observable, flow } from "mobx";

configure({ enforceActions: "observed" });

export default class ItemStore {
  items = {};
  newestStories = [];
  topStories = [];

  constructor(hackerNewsApi) {
    this.hackerNewsApi = hackerNewsApi;
  }

  fetchTopStories = flow(function* () {
    try {
      const response = yield this.hackerNewsApi.fetchTopStories();
      const data = yield response.json();
      this.topStories = data;
    } catch (error) {
      console.log(error);
    }
  });

  fetchNewestStories = flow(function*() {
    try {
      const response = yield this.hackerNewsApi.fetchNewestStories();
      const data = yield response.json();
      this.newestStories = data;
    } catch (error) {
      console.log(error);
    }
  });

  fetchItem = flow(function*(id) {
    try {
      const response = yield this.hackerNewsApi.fetchItem(id);
      const data = yield response.json();
      this.items[id] = data;
    } catch (error) {
      console.log(error);
    }
  })
}
decorate(ItemStore, {
  items: observable,
  newestStories: observable,
  topStories: observable,
});
