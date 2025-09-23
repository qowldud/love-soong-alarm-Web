import axios, { type AxiosResponse } from "axios";
import { useAuthStore } from "../store/authStore";

interface BasicResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  timeout: 180000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else if (import.meta.env.DEV && import.meta.env.VITE_MASTER_TOKEN) {
      config.headers.Authorization = `Bearer ${
        import.meta.env.VITE_MASTER_TOKEN
      }`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 리프레시

const { logout } = useAuthStore.getState();

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료로 인한 401 에러 + 재시도 안했으면
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/reissue") // 무한루프 방지
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosInstance.post("/api/auth/reissue");

        const newAccessToken = refreshResponse.data.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        console.log("재발급 완료!");

        // 원래 요청에 새 토큰 붙이고 재요청
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 재발급 실패", refreshError);
        localStorage.clear();
        sessionStorage.clear();
        logout();
        window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

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
    data?: Record<string, any>
  ): Promise<BasicResponse<T>> => {
    try {
      const response: AxiosResponse<BasicResponse<T>> =
        await axiosInstance.post(url, data);

      return response.data;
    } catch (error: any) {
      if (
        error.response.status === 400 &&
        error.response.data.message ===
          "사용 가능한 채팅 슬롯이 존재하지 않습니다."
      )
        return error.response.data;

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
      console.log(error.resopnse);
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
