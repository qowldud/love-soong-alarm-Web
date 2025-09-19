import axios, { type AxiosResponse } from "axios";

interface BasicResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  // headers: import.meta.env.DEV
  //   ? {
  //       Authorization: `Bearer ${import.meta.env.VITE_MASTER_TOKEN}`,
  //     }
  //   : {},
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  timeout: 180000,
});

if (import.meta.env.PROD) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export const useApi = () => {
  const getData = async <T>(
    url: string,
    params?: Record<string, any>
  ): Promise<BasicResponse<T>> => {
    try {
      const response: AxiosResponse<BasicResponse<T>> = await axiosInstance.get(
        url,
        {
          params,
        }
      );

      return response.data;
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  };

  const patchData = async <T>(
    url: string,
    data: Record<string, any>
  ): Promise<BasicResponse<T>> => {
    try {
      const response: AxiosResponse<BasicResponse<T>> =
        await axiosInstance.patch(url, data);

      return response.data;
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  };

  const putData = async <T>(
    url: string,
    data: Record<string, any>
  ): Promise<BasicResponse<T>> => {
    try {
      const response: AxiosResponse<BasicResponse<T>> = await axiosInstance.put(
        url,
        data
      );

      return response.data;
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  };

  const postData = async <T>(
    url: string,
    data: Record<string, any>
  ): Promise<BasicResponse<T>> => {
    try {
      const response: AxiosResponse<BasicResponse<T>> =
        await axiosInstance.post(url, data);

      return response.data;
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  };

  const deleteData = async <T>(url: string): Promise<BasicResponse<T>> => {
    try {
      const response: AxiosResponse<BasicResponse<T>> =
        await axiosInstance.delete(url);

      return response.data;
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  };

  // Handle API Errors
  const handleApiError = (error: any) => {
    if (error.response) {
      console.log("error.response", error.response);
      console.log("API Error Response:", error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.log("API Error Request:", error.request);
    } else {
      console.log("API Error Message:", error.message);
    }
  };

  return {
    getData,
    patchData,
    putData,
    postData,
    deleteData,
  };
};

const { getData } = useApi();

export const healthCheck = async () => {
  try {
    const response = await getData("/api/v1/health-check");
    return response;
  } catch (error: any) {
    console.log(error);
  }
};
