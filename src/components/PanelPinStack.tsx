'use client';

import React from 'react';
import s from './PanelPinStack.module.scss';
import Hero from "@/components/Hero";
import PhotoBanner1 from "@/components/photoBanner_1";


export default function PanelPinStack() {


    return (
        <>
            <div className="relative">
                <div
                    className="sticky top-0 h-screen w-full">
                    <PhotoBanner1
                        src="/images/IMG_0049.JPG"
                    />
                </div>
                <div
                    className="sticky top-0 h-screen w-full">
                    <PhotoBanner1
                        src="/images/IMG_0097.JPG"
                    />
                </div>
                <div
                    className="sticky top-0 h-screen w-full">
                    <PhotoBanner1
                        src="/images/IMG_0136.JPG"
                    />
                </div>
                <div
                    className="sticky top-0 h-screen w-full">
                    <PhotoBanner1
                        src="/images/IMG_0146.JPG"
                    />
                </div>
            </div>
        </>
);
}