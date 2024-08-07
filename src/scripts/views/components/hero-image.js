class HeroImage extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="jumbotron">
        <img src="./images/heros/hero-image_4.jpg" alt="Banner" />
      </div>
    `;
  }
}
customElements.define("hero-image", HeroImage);
