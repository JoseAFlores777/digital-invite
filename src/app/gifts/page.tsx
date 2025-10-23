import { Metadata } from "next";
import { redirect } from "next/navigation";
import Gift from "@/components/Gift";
import GiftsLiveButton from "@/components/GiftsLiveButton";
import WeddingHeader from "@/components/WeddingHeader";
import Footer from "@/components/Footer";
import GiftsShareButton from "@/components/GiftsShareButton";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Mesa de regalos – Clarisa & José",
  description: "Comparte un detalle con los novios. Opciones seguras de regalo para la boda de Clarisa y José.",
  alternates: { canonical: "/gifts" },
  openGraph: {
    title: "Mesa de regalos – Clarisa & José",
    description: "Comparte un detalle con los novios. Opciones seguras de regalo para la boda de Clarisa y José.",
    url: "/gifts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mesa de regalos – Clarisa & José",
    description: "Opciones seguras de regalo para la boda de Clarisa y José.",
  },
};

export default async function GiftsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined } | Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolved = (searchParams && typeof (searchParams as any).then === "function")
    ? await (searchParams as Promise<{ [key: string]: string | string[] | undefined }>)
    : ((searchParams as { [key: string]: string | string[] | undefined }) || {});
  const weddingIdParam =
    (Array.isArray(resolved.wedding_id) ? resolved.wedding_id[0] : resolved.wedding_id) || "";

  // Asegurar siempre wedding_id como parámetro en la URL
  if (!weddingIdParam) {
    const fallbackWeddingId = process.env.NEXT_PUBLIC_WEDDING_ID || process.env.DIRECTUS_WEDDING_ID || "";
    if (fallbackWeddingId) {
      // Preservar otros posibles query params en el futuro (por ahora solo pasamos wedding_id)
      redirect(`/gifts?wedding_id=${encodeURIComponent(fallbackWeddingId)}`);
    }
  }

  // Build a stable share URL for SSR using current origin and wedding_id
  const hdrs = await headers();
  const protocol = hdrs.get("x-forwarded-proto") || "http";
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host") || "localhost:3000";
  const origin = `${protocol}://${host}`;
  const giftsUrl = new URL("/gifts", origin);
  if (weddingIdParam) giftsUrl.searchParams.set("wedding_id", weddingIdParam as string);
  const finalGifts = giftsUrl.toString();
  const message = `¡Hola! 🙌\n\nQueremos compartirte el enlace para enviar un regalo en línea por nuestra boda de *Clarisa y José* 💍\n\nAquí está:\n${finalGifts}\n\n¡Gracias de todo corazón\n\n*DIOS te bendiga*! 🙌`;
  const shareHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

  return (
    <main className="min-h-screen px-4 py-10 md:py-16 mx-auto max-w-3xl text-[color:var(--color-dusty-800)]">
      <WeddingHeader title="Boda Clarisa & José" />
      <GiftsLiveButton />
      <Gift shareHref={shareHref} />
      <Footer/>
    </main>
  );
}
