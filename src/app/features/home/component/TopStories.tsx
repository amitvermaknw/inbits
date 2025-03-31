'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, FreeMode } from 'swiper/modules';

export default function TopStories() {
    return (
        <div className="w-full mt-4">
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                autoplay={{
                    delay: 8500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, FreeMode, Navigation]}
                className="w-full h-24 md:h-24"
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
                <SwiperSlide className="flex items-center justify-center bg-yellow-200">
                    Slide 4
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
