class SpotifyPlayer extends HTMLElement {
  connectedCallback() {
    this.render();

    window.addEventListener("online", () => {
      this.render();
    });
    window.addEventListener("offline", () => {
      this.render();
    });
  }

  disconnectedCallback() {
    window.removeEventListener("online", () => {
      this.render();
    });
    window.removeEventListener("offline", () => {
      this.render();
    });
  }

  _renderOnline() {
    this.innerHTML = `<h2>Senang dengan Playlist Kami?</h2>
      <p>Dengarkan sambil bekerja atau belajar</p>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/n_tLSXzJ2sY?si=2hvWNPqOiRhdkam-"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>`;
  }

  _renderOffline() {
    this.innerHTML = `
        <error-request-indicator message="Fitur playlist membutuhkan koneksi internet"></error-request-indicator>
  `;
  }

  render() {
    if (navigator.onLine) {
      this._renderOnline();
    } else {
      this._renderOffline();
    }
  }
}

customElements.define("spotify-player", SpotifyPlayer);
