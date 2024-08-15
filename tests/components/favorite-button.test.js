import {
  html,
  fixture,
  expect,
  waitUntil,
  elementUpdated,
} from "@open-wc/testing";
import "../../src/scripts/views/components/favorite-button";
// customElements.define("favorite-button", FavoriteButton);
describe("Add Restaurant To Favorite", () => {
  it('should show the "Tambahkan Ke Favorite" button when the movie has not in favorite', async () => {
    const button = await fixture(html`<favorite-button></favorite-button>`);
    button.setAttribute(
      "restaurant",
      JSON.stringify({
        id: "rqdv5juczeskfw1e867",
        name: "Melting Pot",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
        pictureId: "14",
        city: "Medan",
        rating: 4.2,
      })
    );
    await elementUpdated(button);
    await waitUntil(
      () => document.querySelector("#favorite-button"),
      "Element not rendered"
    );
    expect(button.querySelector("#favorite-button").textContent).include(
      "Tambahkan ke Favorit"
    );
  });
});
