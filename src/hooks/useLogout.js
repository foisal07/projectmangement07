import { auth, firestore } from "../firbase/config";
import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    console.log(auth);
    // remove previous error
    setError(null);
    setIsLoading(true);

    try {
      // Update online status
      const { uid } = auth.currentUser;
      await firestore.collection("users").doc(uid).update({ online: false });

      // Logout
      await auth.signOut();

      // dispatch action to update logout local state
      dispatch({ type: "LOGOUT" });

      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }
    } catch (err) {
      console.log(err.message);
      if (!isCancelled) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return {
    error,
    isLoading,
    logout,
  };
};

export default useLogout;
