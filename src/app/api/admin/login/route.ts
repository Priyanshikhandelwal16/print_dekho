import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminPassword } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = await getAdminPassword();

    if (password === adminPassword) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({ success: true, message: "Logged in successfully" });
    }

    return NextResponse.json({ success: false, message: "Invalid passcode" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
