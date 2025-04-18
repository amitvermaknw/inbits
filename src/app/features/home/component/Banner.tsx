"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Article, ArticleProps } from "@/src/interface/article";
import Image from "next/image";

const Banner = (props: ArticleProps) => {

    const [content, getContent] = useState<Article[]>([]);
    const [techContent, getTechContent] = useState<Article[]>([]);


    useEffect(() => {
        if (typeof props === 'object' && props.hasOwnProperty("politics")) {
            if (Array.isArray(props.politics)) {
                const validArticles = props.politics.slice(0, 4).filter(Boolean);
                getContent(prev => [...prev, ...validArticles]);
            }
        }
        if (typeof props === 'object' && props.hasOwnProperty("sports")) {
            if (Array.isArray(props.sports)) {
                const validArticles = props.sports.slice(0, 3).filter(Boolean);
                getContent(prev => [...prev, ...validArticles]);
            }
        }

        if (typeof props === 'object' && props.hasOwnProperty("entertainment")) {
            if (Array.isArray(props.entertainment)) {
                const validArticles = props.entertainment.slice(0, 2).filter(Boolean);
                getContent(prev => [...prev, ...validArticles]);
            }
        }

        if (typeof props === 'object' && props.hasOwnProperty("technology")) {
            if (Array.isArray(props.technology)) {
                const validArticles = props.technology.slice(0, 1).filter(Boolean);
                getTechContent(validArticles);
            }
        }

    }, [props])


    return (
        <section className="mx-auto grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 py-2">
            <div className="sm:col-span-2 px-2">
                <div className="mx-auto grid md:grid-cols-1 sm:grid-cols-2"> {/* Added mt-4 for margin top */}
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
                        modules={[Autoplay]}
                        className="w-full h-64 md:h-96 px-4"
                    >
                        {
                            content.map((item: Article, index: number) => <SwiperSlide key={index} className="flex items-center justify-center bg-blue-200">
                                <div className="relative w-full h-64 md:h-96">
                                    <Image
                                        src={item.urlToImage}
                                        alt={item.urlToImage}
                                        width={60}
                                        height={50}
                                        objectFit="contain"
                                        className="w-full h-full object-cover rounded-lg rounded-t-md rounded-b-md"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 rounded-b-lg">
                                        <h2 className="text-lg font-semibold">{item.title}</h2>
                                    </div>
                                </div>
                            </SwiperSlide>)
                        }
                    </Swiper>


                </div >
            </div>
            <div className="px-2">
                {techContent.map((item: Article, index: number) => <div key={index} className="relative w-full h-64 md:h-96">
                    <Image
                        src={item.urlToImage}
                        alt={item.urlToImage}
                        width={60}
                        height={50}
                        objectFit="contain"
                        className="w-full h-full object-cover rounded-lg rounded-t-lg rounded-b-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/20 text-white p-4 rounded-b-lg">
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                    </div>
                </div>
                )}
            </div>
        </section>
    );
};

export default Banner;