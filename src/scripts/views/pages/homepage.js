import RestaurantSource from "../../data/restaurant-source";

const Home = {
  async render() {
    return `
      <hero-image></hero-image>
      <section id="content">
        <h2>
          Kunjungi Rekan Kami untuk
          <span class="brand-text">NgopiDisini</span>
        </h2>
        <loading-indicator></loading-indicator>
        <div id="restaurant-lists">
        </div>
      </section>
      <spotify-player></spotify-player>
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
    for (const restaurant of restaurants) {
      const card = this._createCardComponent(restaurant);
      target.appendChild(card);
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

    document.querySelector("title").innerText = "Home";
    const restaurantsData = await RestaurantSource.getRestaurantList();
    const restaurantsListComponent =
      document.getElementById("restaurant-lists");
    this._hideLoading();
    this._renderRestaurantsList(restaurantsListComponent, restaurantsData);
  },
};

export default Home;
