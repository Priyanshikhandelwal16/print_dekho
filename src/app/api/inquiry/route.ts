import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/siteData";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || (!body.phone && !body.email)) {
      return NextResponse.json({ success: false, message: "Name and contact info are required" }, { status: 400 });
    }

    const inquiry = await addInquiry(body);
    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error submitting inquiry" }, { status: 500 });
  }
}
