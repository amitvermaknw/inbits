'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, EffectCards } from 'swiper/modules';
import Image from "next/image";
import style from "../css/Pannel.module.css";

export default function Pannel() {
    return (
        <section className="py-2 mb-4">
            {/* <Swiper
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
            </Swiper> */}

            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className={style.swiper}
            >
                <SwiperSlide className={`${style.swiperslide} ${style.firstswiperslide}`}>Slide 1</SwiperSlide>
                <SwiperSlide className={`${style.swiperslide} ${style.secondswiperslide}`}>Slide 2</SwiperSlide>
                <SwiperSlide className={`${style.swiperslide} ${style.thirdswiperslide}`}>Slide 3</SwiperSlide>
                <SwiperSlide className={`${style.swiperslide} ${style.fourthswiperslide}`}>Slide 4</SwiperSlide>
                {/* <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide> */}
            </Swiper>
        </section>
    );
}
