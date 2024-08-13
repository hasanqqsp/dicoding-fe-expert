class NavigationBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <header>
      <div class="navbar-container">
        <a
          href="#"
          class="nav-brands"
          title="Coffee icons created by Flat Icons - Flaticon
                  "
        >
          <img src="./icons/apple-touch-icon.png" alt="Ngopi Disini" />
          <h1>NgopiDisini</h1>
        </a>
        <button class="navbar-toggler" aria-label="Toggle navigation">☰</button>
        <div class="nav-links">
          <a href="#/">Home</a>
          <a href="#/favorite">Favorite</a>
          <a href="https://github.com/hasanqqsp" target="_blank">About Us</a>
          <button class="close-button" aria-label="Close navigation">
            &times;
          </button>
        </div>
      </div>
      <div class="overlay"></div>
    </header>
    `;
  }
}

customElements.define("navigation-bar", NavigationBar);
