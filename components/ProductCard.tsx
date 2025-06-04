// components/ProductCard.tsx

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, image }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-md">
      <Link href={`/marketplace/${id}`}>
        <a>
          <div className="h-48 bg-gray-600 rounded-t-md relative">
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-md"
            />
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm">${price.toFixed(2)}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
