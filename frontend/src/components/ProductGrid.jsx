import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  return (
    <div className="row g-3 g-lg-4 row-cols-2 row-cols-md-3 row-cols-xl-4">
      {products.map((p) => (
        <div className="col" key={p.id}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
