import { configure, decorate, observable } from "mobx";

configure({ enforceActions: "observed" });

class ItemStore {
  items = {};
  newestStories = [];
  topStories = [];

  // constructor(hackerNewsApi) {
  //   this.hackerNewsApi = hackerNewsApi;
  // }

  // fetchTopStories = async () => {
  //   try {
  //     const response = await this.hackerNewsApi.fetchTopStories();
  //     const topStories = await response.json();
  //     this.topStories = topStories;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // fetchNewestStories = flow(function*() {
  //   try {
  //     const response = yield this.hackerNewsApi.fetchNewestStories();
  //     const data = yield response.json();
  //     this.newestStories = data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // fetchItem = flow(function*(id) {
  //   if (itemsCache[id]) {
  //     return itemCache[id]
  //   }

  //   const response = yield this.hackerNewsApi.fetchItem(id);
  //   const item = yield response.json();

  //   itemsCache[id] = item
  //   this.items[id] = item;

  // })
}
decorate(ItemStore, {
  items: observable,
  newestStories: observable,
  topStories: observable
});

// export { ItemStore }

export default ItemStore;
