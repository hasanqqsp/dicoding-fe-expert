const { default: RestaurantSource } = require("../../data/restaurant-source");

class AddReview extends HTMLElement {
  constructor() {
    super();
    this.formHandler = this.formHandler.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this._form.removeEventListener("submit", this.formHandler);
  }

  async formHandler(event) {
    event.preventDefault();
    const name = this._form.elements.name.value;
    const review = this._form.elements.review.value;

    const restaurantId = this.getAttribute("restaurant-id");
    const reviewData = {
      id: restaurantId,
      name,
      review,
    };
    this._reviewData = reviewData;
    try {
      await RestaurantSource.postReview(reviewData);
      event.target.reset();
      this.dispatchEvent(new CustomEvent("review-submitted"));
    } catch {
      this._errorMessage = "Gagal menambahkan ulasan baru, silakan coba lagi";
      this.render();
    }
  }

  render() {
    this.innerHTML = `<section class="add-review">
        <h3>Tambah Ulasan</h3>
        <form id="review-form">
          <div class="form-group">
            <label for="name" class="form-label">Nama</label>
            <input
              type="text"
              id="name"
              name="name"
              value="${this._reviewData?.name || ""}"
              required
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="review" class="form-label">Ulasan</label>
            <textarea id="review" name="review" class="form-control" required>${this._reviewData?.review || ""}</textarea>
          </div>
          <p style="margin-bottom:0.5rem">${this._errorMessage || ""}</p>
          <div class="button-container">
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-send-plus"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363 1.591 6.602z"
                />
                <path
                  d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5"
                />
              </svg>
              Kirim Ulasan
            </button>
          </div>
        </form>
      </section>`;
    this._form = document.getElementById("review-form");
    this._form.addEventListener("submit", this.formHandler);
  }
}

customElements.define("add-review", AddReview);
