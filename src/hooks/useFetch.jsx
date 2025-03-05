// import { useEffect, useState } from "react";

// export function useFetch(url) {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsPending(true);
//       try {
//         const req = await fetch(url);
//         console.log(req);
//         if (!req.ok) {
//           throw new Error(req.statusText);
//         }
//         const data = await req.json();
//         setData(data);
//         setIsPending(false);
//       } catch (err) {
//         setError(err.message);
//         console.log(err.message);
//         setIsPending(false);
//       }
//     };
//     fetchData();
//   }, [url]);

//   return { data, isPending, error };
// }

import { useEffect, useReducer } from "react";

const initialState = {
  data: null,
  isPending: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isPending: true, error: null };
    case "FETCH_SUCCESS":
      return { data: action.payload, isPending: false, error: null };
    case "FETCH_ERROR":
      return { data: null, isPending: false, error: action.payload };
    default:
      return state;
  }
};

export function useFetch(url) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const req = await fetch(url);
        if (!req.ok) {
          throw new Error(req.statusText);
        }
        const data = await req.json();
        if (!isCancelled) {
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        }
      } catch (err) {
        if (!isCancelled) {
          dispatch({ type: "FETCH_ERROR", payload: err.message });
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return state;
}
