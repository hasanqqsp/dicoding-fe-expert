class HeroImage extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="jumbotron">
      <picture>
        <source media="(max-width: 600px)" srcset="/images/heros/hero-image_4-small.webp">
        <source media="(max-width: 600px)" srcset="/images/heros/hero-image_4-small.jpg">
        <source media="(min-width: 600px)" srcset="/images/heros/hero-image_4-large.webp">
        <source media="(min-width: 600px)" srcset="/images/heros/hero-image_4-large.jpg">

        <img src="/images/heros/hero-image_4.jpg" 
             alt="NgopiDisini">
      </picture>
      </div>
    `;
  }
}
customElements.define("hero-image", HeroImage);
