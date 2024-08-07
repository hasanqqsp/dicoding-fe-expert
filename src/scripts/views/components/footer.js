class AppFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer>
        <p>Copyright © Hasan Ismail Abdulmalik - 2024</p>
      </footer>
    `;
  }
}
customElements.define("app-footer", AppFooter);
