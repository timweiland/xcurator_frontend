import Image from "next/image";
import Slider from "react-slick";

const ImageContainer = ({ children }): JSX.Element => {
  return <div className="w-32 h-32 relative">{children}</div>;
};

function CustomArrow({ className, style, onClick }) {
  return (
    <div
      className={className + " bg-primary-800 hover:bg-primary-900 rounded-lg"}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

export default function RowRecommendation({ title, start }) {
  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
  };
  return (
    <div className="w-full">
      <h2 className="font-bold text-2xl">{title}</h2>
      <Slider {...settings} className="mt-4 mx-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => {
          const index = x + start;
          const imgUrl = `https://picsum.photos/id/${index}/200`;
          return (
            <ImageContainer>
              <Image src={imgUrl} layout="fill" />
            </ImageContainer>
          );
        })}
      </Slider>
    </div>
  );
}
