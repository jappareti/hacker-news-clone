import { configure, decorate, observable, computed, action, flow } from "mobx";
// import Item from "./ItemModel";

configure({ enforceActions: "observed" });

export default class ItemStore {
  items = {};
  newStories = [];
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

  fetchNewStories = flow(function*() {
    try {
      const response = yield this.hackerNewsApi.fetchNewStories();
      const data = yield response.json();
      this.newStories = data;
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
  newStories: observable,
  topStories: observable,
});
