class FavoriteRestaurantsShowPresenter {
  constructor({ view, favoriteRestaurants }) {
    this._view = view;
    this._favoriteRestaurants = favoriteRestaurants;

    // this._showFavoriteRestaurant();
  }

  async _showFavoriteRestaurant() {
    this._view.showLoading();
    const restaurants = await this._favoriteRestaurants.getAllRestaurants();
    this._displayRestaurants(restaurants);
    this._view.hideLoading();
  }

  _displayRestaurants(restaurants) {
    this._view.showFavoriteRestaurants(restaurants);
  }
}

export default FavoriteRestaurantsShowPresenter;
