import FavoriteRestaurantIdb from "../../../data/favorite-restaurant-idb";

const LikeButtonPresenter = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurants = FavoriteRestaurantIdb;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;
    const favoriteButton = document.createElement("favorite-button");
    favoriteButton.setAttribute("restaurant", JSON.stringify(this._restaurant));
    favoriteButton.setAttribute(
      "is-favorite",
      `${await this._isRestaurantExist(id)}`
    );
    favoriteButton.addEventListener("add-favorite", (ev) => {
      FavoriteRestaurantIdb.putRestaurant(ev.detail.restaurant);
    });

    favoriteButton.addEventListener("delete-favorite", (ev) => {
      FavoriteRestaurantIdb.deleteRestaurant(ev.detail.id);
    });
    this._likeButtonContainer.appendChild(favoriteButton);
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },
};

export default LikeButtonPresenter;
