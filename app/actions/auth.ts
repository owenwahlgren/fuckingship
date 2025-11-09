"use server"

import { signIn } from "@/lib/auth"

export async function connectGitHub() {
  await signIn("github", { redirectTo: "/" })
}

export async function connectTwitter() {
  await signIn("twitter", { redirectTo: "/" })
}
