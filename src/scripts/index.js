import "regenerator-runtime"; /* for async await transpile */
import "../styles/reset.css";
import "../styles/main.scss";

document.addEventListener("DOMContentLoaded", async function () {
    const toggler = document.querySelector(".navbar-toggler");
    const navLinks = document.querySelector(".nav-links");
    const closeBtn = document.querySelector(".close-button");
    const overlay = document.querySelector(".overlay");

    const toggleNav = () => {
        navLinks.classList.toggle("show");
        overlay.classList.toggle("show");
    };

    toggler.addEventListener("click", toggleNav);
    closeBtn.addEventListener("click", toggleNav);
    overlay.addEventListener("click", toggleNav);
    const restaurantLists = document.getElementById("restaurant-lists");
    const response = await fetch("/data/DATA.json");
    const { restaurants } = await response.json();
    restaurantLists.innerHTML = "";
    for (const restaurant of restaurants) {
        console.log(restaurant.pictureId);
    }
    for (const restaurant of restaurants) {
        restaurantLists.innerHTML += `<article class="card">
            <img src="${restaurant.pictureId}" alt="${restaurant.name}" />

            <p class="restaurant-name">${restaurant.name}</p>
            <p class="restaurant-desc">${restaurant.description.slice(
                0,
                100
            )}...</p>
            <div class="icon-par">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="currentColor"
                    class="bi bi-star-fill"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                    />
                </svg>
                <p class="restaurant-rate">Rating : ${restaurant.rating}</p>
            </div>
            <div class="icon-par">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="currentColor"
                    class="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
                    />
                </svg>
                <p class="restaurant-city">Lokasi : ${restaurant.city}</p>
            </div>
        </article>`;
    }
});
