import {
  useCreateMyRestaurants,
  useGetMyRestaurants,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurants();
  const { restaurant } = useGetMyRestaurants(); //iget from get method
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const isEditing = !!restaurant; //whenever page loads first time,

  return (
    <ManageRestaurantForm
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading} //anytime we try to create or update
      restaurant={restaurant}
    />
  );
};

export default ManageRestaurantPage;
