// components/Carousel.tsx

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';

interface CarouselProps {
  items: {
    id: string;
    title: string;
    description: string;
    poster: string;
    tags: string[];
    chapters?: number;
    episodes?: number;
  }[];
  category: string;
}

const Carousel: React.FC<CarouselProps> = ({ items, category }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="p-4">
            <Link href={`/${category}/${item.id}`}>
              <a>
                <div className="bg-gray-700 rounded-lg overflow-hidden">
                  <Image
                    src={item.poster}
                    alt={item.title}
                    width={200}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm">{item.description}</p>
                    <div className="mt-2">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-600 text-white px-2 py-1 rounded mr-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2">
                      {item.episodes && <span className="text-sm">Episodes: {item.episodes}</span>}
                      {item.chapters && <span className="text-sm">Chapters: {item.chapters}</span>}
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
