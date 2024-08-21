import RestaurantSource from "../../data/restaurant-source";
import API_ENDPOINT from "../../globals/api-endpoint";
import UrlParser from "../../routes/url-parser";
import "../../../styles/detail.scss";
import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";
import { DetailPageTemplate } from "../templates/detail-page";

class Detail {
  constructor() {
    this.afterRender = this.afterRender.bind(this);
  }
  async render() {
    return ` <div id="content" tabindex="0">
    <loading-indicator></loading-indicator>
    </div> `;
  }

  async _getRestaurantDetail() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.getRestaurantById(url.id);
    return restaurant;
  }

  _createBackButton() {
    return document.createElement("back-button");
  }

  _setTitle(title) {
    document.querySelector("title").innerText = title;
  }

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
  }

  _renderFailed() {
    const errorRequestIndicator = document.createElement(
      "error-request-indicator"
    );
    errorRequestIndicator.setAttribute(
      "message",
      "Gagal mengambil data dari internet"
    );
    return errorRequestIndicator;
  }

  _hideLoading() {
    const loadingIndicator = document.querySelector("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.setAttribute("display", "none");
    }
  }

  _showLoading() {
    const loadingIndicator = document.querySelector("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.setAttribute("display", "block");
    }
  }

  async afterRender() {
    const restaurantContainer = document.getElementById("content");
    restaurantContainer.innerHTML = "";
    restaurantContainer.appendChild(this._createBackButton());
    this._showLoading();

    try {
      const restaurant = await this._getRestaurantDetail();

      restaurantContainer.appendChild(
        await DetailPageTemplate.render(restaurant, this.afterRender)
      );
      this._hideLoading();
    } catch (err) {
      restaurantContainer.appendChild(this._renderFailed());
      this._hideLoading();
    }
    this._onlineOfflineListener(restaurantContainer);
  }
}

export default Detail;
