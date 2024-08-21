const {
  default: FavoriteRestaurantsShowPresenter,
} = require("../src/scripts/views/pages/favorite-restaurant/favorite-restaurant-show-presenter");
const {
  default: FavoriteRestaurantView,
} = require("../src/scripts/views/pages/favorite-restaurant/favorite-restaurant-view");

describe("Showing all favorite restaurants", () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  //   beforeEach(() => {
  //     renderTemplate();
  //   });

  describe("When no restaurants have been liked", () => {
    it("should render the information that no restaurants have been liked", async () => {
      renderTemplate();

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      const presenter = new FavoriteRestaurantsShowPresenter({
        view,
        favoriteRestaurants,
      });
      const restaurants = [];
      await presenter._displayRestaurants(restaurants);
      expect(document.querySelector(".no-favorite").textContent).toContain(
        "Anda belum menambahkan satupun restoran favorit"
      );
    });

    it("should ask for the favorite restaurants", async () => {
      renderTemplate();

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      const presenter = new FavoriteRestaurantsShowPresenter({
        view,
        favoriteRestaurants,
      });

      await presenter._showFavoriteRestaurant();

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });
  });

  describe("When favorite restaurants exist", () => {
    it("should show the restaurants", (done) => {
      renderTemplate();

      document
        .getElementById("restaurant-lists")
        .addEventListener("restaurants:updated", () => {
          const cardCount = document.querySelectorAll("restaurant-card").length;

          expect(cardCount).toEqual(2);

          done();
        });

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => [
          {
            id: "rqdv5juczeskfw1e867",
            name: "Melting Pot",
            description:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
            pictureId: "14",
            city: "Medan",
            rating: 4.2,
          },
          {
            id: "s1knt6za9kkfw1e867",
            name: "Kafe Kita",
            description:
              "Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
            pictureId: "25",
            city: "Gorontalo",
            rating: 4,
          },
        ]),
      };

      const presenter = new FavoriteRestaurantsShowPresenter({
        view,
        favoriteRestaurants,
      });

      presenter._showFavoriteRestaurant();
    });
  });
});
