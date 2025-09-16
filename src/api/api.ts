import axios, { type AxiosResponse } from "axios";

interface BasicResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_MASTER_TOKEN}`,
  },
  timeout: 180000,
  // TODO: 토큰을 쿠키에 저장할때
  // withCredentials: true, // Allow sending cookies in cross-origin requests
});

export const useApi = () => {
  const getData = async <T>(
    url: string,
    params?: Record<string, any>
  ): Promise<T> => {
    try {
      const response: AxiosResponse<BasicResponse<T>> = await axiosInstance.get(
        url,
        {
          params,
        }
      );

      return response.data.data;

      // TODO: statusCode 가 생기면 추가할 로직
      //   if (response.status === 200) {
      //     return response.data;
      //   } else {
      //     throw new Error("Failed to fetch data");
      //   }
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  };

  const patchData = async <T>(
    url: string,
    data: Record<string, any>
  ): Promise<T> => {
    try {
      const response: AxiosResponse<BasicResponse<T>> =
        await axiosInstance.patch(url, data);

      return response.data.data;
      // TODO: statusCode 가 생기면 추가할 로직
      //   if (response.status === 200 || response.status === 201) {
      //     return response.data;
      //   } else if (response.status === 302) {
      //     return { ...response.data, status: 302 };
      //   } else {
      //     return response.data;
      //   }
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  };

  const putData = async <T>(
    url: string,
    data: Record<string, any>
  ): Promise<T> => {
    try {
      const response: AxiosResponse<BasicResponse<T>> = await axiosInstance.put(
        url,
        data
      );

      return response.data.data;
      // TODO: statusCode 가 생기면 추가할 로직
      //   if (response.status === 200 || response.status === 201) {
      //     return response.data;
      //   } else if (response.status === 302) {
      //     return { ...response.data, status: 302 };
      //   } else {
      //     return response.data;
      //   }
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  };

  const postData = async <T>(
    url: string,
    data: Record<string, any>
  ): Promise<T> => {
    try {
      const response: AxiosResponse<BasicResponse<T>> =
        await axiosInstance.post(url, data);

      return response.data.data;

      // TODO: statusCode 가 생기면 추가할 로직
      //   if (response.status === 200 || response.status === 201) {
      //     return response.data;
      //   } else if (response.status === 302) {
      //     return { ...response.data, status: 302 };
      //   } else {
      //     return response.data;
      //   }
      //   if (response.status === 200 || response.status === 201) {
      //     return response.data;
      //   } else if (response.status === 302) {
      //     return { ...response.data, status: 302 };
      //   } else {
      //     throw new Error("Failed to post data");
      //   }
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  };

  const deleteData = async <T>(url: string): Promise<T> => {
    try {
      const response: AxiosResponse<BasicResponse<T>> =
        await axiosInstance.delete(url);

      return response.data.data;
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
