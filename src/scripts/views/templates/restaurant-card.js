export function restaurantCardTemplate(restaurant) {
  const card = document.createElement("restaurant-card");
  card.setAttribute("picture-id", restaurant.pictureId);
  card.setAttribute("name", restaurant.name);
  card.setAttribute("description", restaurant.description);
  card.setAttribute("city", restaurant.city);
  card.setAttribute("rating", restaurant.rating);
  card.setAttribute("id", restaurant.id);
  return card;
}
