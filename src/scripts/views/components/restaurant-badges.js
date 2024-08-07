class RestaurantBadges extends HTMLElement {
  connectedCallback() {
    this._categories = JSON.parse(this.getAttribute("categories"));
    this._rating = this.getAttribute("rating");

    this.render();
  }

  render() {
    this.innerHTML = `
      <ul class="restaurant-badges">
        ${this._categories
          .map((category) => `<li class="badge-item">${category.name}</li>`)
          .join("")}
        <rating-badge rating="${this._rating}"></rating-badge>
      </ul>
    `;
  }
}

customElements.define("restaurant-badges", RestaurantBadges);
