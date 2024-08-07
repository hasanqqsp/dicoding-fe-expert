class RestaurantMenus extends HTMLElement {
  async connectedCallback() {
    this._menus = await JSON.parse(this.getAttribute("menus"));
    this.render();
  }

  render() {
    this.innerHTML = `<section class="restaurant-menu">
        <h3>Menu</h3>
        <div class="menu-content">
          <article>
            <h4>Makanan</h4>
            <ul>
              ${this._menus.foods
                .map(
                  (menu) => `
              <li class="menu-item">${menu.name}</li> 
              `
                )
                .join("")}
            </ul>
          </article>
          <article>
            <h4>Minuman</h4>
            <ul>
              ${this._menus.drinks
                .map(
                  (menu) => `
              <li class="menu-item">${menu.name}</li> 
              `
                )
                .join("")}
            </ul>
          </article>
        </div>
      </section>`;
  }
}

customElements.define("restaurant-menus", RestaurantMenus);
