import { useEffect, useState } from "react";
import { firestore } from "../firbase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  console.log(collection, id);

    useEffect(() => {
      const ref = firestore.collection(collection).doc(id);

      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          if (snapshot.data()) {
            setDocument({ ...snapshot.data(), id: snapshot.id });
            setError(null);
          } else {
            setError("No document exists");
          }
        },
        (error) => {
          setError("Failed to get document");
        }
      );

      return () => unsubscribe();
    }, [collection, id]);

  console.log(document);
  return { document, error };
};
