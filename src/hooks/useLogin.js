import { auth } from "../firebase/config.js";
import { useState, useEffect } from "react";
import {useAuthContext} from './useAuthContext'

const useLogin = () => {
const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {dispatch} = useAuthContext()


 const login = async (email, password) => {
    // remove previous error
    setError(null);
    setIsLoading(true);

    try {
      // Login
      const response = await auth.signInWithEmailAndPassword(email, password)

      if (!response) {
        throw new Error("Something went wrong!");
      }

    console.log(response.user);
      // dispatch action to update login user local state 
      dispatch({type:'LOGIN', payload: response.user})

      if(!isCancelled){
    setIsLoading(false);
      setError(null);
      }

      
    } catch (err) {
    console.log(err.message);
    if(!isCancelled){
      setError(err.message);
      setIsLoading(false);
    }

    }
  };

  useEffect(() => {
      return () => {
          setIsCancelled(true)
      }
  }, [])

  return {
    error,
    isLoading,
    login,
  };
};

export default useLogin;
