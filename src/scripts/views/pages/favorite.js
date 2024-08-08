import FavoriteRestaurantIdb from "../../data/favorite-movie-idb";

const Favorite = {
  async render() {
    return `
      <div id="content" tabindex="0">
        <h2 class="section-title">Restoran Favorit Anda</h2>
        <loading-indicator></loading-indicator>
        <div id="restaurant-lists">
        </div>
      </div>
    `;
  },
  _createCardComponent(restaurant) {
    const card = document.createElement("restaurant-card");
    card.setAttribute("picture-id", restaurant.pictureId);
    card.setAttribute("name", restaurant.name);
    card.setAttribute("description", restaurant.description);
    card.setAttribute("city", restaurant.city);
    card.setAttribute("rating", restaurant.rating);
    card.setAttribute("id", restaurant.id);
    return card;
  },
  _renderRestaurantsList(target, restaurants) {
    if (restaurants.length > 0) {
      for (const restaurant of restaurants) {
        const card = this._createCardComponent(restaurant);
        target.appendChild(card);
      }
    } else {
      target.outerHTML = `<p class="no-favorite">Anda belum menambahkan satupun restoran favorit</p>`;
    }
  },
  _hideLoading() {
    const loadingIndicator = document.querySelector("loading-indicator");
    loadingIndicator.setAttribute("display", "none");
  },

  _showLoading() {
    const loadingIndicator = document.querySelector("loading-indicator");
    loadingIndicator.setAttribute("display", "block");
  },
  async afterRender() {
    this._showLoading();
    const favoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    this._hideLoading();
    this._renderRestaurantsList(
      document.getElementById("restaurant-lists"),
      favoriteRestaurants
    );
    document.querySelector("title").innerText = "Favorite";
  },
};

export default Favorite;
