import type { AxiosError } from "axios";
import { useApi } from "./api";

const { getData, postData } = useApi();

export const postLocation = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const response = await postData<string>("/api/location/update", {
      latitude: latitude,
      longitude: longitude,
    });
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export const getLocation = async () => {
  try {
    const response = await getData<number[]>("/api/location/nearby");
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 400) {
      return null;
    } else {
      console.error(error);
    }
  }
};
