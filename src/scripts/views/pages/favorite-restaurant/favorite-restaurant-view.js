import { restaurantCardTemplate } from "../../templates/restaurant-card";

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <div id="content" tabindex="0">
        <h2 class="section-title">Restoran Favorit Anda</h2>
        <loading-indicator></loading-indicator>
        <div id="restaurant-lists"></div>
      </div>
    `;
  }

  showFavoriteRestaurants(restaurants) {
    if (restaurants.length) {
      let container = document.createElement("div");
      for (const restaurant of restaurants) {
        const card = restaurantCardTemplate(restaurant);
        container.appendChild(card);
      }
      document.getElementById("restaurant-lists").innerHTML =
        container.innerHTML;
      document
        .getElementById("restaurant-lists")
        .dispatchEvent(new Event("restaurants:updated"));
    } else {
      document.querySelector("#restaurant-lists").outerHTML =
        this._getEmptyRestaurantTemplate();
    }
  }

  hideLoading() {
    const loadingIndicator = document.querySelector("loading-indicator");
    loadingIndicator.setAttribute("display", "none");
  }
  showLoading() {
    const loadingIndicator = document.querySelector("loading-indicator");
    loadingIndicator.setAttribute("display", "block");
  }

  _getEmptyRestaurantTemplate() {
    return `<p class="no-favorite">
      Anda belum menambahkan satupun restoran favorit
    </p>`;
  }
}

export default FavoriteRestaurantView;
