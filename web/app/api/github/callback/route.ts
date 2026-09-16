import { NextRequest, NextResponse } from "next/server"
import { finishGitHubConnection } from "@/lib/coding/github"
import { getEnv } from "@/lib/env"

export async function GET(request: NextRequest) {
  // Read request data before runtime config so prerendering stops here.
  const code = request.nextUrl.searchParams.get("code")
  const state = request.nextUrl.searchParams.get("state")
  const target = new URL("/settings/account", getEnv().BETTER_AUTH_URL)
  try {
    if (!code || !state) throw new Error("GitHub authorization was cancelled")
    await finishGitHubConnection(code, state)
  } catch {
    // OAuth errors can contain request bodies with tokens. Never log them.
    target.searchParams.set("github", "failed")
  }
  return NextResponse.redirect(target)
}
