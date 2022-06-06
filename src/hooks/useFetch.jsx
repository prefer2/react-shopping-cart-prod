import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSnackbarOpen } from "@/redux/modules/snackbar";

import appClient from "@/utils/appClient";
import { MESSAGE, ERROR_CODE } from "@/constants";

export const useFetch = (method, url, initialData = {}) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const getData = async (payload = {}) => {
    try {
      const { data } = await appClient[method](url, payload);
      setData(data);
      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      const { errorCode } = error.response.data;
      dispatch(toggleSnackbarOpen(MESSAGE[ERROR_CODE[errorCode]]));
      setIsLoading(false);
      setError(true);
      setSuccess(false);
    }
  };

  return { data, isLoading, error, success, getData };
};
