import API_ENDPOINT from "../globals/api-endpoint";

class RestaurantSource {
  static async getRestaurantList() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseData = await response.json();
    return responseData.restaurants;
  }

  static async getRestaurantById(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseData = await response.json();
    return responseData.restaurant;
  }

  static async postReview({ id, name, review }) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        review,
      }),
    });
    return response.ok;
  }
}

export default RestaurantSource;
