import {
  useCreateMyRestaurants,
  useGetMyRestaurants,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurants();
  const { restaurant } = useGetMyRestaurants(); //iget from get method
  return (
    <ManageRestaurantForm
      onSave={createRestaurant}
      isLoading={isLoading}
      restaurant={restaurant}
    />
  );
};

export default ManageRestaurantPage;
