import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (API, metodo, body) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:5000";

  const axConfig = async () => {
    try {
      const response = await axios({
        method: metodo,
        url: `${url}${API}`,
        data: body,
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(!loading);
    }
  };

  useEffect(() => {
    if (
      (metodo === "post" || metodo === "put" || metodo === "delete")
    ) {
      axConfig();
    } else if (metodo === "get" || metodo === undefined) {
      axConfig();
    } else {
      setLoading(!loading);
    }
  }, [API, metodo, body]);

  return { data, error, loading };
};

export default useAxios;