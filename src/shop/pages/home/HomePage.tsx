import { CustomPagination } from "@/components/custom/CustomPagination";
import { products } from "@/mocks/products.mock";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductGrid } from "@/shop/components/ProductGrid";
import { useProducts } from "@/shop/hooks/useProducts";

export const HomePage = () => {
  const { data } = useProducts();
  return (
    <>
      <CustomJumbotron title="Todos los productos" />

      <ProductGrid products={products} />

      <CustomPagination totalPages={6} />
    </>
  );
};
