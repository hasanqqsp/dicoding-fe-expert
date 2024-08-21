import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";
import API_ENDPOINT from "../../globals/api-endpoint";

export const DetailPageTemplate = {
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
  _createRestaurantImage(pictureId, imageAlt) {
    
    const restaurantImage = document.createElement("picture");
    restaurantImage.innerHTML = `
    
    <source media="(max-width: 300px)" srcset="${API_ENDPOINT.IMAGE("small",pictureId)}">
    <source media="(max-width: 640px)" srcset="${API_ENDPOINT.IMAGE("medium",pictureId)}">
        <source media="(min-width: 800px)" srcset="${API_ENDPOINT.IMAGE("large",pictureId)}">

        <img class="restaurant-image" src="${API_ENDPOINT.IMAGE("medium",pictureId)}"
             alt="${imageAlt}">
      `
    return restaurantImage;
  },
  _createRestaurantBadges(categories, rating) {
    const restaurantBadges = document.createElement("restaurant-badges");
    restaurantBadges.setAttribute("categories", JSON.stringify(categories));
    restaurantBadges.setAttribute("rating", rating);

    return restaurantBadges;
  },
  async _checkFavorite(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },
  async _createFavoriteButton(restaurant) {
    const favoriteButton = document.createElement("favorite-button");
    favoriteButton.setAttribute("restaurant", JSON.stringify(restaurant));
    favoriteButton.setAttribute(
      "is-favorite",
      `${await this._checkFavorite(restaurant.id)}`
    );
    favoriteButton.addEventListener("add-favorite", (ev) => {
      FavoriteRestaurantIdb.putRestaurant(ev.detail.restaurant);
    });

    favoriteButton.addEventListener("delete-favorite", (ev) => {
      FavoriteRestaurantIdb.deleteRestaurant(ev.detail.id);
    });

    return favoriteButton;
  },

  _createRestaurantAddress(address, city) {
    const restaurantAddress = document.createElement("restaurant-address");
    restaurantAddress.setAttribute("address", address);
    restaurantAddress.setAttribute("city", city);
    return restaurantAddress;
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
  _createReviewForm(restaurant, afterRender) {
    const addReview = document.createElement("add-review");
    addReview.setAttribute("restaurant-id", restaurant.id);
    addReview.addEventListener("review-submitted", () => {
      this.render(restaurant);
      afterRender && afterRender();
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
  async render(restaurant, afterRender) {
    const restaurantContainer = document.createElement("div");
    this._setTitle(restaurant.name);

    restaurantContainer.appendChild(
      this._createRestaurantImage(
         restaurant.pictureId,
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

    restaurantContainer.appendChild(
      await this._createFavoriteButton(restaurant)
    );

    restaurantContainer.appendChild(
      this._createRestaurantDescription(restaurant.description)
    );

    restaurantContainer.appendChild(
      this._createRestaurantMenus(restaurant.menus)
    );
    restaurantContainer.appendChild(
      this._createRestaurantReviews(restaurant.customerReviews)
    );

    restaurantContainer.appendChild(
      this._createReviewForm(restaurant, afterRender)
    );
    return restaurantContainer;
  },
};
