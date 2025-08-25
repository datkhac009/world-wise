import { createContext, useContext, useReducer } from "react";


const AuthContext = createContext()
const initialState = {
    user:null,
    isAuthenticated:"",
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function reducer(state,action){
    switch (action.type) {
        case "login":{
            return{...state}
        }
        case "logout":{
            return{...state}
        }
            
         
    
        default:
            break;
    }
}
function AuthProvider({children}){
    const [{user,isAuthenticated},dispatch] = useReducer(reducer,initialState)
    function Login(email,password){
        if(email === FAKE_USER.email && password === FAKE_USER.password) dispatch({type:"login", payload:FAKE_USER})
    } 
    function Logout(){
        dispatch({type:"logout"})
    }
    const value={
        user,
        isAuthenticated,
    }
    return<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth(){
    const ctx = useContext(AuthContext);
    if(ctx === undefined ) throw new Error("AuthContext was outside AuthProvider");
        return ctx
}
export {AuthProvider,useAuth}