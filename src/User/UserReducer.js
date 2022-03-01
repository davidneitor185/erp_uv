
const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(payload));
     
      return {
        ...state,
        user: payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,        
        user: null,
       
      };
    

    default:
      return state;
  }
};

export default reducer;
