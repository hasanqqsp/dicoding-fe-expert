const assert = require("assert");

Feature("Liking Restaurant");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

Scenario(
  "Showing 'Anda belum menambahkan satupun restoran favorit'",
  ({ I }) => {
    I.seeElement("p.no-favorite");
    I.see("Anda belum menambahkan satupun restoran favorit", ".no-favorite");
  }
);

Scenario("Add one restaurant to favorite", async ({ I }) => {
  I.see("Anda belum menambahkan satupun restoran favorit", ".no-favorite");

  I.amOnPage("/#/");
  I.seeElement("a.detail-button");
  const hrefHome = await I.grabAttributeFrom("a.detail-button", "href");
  const restaurantNameHome = await I.grabTextFrom("p.restaurant-name");

  I.click(locate("a.detail-button").first());
  I.seeElement("#favorite-button");
  I.click("#favorite-button");
  I.amOnPage("/#/favorite");
  const hrefFavorite = await I.grabAttributeFrom("a.detail-button", "href");
  const restaurantNameFavorite = await I.grabTextFrom("p.restaurant-name");
  assert.strictEqual(hrefHome, hrefFavorite);
  assert.strictEqual(restaurantNameFavorite, restaurantNameHome);
});

Scenario("Delete one restaurant from favorite", async ({ I }) => {
  I.see("Anda belum menambahkan satupun restoran favorit", ".no-favorite");

  I.amOnPage("/#/");
  I.seeElement("a.detail-button");
  I.click(locate("a.detail-button").first());
  I.seeElement("#favorite-button");
  I.click("#favorite-button");
  I.amOnPage("/#/favorite");

  I.click(locate("a.detail-button").first());
  I.seeElement("#favorite-button");
  I.click("#favorite-button");
  I.amOnPage("/#/favorite");
  I.see("Anda belum menambahkan satupun restoran favorit", ".no-favorite");
});
