import { tesloApi } from "@/api/tesloApi";
import type { ProductResponse } from "@/interfaces/products.response";

export const getProductsAction = async () => {
  const { data } = await tesloApi.get<ProductResponse>("/products");

  console.log(data);

  return data;
};
