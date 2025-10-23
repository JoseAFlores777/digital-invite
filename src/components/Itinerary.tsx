"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useGsapContext, gsap } from "@/hooks/useGsapContext";
import { useWeddingData } from "@/store/wedding";
import CalendarAddButton from "@/components/CalendarAddButton";
import CustomBtn from "@/components/CustomBtn";

type EventItem = {
  icon: string;
  title: string;
  time: string;
  location: string;
  address: string;
  description: string;
};

export default function Itinerary() {
  const root = useRef<HTMLDivElement>(null);
  const [venueName, setVenueName] = useState("");
  const [address, setAddress] = useState("");
  const [wazeLink, setWazeLink] = useState("");
  const [googleMapsLink, setGoogleMapsLink] = useState("");
  const [eventDateStr, setEventDateStr] = useState("");
  const [eventStartTimeStr, setEventStartTimeStr] = useState("");
  const [eventEndTimeStr, setEventEndTimeStr] = useState("");
  const [eventTz, setEventTz] = useState("");
  const [coupleName, setCoupleName] = useState("");

  const { data } = useWeddingData();
  useEffect(() => {
    const wg: any = data;
    setVenueName(wg?.location?.venue_name || "Casablanca Le Decor");
    setAddress(wg?.location?.address || "Local en Santa Lucia, Honduras");
    setWazeLink(wg?.location?.waze_link || "");
    setGoogleMapsLink(wg?.location?.google_maps_link || "");
    setEventDateStr(wg?.wedding?.date || "");
    setEventStartTimeStr(wg?.wedding?.start_time || "");
    setEventEndTimeStr(wg?.wedding?.end_time || "");
    setEventTz(wg?.wedding?.timezone || "");
    setCoupleName(wg?.wedding?.couple?.name || "");
  }, [data]);

  const timeRange = useMemo(() => {
    try {
      if (!eventDateStr) return "";
      const s = eventStartTimeStr || "";
      const e = eventEndTimeStr || "";
      if (!s && !e) return "";
      const to12 = (t: string) => {
        const [h, m] = t.split(":");
        const d = new Date();
        d.setHours(Number(h || 0), Number(m || 0), 0, 0);
        return d.toLocaleTimeString("es-ES", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase()
          .replace("am", "a. m.")
          .replace("pm", "p. m.");
      };
      if (s && e) return `${to12(s)} - ${to12(e)}`;
      if (s) return to12(s);
      return "";
    } catch { return ""; }
  }, [eventDateStr, eventStartTimeStr, eventEndTimeStr]);

  const events: EventItem[] = [
    {
      icon: "hugeicons:wedding",
      title: "Ceremonia y Recepción",
      time: timeRange || "",
      location: venueName || "Casablanca Le Decor",
      address: address || "Local en Santa Lucia, Honduras",
      description: "Nos uniremos en matrimonio rodeados de nuestros seres queridos",
    },
  ];

  useGsapContext(() => {
    if (!root.current) return;
    const q = gsap.utils.selector(root);
    gsap.from(q('[data-anim="card"]'), {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: root.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);


  return (
    <section id="itinerario" ref={root} className="bg-white justify-center items-center">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 lg:py-28">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="display-font text-3xl md:text-4xl">Itinerario</h2>
          <div className="w-16 h-px bg-neutral-200 mx-auto mt-4"></div>
          <p className="text-neutral-700 max-w-2xl mx-auto mt-4">
            Acompáñanos en cada momento de este día tan especial
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {events.map((event) => (
            <div
              key={event.title}
              data-anim="card"
              className="p-6 md:p-8 bg-white/80 border border-neutral-200 rounded-2xl hover:border-[color:var(--color-dusty-600)]/30 transition-colors"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[color:var(--color-dusty-600)]/10 flex items-center justify-center mb-6">
                  <Icon icon={event.icon} className="w-8 h-8 text-[color:var(--color-dusty-700)]" />
                </div>

                <h3 className="display-font text-xl md:text-2xl">{event.title}</h3>

                {event.time && (
                  <div className="flex items-center gap-2 text-neutral-900 mt-3 mb-5">
                    <Icon icon="solar:clock-circle-bold" className="w-4 h-4" />
                    <span className="text-sm leading-none">{event.time}</span>
                  </div>
                )}

                <p className="text-neutral-700 mb-6 leading-relaxed text-sm">
                  {event.description}
                </p>

                <div className="w-full rounded-xl p-4 mb-4 bg-[color:var(--color-dusty-100)]">
                  <div className="flex items-start gap-3">
                    <Icon icon="solar:map-point-bold" className="w-4 h-4 text-[color:var(--color-dusty-700)] flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <p className="font-medium text-neutral-900 mb-1 text-sm">{event.location}</p>
                      <p className="text-xs text-neutral-600">{event.address}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-stretch gap-2 sm:gap-3">
                  {googleMapsLink && (
                    <CustomBtn
                      onClick={() => window.open(googleMapsLink as string, "_blank")}
                      label="Google Maps"
                      icon="solar:map-point-bold"
                      variant="outline"
                      size="md"
                      className="flex-1 min-w-0 w-full"
                    />
                  )}
                  {wazeLink && (
                    <CustomBtn
                      onClick={() => window.open(wazeLink as string, "_blank")}
                      label="Waze"
                      icon="mdi:waze"
                      variant="outline"
                      size="md"
                      className="flex-1 min-w-0 w-full"
                    />
                  )}
                  <CalendarAddButton
                    date={eventDateStr}
                    startTime={eventStartTimeStr}
                    endTime={eventEndTimeStr}
                    timezone={eventTz}
                    coupleName={coupleName}
                    venueName={venueName}
                    address={address}
                    googleMapsLink={googleMapsLink}
                    wazeLink={wazeLink}
                    className="flex-1 min-w-0 w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 bg-white text-[color:var(--color-dusty-900)] border border-neutral-300 hover:bg-neutral-50"
                  >
                    <Icon icon="solar:calendar-bold" className="w-5 h-5" />
                    <span className="truncate text-sm">Añadir al calendario</span>
                  </CalendarAddButton>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
