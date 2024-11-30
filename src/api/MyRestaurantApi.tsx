import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL); // Add this for debugging

export const useGetMyRestaurants = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

export const useCreateMyRestaurants = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    console.log("bakk", restaurantFormData);
    for (const [key, value] of restaurantFormData.entries()) {
      console.log(key, value);
    }

    const accessToken = await getAccessTokenSilently();
    if (!accessToken) {
      throw new Error("Failed to retrieve access token");
    }

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    // First, parse the response as JSON only once
    const responseData = await response.json();
    console.log("response", responseData);

    if (!response.ok) {
      console.error("Backend validation errors:", responseData.errors); // Log validation errors if the response is not OK
      throw new Error("errorrrrr");
    }

    return responseData; // Return the parsed response
  };

  const {
    mutate: createRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created successfully");
  }

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create restaurant";
    toast.error(errorMessage);
  }

  return {
    createRestaurant,
    isLoading,
  };
};
