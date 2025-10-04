import { NextResponse } from "next/server";
import { getDigitalGuestsRx } from "@/server/services/guests.rx.service";

export async function GET() {
  try {
    const guests = await getDigitalGuestsRx();
    return NextResponse.json({ guests }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ guests: [], error: "failed_to_fetch" }, { status: 500 });
  }
}
