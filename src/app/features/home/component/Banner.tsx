"use client";

import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {

    return (
        <div className="w-full mt-4"> {/* Added mt-4 for margin top */}
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 8500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                // navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full h-64 md:h-96 px-4"
            >
                <SwiperSlide className="flex items-center justify-center bg-blue-200 px-4">
                    Slide 1
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center bg-green-200">
                    Slide 2
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center bg-yellow-200">
                    Slide 3
                </SwiperSlide>
            </Swiper>


        </div >
    );
};

export default Banner;