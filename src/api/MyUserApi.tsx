/* it'll gonna have all hooks what we need: */

import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser /* we renamed mutateasync to createuser */,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  /* now we have our custom hook which makes api request. we will add it to auth0 provider.  */

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};
