import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {

  try {

    const session = await auth.api.getSession({
      headers: new Headers(request.headers),
    });

    // 🔒 Not logged in
    if (!session) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    // ✅ Continue
    return NextResponse.next();

  } catch (error) {

    console.log("SESSION ERROR:", error);

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }
}

export const config = {
  matcher: [

    "/ideas/:path",
  ],
};