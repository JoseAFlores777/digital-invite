"use client";

import * as React from "react";
import Image from "next/image";
import PeonieSVG from "@/components/PeonieSvg";

/**
 * Props del componente
 */
export type BiblicalVerse_1Props = {
    // Textos
    kicker?: string;                 // “Save the Date”
    couple?: string;                 // “EMMA AND DAVID”
    dateLine?: string;               // “SATURDAY, SEPTEMBER 23RD, 2035”
    addressLines?: string[];         // varias líneas de dirección

    // Estilo
    bgColor?: string;                // tailwind class p.ej. "bg-white"
    textColor?: string;              // tailwind class p.ej. "text-accent-800"
    accentColor?: string;            // tailwind class p.ej. "text-accent-700"
    centerContent?: boolean;         // centra verticalmente
    uppercaseNames?: boolean;        // convierte nombres a mayúsculas + tracking
    namesTracking?: string;          // p.ej. "tracking-widecaps"
    namesWeight?: string;            // p.ej. "font-medium" | "font-semibold"
    maxWidth?: string;               // contenedor, p.ej. "max-w-3xl"
    padding?: string;                // p.ej. "px-6"

    // Divider decorativo
    showDivider?: boolean;
    dividerClassName?: string
    dividerStyle?: React.CSSProperties
    dividerType?: "leaf" | "peonies"; // tipo de divisor

    // Tipografías (mapeadas en tailwind.config)
    fontKicker?: string;             // "font-script"
    fontNames?: string;              // "font-display"
    fontBody?: string;               // "font-body"

    // Modo inline (para incrustar dentro de otros layouts)
    inline?: boolean;
};

export default function BiblicalVerse_1({
                                        kicker = "Save the Date",
                                        couple = "EMMA AND DAVID",
                                        dateLine = "Clarisa & José",
                                        addressLines = [],
                                        bgColor = "bg-white",
                                        textColor = "text-accent-800",
                                        accentColor = "text-accent-700",
                                        centerContent = true,
                                        uppercaseNames = true,
                                        namesTracking = "tracking-widecaps",
                                        namesWeight = "font-semibold",
                                        maxWidth = "max-w-3xl",
                                        padding = "px-6",

                                        showDivider = true,
                                        dividerClassName = "",
                                        dividerStyle,
                                        dividerType = "peonies",

                                        fontKicker = "font-script",
                                        fontNames = "font-display",
                                        fontBody = "font-body",

                                        inline = false,
                                    }: BiblicalVerse_1Props) {
    const gridClasses = centerContent
        ? "grid min-h-[100svh] place-items-center"
        : "min-h-[100svh] flex items-start";

    const inner = (
        <div className={`w-full ${maxWidth} ${padding} text-center`}>
            {kicker && (
                <p className={`${fontKicker} text-2xl md:text-3xl mb-6`} style={{ lineHeight: 1.2 }}>
                    {kicker}
                </p>
            )}

            <h1
                className={[
                    fontNames,
                    namesWeight,
                    "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
                    uppercaseNames ? "uppercase" : "",
                    uppercaseNames ? namesTracking : "",
                ].join(" ")}
                style={{ lineHeight: 1.1 }}
            >
                {couple}
            </h1>

            {showDivider && (
                <div className="my-8 flex justify-center">
                    {dividerType === "peonies" ? (
                        <PeoniesDivider className={`${dividerClassName}`} style={dividerStyle} />
                    ) : (
                        <LeafDivider className={`${accentColor} ${dividerClassName}`} style={dividerStyle} />
                    )}
                </div>
            )}

            {dateLine && (
                <p className={`${fontNames} ${accentColor} uppercase ${namesTracking} text-base sm:text-lg md:text-xl`}>
                    {dateLine}
                </p>
            )}

            {!!addressLines?.length && (
                <div className={`${fontBody} mt-6 space-y-1 text-sm md:text-base`}>
                    {addressLines.map((line, i) => (
                        <p key={i} className="opacity-80">
                            {line}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );

    if (inline) {
        return inner;
    }

    return (
        <section className={`${gridClasses} ${bgColor} ${textColor}`}>
            {inner}
        </section>
    );
}

/** Divider SVG “ramas” en trazo */
function LeafDivider({ className = "", style }: { className?: string, style?: React.CSSProperties }) {
    return (
        <svg
            viewBox="0 0 400 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-10 w-auto ${className}`}
            style={style}
            aria-hidden="true"
        >
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M200 35c-20 0-40 10-60 10S100 35 80 35M200 35c20 0 40 10 60 10s40-10 60-10" />
                <path d="M80 35c5 0 15-10 20-20m-20 20c-5 0-15-10-20-20m260 20c-5 0-15-10-20-20m20 20c5 0 15-10 20-20" />
                <path d="M200 35c0 8-6 12-10 16m10-16c0 8 6 12 10 16" />
            </g>
        </svg>
    );
}

function PeoniesDivider({ className = "", style }: { className?: string, style?: React.CSSProperties }) {
    return (
        <>
            {/*<Image*/}
            {/*src={"/svg/peonies_divider.svg"}*/}
            {/*width={100}*/}
            {/*height={100}*/}
            {/*className={`h-40 w-auto ${className}`}*/}
            {/*aria-hidden="true"*/}
            {/*loading="lazy"*/}
            {/*alt={""}*/}
            {/*></Image>*/}

            <PeonieSVG
                width={100}
                height={100}
                className={`${className}`}
                style={style}
                aria-hidden="true"
            />
        </>
    );
}