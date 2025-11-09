import { DefaultSession } from "next-auth"

declare module "next-auth" {
  export interface Session {
    user: {
      id: string
      role: "USER" | "ADMIN"
      twitterHandle?: string | null
      githubHandle?: string | null
      hasTwitter?: boolean
      hasGithub?: boolean
    } & DefaultSession["user"]
  }
}
