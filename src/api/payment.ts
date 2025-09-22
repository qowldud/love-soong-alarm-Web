import { useApi } from "./api";

const { postData } = useApi();

interface getPaymentResponse {
  url: string;
}

export const getPaymentUrl = async ({ item }: { item: string }) => {
  const res = await postData<getPaymentResponse>("/api/pay/checkout", { item });
  return res;
};
