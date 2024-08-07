class LoadingIndicator extends HTMLElement {
  static get observedAttributes() {
    return ["display"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._display = newValue;
    this.render();
  }

  connectedCallback() {
    this._display = this.getAttribute("display");
    this.render();
  }

  get _css() {
    return `
      .loader {
        display:${this._display || "none"};
        margin: 6rem auto;
        width: 8rem;
        aspect-ratio: 1;
        border-radius: 50%;
        border: 8px solid;
        border-color: #c3883d #0000;
        animation: l1 1s infinite;
      }
      @keyframes l1 {
        to {
          transform: rotate(0.5turn);
        }
      }
    `;
  }

  render() {
    this.innerHTML = `
        <style>${this._css}</style>
        <div class="loader"></div>
        `;
  }
}

customElements.define("loading-indicator", LoadingIndicator);
