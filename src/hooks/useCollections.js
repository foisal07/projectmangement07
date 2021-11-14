import { useState, useEffect } from "react";
import { firestore } from "../firbase/config";
import { useRef } from "react";

export default function useCollections(collection, _query, _orderBy) {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array which is a reference value and will be "different" on every function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let collectionRef = firestore.collection(collection);

    if (query) {
      collectionRef = collectionRef.where(...query);
    }

    if (orderBy) {
      collectionRef = collectionRef.orderBy(...orderBy);
    }

    setIsLoading(true);

    const unsubscribe = collectionRef.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setError(null);
        setIsLoading(false);
        setDocuments(results);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch data");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collection, query, orderBy]);

  return { documents, error, isLoading };
}
