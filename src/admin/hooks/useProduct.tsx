import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-by-id.action";
import type { Product } from "@/interfaces/product.interface";

export const useProduct = (id: string) => {
  const query = useQuery({
    queryKey: ["/product", { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  //const mutation = useMutation();

  const handleSubmitForm = async (productLike: Partial<Product>) => {
    console.log({ productLike });
  };
  return {
    ...query,
    handleSubmitForm,
  };
};
