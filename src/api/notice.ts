import type { Notice } from "../types/notice";
import { useApi } from "./api";

const { getData, patchData, deleteData } = useApi();

export const readIndivAlarm = async ({
  notificationId,
}: {
  notificationId: number;
}) => {
  try {
    const response = await patchData<string>(
      `/api/notifications/read/${notificationId}`,
      {}
    );
    return response;
  } catch (error: any) {}
};

export const readAllAlarm = async () => {
  try {
    const response = await patchData<string>("/api/notifications/read-all", {});
    return response;
  } catch (error: any) {}
};

export const getNotifications = async () => {
  try {
    const response = await getData<Notice[]>("/api/notifications");
    return response;
  } catch (error: any) {}
};

export const deleteAllAlarm = async () => {
  try {
    const response = await deleteData<string>("/api/notifications");
    return response;
  } catch (error: any) {}
};

export const deleteIndivAlarm = async ({
  notificationId,
}: {
  notificationId: number;
}) => {
  try {
    const response = await deleteData<string>(
      `/api/notifications/${notificationId}`
    );
    return response;
  } catch (error: any) {}
};
