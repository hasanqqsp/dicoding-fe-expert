import RestaurantSource from "../../data/restaurant-source";
import API_ENDPOINT from "../../globals/api-endpoint";
import UrlParser from "../../routes/url-parser";
import "../../../styles/detail.scss";
import FavoriteRestaurantIdb from "../../data/favorite-movie-idb";
const Detail = {
  async render() {
    return ` <div id="content" tabindex="0">
    </div> `;
  },

  async _checkFavorite(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  async _getRestaurantDetail() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.getRestaurantById(url.id);
    return restaurant;
  },

  _createBackButton() {
    return document.createElement("back-button");
  },

  _setTitle(title) {
    document.querySelector("title").innerText = title;
  },

  _createRestaurantName(name) {
    const restaurantName = document.createElement("h2");
    restaurantName.innerText = name;
    restaurantName.classList.add("restaurant-name");
    return restaurantName;
  },
  _createRestaurantImage(imageSrc, imageAlt) {
    const restaurantImage = document.createElement("img");
    restaurantImage.src = imageSrc;
    restaurantImage.classList.add("restaurant-image");
    restaurantImage.setAttribute("alt", imageAlt);
    return restaurantImage;
  },
  _createRestaurantBadges(categories, rating) {
    const restaurantBadges = document.createElement("restaurant-badges");
    restaurantBadges.setAttribute("categories", JSON.stringify(categories));
    restaurantBadges.setAttribute("rating", rating);

    return restaurantBadges;
  },
  _createRestaurantAddress(address, city) {
    const restaurantAddress = document.createElement("restaurant-address");
    restaurantAddress.setAttribute("address", address);
    restaurantAddress.setAttribute("city", city);
    return restaurantAddress;
  },

  _createFavoriteButton(restaurant) {
    const favoriteButton = document.createElement("favorite-button");
    favoriteButton.setAttribute("restaurant", JSON.stringify(restaurant));
    return favoriteButton;
  },

  _createRestaurantDescription(description) {
    const restaurantDescription = document.createElement("p");

    restaurantDescription.classList.add("restaurant-description");
    restaurantDescription.innerText = description;
    return restaurantDescription;
  },

  _createRestaurantMenus(menus) {
    const restaurantMenu = document.createElement("restaurant-menus");
    restaurantMenu.setAttribute("menus", JSON.stringify(menus));
    return restaurantMenu;
  },

  _createRestaurantReviews(reviews) {
    const restaurantReviews = document.createElement("restaurant-reviews");
    restaurantReviews.setAttribute("reviews", JSON.stringify(reviews));
    return restaurantReviews;
  },
  _createReviewForm(id) {
    const addReview = document.createElement("add-review");
    addReview.setAttribute("restaurant-id", id);
    addReview.addEventListener("review-submitted", () => {
      this.render();
      this.afterRender();
    });
    if (navigator.onLine) {
      return addReview;
    } else {
      const requestIndicator = document.createElement(
        "error-request-indicator"
      );
      requestIndicator.setAttribute(
        "message",
        "Fitur tambah ulasan membutuhkan koneksi internet"
      );
      return requestIndicator;
    }
  },

  _onlineOfflineListener(container) {
    const listener = () => {
      const addReviewComponent = container.querySelector("add-review");
      if (addReviewComponent) {
        container.removeChild(addReviewComponent);
      }
      const errorRequestIndicator = document.querySelector(
        "error-request-indicator"
      );
      if (errorRequestIndicator) {
        container.removeChild(errorRequestIndicator);
      }
      container.appendChild(this._createReviewForm());
    };
    window.addEventListener("offline", listener);
    window.addEventListener("online", listener);
  },

  _renderFailed() {
    const errorRequestIndicator = document.createElement(
      "error-request-indicator"
    );
    errorRequestIndicator.setAttribute(
      "message",
      "Gagal mengambil data dari internet"
    );
    return errorRequestIndicator;
  },

  _hideLoading() {
    const loadingIndicator = document.querySelector("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.setAttribute("display", "none");
    }
  },

  _showLoading() {
    const loadingIndicator = document.createElement("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.setAttribute("display", "block");
    }
  },

  async afterRender() {
    this._showLoading();

    const restaurantContainer = document.getElementById("content");
    restaurantContainer.appendChild(this._createBackButton());
    try {
      const restaurant = await this._getRestaurantDetail();

      restaurantContainer.innerHTML = "";
      this._setTitle(restaurant.name);
      restaurantContainer.appendChild(this._createBackButton());

      restaurantContainer.appendChild(
        this._createRestaurantImage(
          API_ENDPOINT.IMAGE("large", restaurant.pictureId),
          restaurant.name
        )
      );

      restaurantContainer.appendChild(
        this._createRestaurantName(restaurant.name)
      );

      restaurantContainer.appendChild(
        this._createRestaurantBadges(restaurant.categories, restaurant.rating)
      );

      restaurantContainer.appendChild(
        this._createRestaurantAddress(restaurant.address, restaurant.city)
      );

      restaurantContainer.appendChild(this._createFavoriteButton(restaurant));

      restaurantContainer.appendChild(
        this._createRestaurantDescription(restaurant.description)
      );

      restaurantContainer.appendChild(
        this._createRestaurantMenus(restaurant.menus)
      );
      restaurantContainer.appendChild(
        this._createRestaurantReviews(restaurant.customerReviews)
      );

      restaurantContainer.appendChild(this._createReviewForm(restaurant.id));
    } catch {
      restaurantContainer.appendChild(this._renderFailed());
      this._hideLoading();
    }
    this._onlineOfflineListener(restaurantContainer);
  },
};

export default Detail;
