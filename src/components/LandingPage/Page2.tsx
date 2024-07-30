import React, { useEffect } from "react";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";

// Testimonial data
const testimonials = [
  {
    id: 1,
    rating: 5,
    title: "Stayin' Alive",
    content: "No, Rose, they are not breathing. And they have no arms or legs … Where are they? You know what? If we come across somebody with no arms or legs, do we bother resuscitating them? I mean, what quality of life do we have there?",
    author: "Michael Scott",
  },
  {
    id: 2,
    rating: 4,
    title: "Great Experience",
    content: "This was an amazing experience. I really enjoyed the process and the outcome was fantastic.",
    author: "Pam Beesly",
  },
  {
    id: 3,
    rating: 3,
    title: "Good, but room for improvement",
    content: "Overall, the service was good, but there are some areas that could be improved.",
    author: "Jim Halpert",
  },
  {
    id: 4,
    rating: 5,
    title: "Exceptional Service",
    content: "The service exceeded my expectations. I highly recommend this to everyone!",
    author: "Dwight Schrute",
  },

];

const TestimonialSlider: React.FC = () => {
  useEffect(() => {
    const keenSliderInstance = new KeenSlider("#keen-slider", {
      loop: true,
      slides: {
        origin: "center",
        perView: 1.25,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 1024px)": {
          slides: {
            origin: "auto",
            perView: 1.5,
            spacing: 32,
          },
        },
      },
    });

    const keenSliderPrevious = document.getElementById("keen-slider-previous");
    const keenSliderNext = document.getElementById("keen-slider-next");
    const keenSliderPreviousDesktop = document.getElementById(
      "keen-slider-previous-desktop"
    );
    const keenSliderNextDesktop = document.getElementById(
      "keen-slider-next-desktop"
    );

    if (
      keenSliderPrevious &&
      keenSliderNext &&
      keenSliderPreviousDesktop &&
      keenSliderNextDesktop
    ) {
      keenSliderPrevious.addEventListener("click", () =>
        keenSliderInstance.prev()
      );
      keenSliderNext.addEventListener("click", () => keenSliderInstance.next());
      keenSliderPreviousDesktop.addEventListener("click", () =>
        keenSliderInstance.prev()
      );
      keenSliderNextDesktop.addEventListener("click", () =>
        keenSliderInstance.next()
      );
    }

    return () => {
      keenSliderInstance.destroy();
    };
  }, []);

  return (
    <div className="bg-[#fff9f5] min-h-screen flex flex-col w-full p-[4rem] justify-center items-center gap-[1.3rem] md:gap-[2rem] xl:gap-[5rem]">
      <section className="bg-[#f5e8d7] rounded-xl">
        <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
            <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-customGreen xs:text-[1.5rem] md:text-[2rem] xl:text-[2.8rem] leading-tight">
              Hear from those who know us best...
              </h2>

              {/* <p className="mt-4 text-gray-700">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptas veritatis illo placeat harum porro optio fugit a culpa
                sunt id!
              </p> */}

              <div className="hidden lg:mt-8 lg:flex lg:gap-4 justify-center">
                <button
                  aria-label="Previous slide"
                  id="keen-slider-previous-desktop"
                  className="rounded-full border border-customGreen p-3 text-customGreen transition hover:bg-customGreen hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 rtl:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>

                <button
                  aria-label="Next slide"
                  id="keen-slider-next-desktop"
                  className="rounded-full border border-customGreen p-3 text-customGreen transition hover:bg-customGreen hover:text-white"
                >
                  <svg
                    className="size-5 rtl:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="-mx-6 lg:col-span-2 lg:mx-0">
              <div id="keen-slider" className="keen-slider">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="keen-slider__slide">
                    <blockquote className="flex h-full flex-col justify-between bg-[#f9eee6] p-6 shadow-sm sm:p-8 lg:p-12">
                      <div>
                        <div className="flex gap-0.5 text-customGreen">
                          {/* Star SVGs */}
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        <div className="mt-4">
                          <p className="text-2xl text-[#b9944c] sm:text-3xl">
                            {testimonial.title}
                          </p>
                          <p className="mt-4 leading-relaxed text-customBlack xs:text-xs md:text-sm">
                            {testimonial.content}
                          </p>
                        </div>
                      </div>

                      <footer className="mt-4 text-sm font-medium text-customBlack sm:mt-6">
                        &mdash; {testimonial.author}
                      </footer>
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4 lg:hidden">
            <button
              aria-label="Previous slide"
              id="keen-slider-previous"
              className="rounded-full border border-customGreen p-3 text-customGreen transition hover:bg-customGreen hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              aria-label="Next slide"
              id="keen-slider-next"
              className="rounded-full border border-customGreen p-3 text-customGreen transition hover:bg-customGreen hover:text-white"
            >
              <svg
                className="size-5 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialSlider;
