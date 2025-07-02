import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselImages = [
    "/carousel/1.jpg",
    "/carousel/3.jpg",
    "/carousel/4.jpg",
    "/carousel/7.jpg",
    "/carousel/8.jpg",
    "/carousel/9.jpg",

];

const Carousel = () => {
    const [index, setIndex] = useState(0);
    const totalSlides = carouselImages.length;



    const goToPrev = () => {
        setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToNext = () => {
        setIndex((prev) => (prev + 1) % totalSlides);
    };

    return (
        <div className="carousel w-full h-[480px] -mb-60 relative overflow-hidden">
            {carouselImages.map((src, i) => (
                <div
                    key={i}
                    className={`carousel-item w-full absolute transition-opacity duration-1000 ease-in-out ${i === index ? "opacity-100 relative" : "opacity-0"
                        }`}
                >
                    <img src={src} loading="lazy" className="w-full h-full object-cover" />
                </div>
            ))}

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10">
                <button className="btn btn-circle" onClick={goToPrev}>
                    <ChevronLeft size={24} />
                </button>
                <button className="btn btn-circle" onClick={goToNext}>
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
