'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Image from "next/image";
import style from "../css/Pannel.module.css";

export default function Pannel() {
    return (
        <section className="py-2 mb-4">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide className={style.swiperslide}>
                    <Image
                        src="https://swiperjs.com/demos/images/nature-1.jpg"
                        alt="panel"
                        width={300}
                        height={300}
                        objectFit="cover"
                        className="object-cover rounded-t-lg rounded-b-lg mb-4"
                    />
                </SwiperSlide>
                <SwiperSlide className={style.swiperslide}>
                    <Image
                        src="https://swiperjs.com/demos/images/nature-2.jpg"
                        alt="panel"
                        width={300}
                        height={300}
                        objectFit="cover"
                        className="object-cover rounded-t-lg rounded-b-lg mb-4"
                    />
                </SwiperSlide>
                <SwiperSlide className={style.swiperslide}>
                    <Image
                        src="https://swiperjs.com/demos/images/nature-3.jpg"
                        alt="panel"
                        width={300}
                        height={300}
                        objectFit="cover"
                        className="object-cover rounded-t-lg rounded-b-lg mb-4"
                    />
                </SwiperSlide>
                {/* <SwiperSlide>
                    <Image
                        src="https://swiperjs.com/demos/images/nature-4.jpg"
                        alt="panel"
                        width={300}
                        height={300}
                        objectFit="cover"
                        className="object-cover rounded-t-lg rounded-b-lg mb-4"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="https://swiperjs.com/demos/images/nature-5.jpg"
                        alt="panel"
                        width={300}
                        height={300}
                        objectFit="cover"
                        className="object-cover rounded-t-lg rounded-b-lg mb-4"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="https://swiperjs.com/demos/images/nature-6.jpg"
                        alt="panel"
                        width={300}
                        height={300}
                        objectFit="cover"
                        className="object-cover rounded-t-lg rounded-b-lg mb-4"
                    />
                </SwiperSlide> */}
            </Swiper>
        </section>
    );
}
