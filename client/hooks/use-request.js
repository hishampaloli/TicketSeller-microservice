import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState();

  const doRequest = async () => {
    try {
      setErrors(null);
      const { data } = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {error.response.data.errors?.map((el) => {
              return <li key={el.message}>{el.message}</li>;
            })}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
