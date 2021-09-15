import Image from "next/image";
import Slider from "react-slick";

const ImageContainer = ({ children }): JSX.Element => {
  return <div className="w-full h-96 relative">{children}</div>;
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

export default function SimpleGallery({ imagePaths, ...rest }) {
  const settings = {
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
  };
  return (
    <Slider {...settings} {...rest}>
      {imagePaths.map((path) => {
        return (
          <ImageContainer>
            <Image src={path} layout="fill" objectFit="contain" />
          </ImageContainer>
        );
      })}
    </Slider>
  );
}
