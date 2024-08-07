class RestaurantReviews extends HTMLElement {
  connectedCallback() {
    this._reviews = JSON.parse(this.getAttribute("reviews"));
    this.render();
  }

  render() {
    this.innerHTML = `
        <section class="restaurant-reviews">
        <h3>Ulasan Pengunjung</h3>
        
         ${
           this._reviews.length
             ? `<ul class="review-lists">
                 ${this._reviews
                   .map(
                     (review) => `
            <li class="review-item">
              <div class="review-header">
                <p class="reviewer-name">${review.name}</p>
                <p class="review-date">${review.date}</p>
              </div>
              <p class="review-content">${review.review}</p>
            </li>
            `
                   )
                   .join("")}
               </ul>`
             : `<p class="no-review">Belum ada ulasan untuk restoran ini</p>`
         }
        </ul>
      </section>
        `;
  }
}

customElements.define("restaurant-reviews", RestaurantReviews);
