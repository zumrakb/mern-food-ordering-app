import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0(); //this gives us access to current logged in user.
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);

  //whenever component load, we wanna create user.
  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      /* whenever user sign in, we are passing user and email to our createuser function */
      createUser({ auth0Id: user.sub, email: user.email });
      //after creating user, we cna make this true;
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
