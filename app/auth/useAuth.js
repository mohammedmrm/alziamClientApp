import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import { useNavigation } from "@react-navigation/native";
export default function useAuth() {
  const navigator = useNavigation();
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = authToken;
    setUser(user);
    authStorage.storeToken(authToken);
    navigator.navigate(Routes.DASHBOARD);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
}
// export default useAuth;
