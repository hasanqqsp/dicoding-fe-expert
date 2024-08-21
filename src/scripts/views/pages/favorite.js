import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";
import FavoriteRestaurantsShowPresenter from "./favorite-restaurant/favorite-restaurant-show-presenter";
import FavoriteRestaurantView from "./favorite-restaurant/favorite-restaurant-view";

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantsShowPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurantIdb,
    })._showFavoriteRestaurant();
  },
};

export default Favorite;
