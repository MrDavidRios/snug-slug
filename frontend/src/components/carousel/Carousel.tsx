import React, { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import expandArrow from "../../assets/arrow.svg";

register();

interface CarouselProps {
  imgUrls: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ imgUrls }) => {
  const swiperElRef = useRef<HTMLElement>(null);

  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    if (!prevBtnRef.current || !nextBtnRef.current) return;

    nextBtnRef.current.addEventListener("click", () => {
      // @ts-expect-error Swiper is not typed
      swiperElRef.current!.swiper.slideNext();
    });

    prevBtnRef.current.addEventListener("click", () => {
      // @ts-expect-error Swiper is not typed
      swiperElRef.current!.swiper.slidePrev();
    });
  }, []);

  return (
    <div className="carousel-wrapper">
      <swiper-container ref={swiperElRef} pagination={true} loop={true}>
        {imgUrls.map((url, idx) => (
          <swiper-slide key={idx}>
            <img src={url} />
          </swiper-slide>
        ))}
      </swiper-container>
      <div className="button-wrapper">
        <button className="button-prev" ref={prevBtnRef}>
          <img src={expandArrow} />
        </button>
        <button className="button-next" ref={nextBtnRef}>
          <img src={expandArrow} />
        </button>
      </div>
    </div>
  );
};
