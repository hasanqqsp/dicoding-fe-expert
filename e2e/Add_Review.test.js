const assert = require("assert");

Feature("Add Review");

Scenario("Add Review", async ({ I }) => {
  const name = "Testing";
  const content = "Testing number " + +new Date();
  I.amOnPage("/#/");
  const allButton = await I.grabTextFromAll("a.detail-button");

  I.seeElement("a.detail-button");
  const button = locate("a.detail-button").at(
    Math.floor(Math.random() * allButton.length) - 1
  );
  I.click(button);
  I.seeElement("#review-form");
  I.fillField("input[name='name']", name);
  I.fillField("textarea[name='review']", content);
  I.click("button[type='submit']");
  I.seeElement(locate("p.reviewer-name").withText(name));
  I.seeElement(locate("p.review-content").withText(content));
});

Scenario("Add Review Without Name", async ({ I }) => {
  const name = "Testing";
  const content = "Testing number " + +new Date();
  I.amOnPage("/#/");
  const allButton = await I.grabTextFromAll("a.detail-button");

  I.seeElement("a.detail-button");
  const button = locate("a.detail-button").at(
    Math.floor(Math.random() * allButton.length) - 1
  );
  I.click(button);
  I.seeElement("#review-form");
  I.fillField("textarea[name='review']", content);
  I.click("button[type='submit']");
  assert.equal(await I.grabValueFrom("textarea[name='review']"), content);
});

Scenario("Add Review Without Content", async ({ I }) => {
  const name = "Testing";
  const content = "Testing number " + +new Date();
  I.amOnPage("/#/");
  const allButton = await I.grabTextFromAll("a.detail-button");

  I.seeElement("a.detail-button");
  const button = locate("a.detail-button").at(
    Math.floor(Math.random() * allButton.length) - 1
  );
  I.click(button);
  I.seeElement("#review-form");
  I.fillField("input[name='name']", name);
  I.click("button[type='submit']");
  assert.equal(await I.grabValueFrom("input[name='name']"), name);
});
