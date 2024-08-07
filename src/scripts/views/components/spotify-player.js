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
          id="spotify-embed"
          style="border-radius: 12px"
          src="https://open.spotify.com/embed/playlist/3BF8FetYSDTETQx9g0zzXE?utm_source=generator"
          width="100%"
          frameborder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
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
