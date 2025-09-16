import { useApi } from "./api";

const { postData, putData, patchData, deleteData } = useApi();

export const updateUserProfile = async ({ id }: { id: number }) => {
  try {
    const response = await putData("/api/users/me", { id: id });
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export const checkUserProfile = async ({ userId }: { userId: number }) => {
  try {
    const response = await patchData(`/api/users/${userId}`, {});
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export const onboardingProfile = async () => {
  try {
    const response = await patchData(`/api/users/on-boarding`, {});
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export const reIssueToken = async () => {
  try {
    const response = await postData(`/api/auth/reissue`, {});
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export const withdrawUser = async () => {
  try {
    const response = await deleteData(`/api/auth/withdraw`);
    return response;
  } catch (error: any) {
    console.log(error);
  }
};
