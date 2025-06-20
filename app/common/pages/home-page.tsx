import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";

export default function HomePage() {
  return (
    <div className="container mx-auto px-20 py-20 ">
      <h1 className="text-3xl font-bold">Welcome Home</h1>
      <p className="mt-4">This is your home page.</p>
      <Button variant="link" asChild className="text-lg p-0">
        <Link to="/products/leaderboards">Explore all products &rarr;</Link>
      </Button>
      <Link to="/products/productId">
        <ProductCard
          title="Product 1"
          content="This is a product"
          description="This is a product"
        />
      </Link>
    </div>
  );
}
