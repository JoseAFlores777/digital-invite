"use client";

import React from "react";
import Hero from "./Hero";
import StoryBeats from "./StoryBeats";
import MainDetails from "./MainDetails";
import Countdown from "./Countdown";
import Itinerary from "./Itinerary";
import Menu from "./Menu";
import DressCode from "./DressCode";
import RSVP from "./RSVP";
import Lodging from "./Lodging";
import Gift from "./Gift";
import AlbumQR from "./AlbumQR";
import MapEmbed from "./MapEmbed";
import Footer from "./Footer";
import Gallery from "./Gallery";
import SharedAlbum from "./SharedAlbum";
import PanelPinStack from "./PanelPinStack";
import BiblicalVerse_1 from "@/components/biblical-verse_1";
import PerspectiveZoom, {ZoomItemConfig} from "@/components/PerspectiveZoom";
import { Icon } from "@iconify/react";
import { useWeddingData } from "@/store/wedding";
import ScrollIdleHintOverlay from "@/components/ScrollIdleHintOverlay";

export default function InvitationContent({ inviteCode }: { inviteCode?: string }) {
    const FALLBACK_DESKTOP: ZoomItemConfig[] = [
        { src: "/images/history/layer_3/layer_3-1.webp", layer: 3, x: "12vw", y: "18%", width: "10vw" },
        { src: "/images/history/layer_2/layer_2-1.webp", layer: 2, x: "26vw", y: "12%", width: "8.5vw" },
        { src: "/images/history/layer_1/layer_1-1.webp", layer: 1, x: "40vw", y: "8%",  width: "7.5vw" },
        { src: "/images/history/layer_2/layer_2-2.webp", layer: 2, x: "58vw", y: "10%", width: "9.5vw" },
        { src: "/images/history/layer_3/layer_3-2.webp", layer: 3, x: "74vw", y: "16%", width: "11.5vw" },

        { src: "/images/history/layer_1/layer_1-2.webp", layer: 1, x: "86vw", y: "30%", width: "6.5vw" },
        { src: "/images/history/layer_2/layer_2-3.webp", layer: 2, x: "70vw", y: "34%", width: "7.5vw" },
        { src: "/images/history/layer_3/layer_3-3.webp", layer: 3, x: "54vw", y: "28%", width: "9vw" },
        { src: "/images/history/layer_1/layer_1-3.webp", layer: 1, x: "38vw", y: "26%", width: "6.8vw" },
        { src: "/images/history/layer_2/layer_2-4.webp", layer: 2, x: "22vw", y: "30%", width: "8vw" },

        { src: "/images/history/layer_3/layer_3-4.webp", layer: 3, x: "10vw", y: "50%", width: "12vw" },
        { src: "/images/history/layer_1/layer_1-4.webp", layer: 1, x: "26vw", y: "52%", width: "6vw" },
        { src: "/images/history/layer_2/layer_2-5.webp", layer: 2, x: "42vw", y: "48%", width: "7.2vw" },
        { src: "/images/history/layer_3/layer_3-5.webp", layer: 3, x: "58vw", y: "52%", width: "10vw" },
        { src: "/images/history/layer_1/layer_1-5.webp", layer: 1, x: "74vw", y: "50%", width: "6.2vw" },

        { src: "/images/history/layer_2/layer_2-6.webp", layer: 2, x: "86vw", y: "66%", width: "7.8vw" },
        { src: "/images/history/layer_1/layer_1-6.webp", layer: 1, x: "70vw", y: "70%", width: "6.5vw" },
        { src: "/images/history/layer_3/layer_3-6.webp", layer: 3, x: "54vw", y: "68%", width: "11vw" },
        { src: "/images/history/layer_2/layer_2-7.webp", layer: 2, x: "38vw", y: "72%", width: "8.8vw" },
        { src: "/images/history/layer_1/layer_1-7.webp", layer: 1, x: "22vw", y: "68%", width: "6.8vw" },

        { src: "/images/history/layer_3/layer_3-7.webp", layer: 3, x: "12vw", y: "84%", width: "13.2vw" },
        { src: "/images/history/layer_2/layer_2-8.webp", layer: 2, x: "30vw", y: "86%", width: "8.6vw" },
        { src: "/images/history/layer_1/layer_1-8.webp", layer: 1, x: "46vw", y: "88%", width: "6.2vw" },
        { src: "/images/history/layer_2/layer_2-9.webp", layer: 2, x: "62vw", y: "86%", width: "7.4vw" },
        { src: "/images/history/layer_3/layer_3-8.webp", layer: 3, x: "78vw", y: "82%", width: "12.4vw" },
    ];

    const FALLBACK_MOBILE: ZoomItemConfig[] = [
        { src: "/images/history/layer_3/layer_3-1.webp", layer: 3, x: "20vw", y: "16%", width: "26vw" },
        { src: "/images/history/layer_2/layer_2-1.webp", layer: 2, x: "68vw", y: "18%", width: "24vw" },
        { src: "/images/history/layer_1/layer_1-1.webp", layer: 1, x: "48vw", y: "30%", width: "20vw" },

        { src: "/images/history/layer_2/layer_2-2.webp", layer: 2, x: "22vw", y: "48%", width: "22vw" },
        { src: "/images/history/layer_1/layer_1-4.webp", layer: 3, x: "74vw", y: "50%", width: "28vw" },
        { src: "/images/history/layer_1/layer_1-2.webp", layer: 1, x: "16vw", y: "58%", width: "18vw" },

        { src: "/images/history/layer_2/layer_2-3.webp", layer: 2, x: "28vw", y: "74%", width: "24vw" },
        { src: "/images/history/layer_3/layer_3-3.webp", layer: 3, x: "70vw", y: "78%", width: "30vw" },
        { src: "/images/history/layer_1/layer_1-3.webp", layer: 1, x: "50vw", y: "86%", width: "20vw" },

        { src: "/images/history/layer_2/layer_2-4.webp", layer: 2, x: "12vw", y: "32%", width: "22vw" },
        { src: "/images/history/layer_1/layer_1-28.webp", layer: 1, x: "88vw", y: "34%", width: "18vw" },
        { src: "/images/history/layer_3/layer_3-4.webp", layer: 3, x: "8vw",  y: "86%", width: "28vw" },
        { src: "/images/history/layer_2/layer_2-5.webp", layer: 2, x: "92vw", y: "82%", width: "24vw" },
        { src: "/images/history/layer_1/layer_1-5.webp", layer: 1, x: "50vw", y: "10%", width: "16vw" },
    ];

    const [desktopItems, setDesktopItems] = React.useState<ZoomItemConfig[]>(FALLBACK_DESKTOP);
    const [mobileItems, setMobileItems] = React.useState<ZoomItemConfig[]>(FALLBACK_MOBILE);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const mql = window.matchMedia("(max-width: 640px)");
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    const { data } = useWeddingData();
    React.useEffect(() => {
        const wg: any = data;
        const base: string | undefined = wg?.directus_url || undefined;
        const photos: any[] = wg?.wedding?.web_photos || [];
        if (!base || !Array.isArray(photos) || photos.length === 0) return;

        const buildSrc = (asset?: string | null) => (asset ? `${base}/assets/${asset}` : "");

        const filtered = (Array.isArray(photos) ? photos : []).filter((p: any) => String(p?.type || "").toLowerCase() === "collage");
        const sortPhotos = [...filtered].sort((a, b) => {
            const sa = a?.sort ?? 0;
            const sb = b?.sort ?? 0;
            return sa - sb;
        });

        const mapDesktop: ZoomItemConfig[] = sortPhotos.map((p) => ({
            src: buildSrc(p?.asset),
            layer: p?.layer ?? undefined,
            x: p?.xposition ?? undefined,
            y: p?.yposition ?? undefined,
            width: p?.width ?? undefined,
            initialOpacity: p?.initialOpacity ?? undefined,
            zIndex: p?.zIndex ?? undefined,
        })).filter(it => !!it.src);

        const mapMobile: ZoomItemConfig[] = sortPhotos.map((p) => ({
            src: buildSrc(p?.asset),
            layer: (p?.layer_m ?? p?.layer) ?? undefined,
            x: (p?.xposition_m ?? p?.xposition) ?? undefined,
            y: (p?.yposition_m ?? p?.yposition) ?? undefined,
            width: (p?.width_m ?? p?.width) ?? undefined,
            initialOpacity: (p?.initialOpacity_m ?? p?.initialOpacity) ?? undefined,
            zIndex: (p?.zIndex_m ?? p?.zIndex) ?? undefined,
        })).filter(it => !!it.src);

        if (mapDesktop.length) setDesktopItems(mapDesktop);
        if (mapMobile.length) setMobileItems(mapMobile);
    }, [data]);

    React.useEffect(() => {
        const mql = window.matchMedia("(max-width: 640px)");
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

  return (
    <ScrollIdleHintOverlay
      delaysMs={[6000]}
      size={"sm"}
    >
      <main className="bg-[color:var(--color-dusty-50)] text-[color:var(--color-dusty-800)]">
        {/*/!* 1. Hero *!/*/}
        <Hero />
      {/*/!* 2. Cuenta regresiva *!/*/}
      <Countdown />
      {/* Banner 1: Panel pin stack */}
      <PanelPinStack />
      {/*/!* 3. Nuestra historia *!/*/}

        <PerspectiveZoom
            headingContent={
                <BiblicalVerse_1
                    kicker="11 Años De Historia"
                    couple="DIOS HA SIDO FIEL"
                    dateLine={"SANTIDAD, PUREZA Y AMOR"}
                    bgColor="bg-white"
                    textColor="text-accent-800"
                    accentColor="text-accent-800"
                    centerContent
                    uppercaseNames
                    namesTracking="tracking-widecaps"
                    namesWeight="font-medium"
                    maxWidth="max-w-3xl"
                    padding="px-6"
                    showDivider
                    fontKicker="font-script"
                    fontNames="font-display"
                    fontBody="font-body"
                    inline
                    dividerClassName={"h-32 w-[32rem] text-[color:var(--color-dusty-900)]"}
                    dividerStyle={{ fill: "#7c95ab" }}
                />
            }
            quoteText={[
                (
                    <p
                        key={1}
                        className="text-center text-[color:var(--color-dusty-800)]">
                        <Icon icon="ph:house-line" width={48} className="block mx-auto mb-3" />
                        DIOS cruzó nuestros caminos,
                        <br />
                        y bajo su cuidado y gracia, hallamos
                        <br />
                        <strong>Nuestro Hogar.</strong>
                    </p>
                ),

                (
                    <p
                        key={2}
                        className="text-center text-[color:var(--color-dusty-800)]">
                        <Icon icon="hugeicons:wedding" width={48} className="block mx-auto mb-3" />
                        Él escribió esta historia,
                        <br />
                        y hoy celebramos el capítulo más hermoso: <strong>Nuestra Unión.</strong>
                    </p>
                ),
                (
                    <p
                        key={3}
                        className="text-center text-[color:var(--color-dusty-800)]">
                        <Icon icon="material-symbols:family-group" width={48} className="block mx-auto mb-3" />
                        Y deseamos que
                        <br />
                        <strong>{inviteCode ?? ""}</strong>
                        <br />
                        sean parte de esta celebración.
                    </p>
                ),
            ]}
            items={isMobile ? mobileItems : desktopItems}
            autoLayout={true}
            perspective="100svh"
            seed={42}
        />



      {/*/!* 3. Nuestra historia *!/*/}
      {/*<StoryBeats />*/}
      {/*/!* 4. Detalles principales *!/*/}
      {/*<MainDetails />*/}
      {/*/!* 5. Programa *!/*/}
      <Itinerary />
      {/* Menú */}
      <Menu />
      {/*/!* 6. Dress code *!/*/}
      {/*<DressCode />*/}
      {/*/!* 7. RSVP *!/*/}
      <RSVP />
      {/*/!* 8. Alojamientos / Transporte *!/*/}
      {/*<Lodging />*/}
      {/*/!* 9. Regalo *!/*/}
      <Gift />
      <SharedAlbum />
      {/*/!* 10. Álbum / QR *!/*/}
      {/*<AlbumQR />*/}
      {/*/!* 11. Mapa embebido *!/*/}
      {/*<MapEmbed />*/}
      {/*/!* 12. Cierre *!/*/}
      {/* Galería */}
      <Gallery />
      <Footer />
    </main>
    </ScrollIdleHintOverlay>
  );
}
