import { useReducer } from "react";
import UserContext from "./UserContext";
import reducer from "./UserReducer";

let userI = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};


const initialState = {
  user: userI,
 
};

const UserState = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider
      value={{
        user,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
