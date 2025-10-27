import NextAuth from "next-auth"
import Twitter from "next-auth/providers/twitter"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import type { NextAuthConfig } from "next-auth"

// Admin X/Twitter handles from environment variable (comma-separated)
const ADMIN_HANDLES = (process.env.ADMIN_TWITTER_HANDLES || 'owenwahlgren,freakingship')
  .split(',')
  .map(h => h.trim().toLowerCase())

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      profile(profile) {
        console.log('Raw Twitter profile:', JSON.stringify(profile, null, 2))
        
        // Handle error responses from Twitter
        if ((profile as any).status === 429 || (profile as any).title === "Too Many Requests") {
          console.error('Twitter rate limit error - Check your Twitter app settings')
          throw new Error('Twitter authentication temporarily unavailable. Please try again later or contact support.')
        }
        
        return {
          id: (profile.data?.id || profile.id) as string,
          name: (profile.data?.username || profile.username || profile.name) as string,
          email: (profile.data?.email || profile.email) as string | null,
          image: (profile.data?.profile_image_url || profile.profile_image_url) as string | null,
        }
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "read:user"
        }
      },
      profile(profile) {
        console.log('Raw GitHub profile:', JSON.stringify(profile, null, 2))
        return {
          id: profile.id.toString(),
          name: profile.login || profile.name,
          email: profile.email || null,
          image: profile.avatar_url,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Block sign in if Twitter rate limited
      if (account?.provider === "twitter" && (profile as any)?.status === 429) {
        return false
      }
      
      // Update user data in database after adapter creates the user
      if (user.id && account && profile) {
        const updateData: any = {}
        
        if (account.provider === "twitter") {
          const twitterUsername = (profile as any)?.data?.username || (profile as any)?.username
          updateData.twitterHandle = twitterUsername
          updateData.twitterId = account.providerAccountId
          
          // Check if admin
          if (twitterUsername && ADMIN_HANDLES.includes(twitterUsername.toLowerCase())) {
            updateData.role = 'ADMIN'
          }
        }
        
        if (account.provider === "github") {
          const githubUsername = (profile as any)?.login
          updateData.githubHandle = githubUsername
          updateData.githubId = account.providerAccountId
        }
        
        // Update database with retry logic
        if (Object.keys(updateData).length > 0) {
          const updateUserWithRetry = async (retries = 0): Promise<void> => {
            // Wait longer on first attempt to let adapter create user
            if (retries === 0) {
              await new Promise(resolve => setTimeout(resolve, 1000))
            }
            
            try {
              await prisma.user.update({
                where: { id: user.id! },
                data: updateData,
              })
              console.log('✓ Updated user in database:', updateData)
            } catch (err: any) {
              if (err.code === 'P2025' && retries < 15) {
                // User not found yet, retry with exponential backoff
                const delay = Math.min(500 * Math.pow(1.5, retries), 3000)
                console.log(`User not found, retrying in ${delay}ms... (${retries + 1}/15)`)
                await new Promise(resolve => setTimeout(resolve, delay))
                return updateUserWithRetry(retries + 1)
              } else {
                console.error('Error updating user in signIn after retries:', err)
              }
            }
          }
          
          // Start async update (don't await to not block sign in)
          updateUserWithRetry()
        }
      }
      
      return true
    },
    async jwt({ token, account, profile, user, trigger }) {
      // Initial sign in or new account connection - capture data from OAuth profile
      if (account && profile) {
        if (account.provider === "twitter") {
          // Twitter OAuth 2.0 profile structure
          const twitterUsername = (profile as any)?.data?.username || (profile as any)?.username || (user as any)?.name
          token.twitterHandle = twitterUsername
          token.twitterId = account.providerAccountId
          token.hasTwitter = true
          
          console.log('Twitter profile:', JSON.stringify(profile, null, 2)) // Debug
          console.log('Twitter handle extracted:', twitterUsername) // Debug
          
          // Check if admin
          if (twitterUsername && ADMIN_HANDLES.includes(twitterUsername.toLowerCase())) {
            token.role = "ADMIN"
          }
        }
        
        if (account.provider === "github") {
          const githubUsername = (profile as any)?.login || (user as any)?.name
          
          token.githubHandle = githubUsername
          token.githubId = account.providerAccountId
          token.hasGithub = true
          
          console.log('GitHub profile:', JSON.stringify(profile, null, 2)) // Debug
          console.log('GitHub handle extracted:', githubUsername) // Debug
        }
      }
      
      // If no account but we have a token.sub, check database for persisted data
      if (!account && token.sub) {
        // Fetch from database to get latest data
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
            select: {
              twitterHandle: true,
              githubHandle: true,
              role: true,
              accounts: {
                select: { provider: true },
              },
            },
          })
          
          if (dbUser) {
            token.twitterHandle = dbUser.twitterHandle || token.twitterHandle
            token.githubHandle = dbUser.githubHandle || token.githubHandle
            token.role = dbUser.role || token.role
            token.hasTwitter = dbUser.accounts.some(a => a.provider === 'twitter')
            token.hasGithub = dbUser.accounts.some(a => a.provider === 'github')
          }
        } catch (error) {
          // Ignore Prisma errors in edge runtime
        }
      }
      
      // Ensure defaults
      if (!token.role) token.role = "USER"
      if (token.hasTwitter === undefined) token.hasTwitter = false
      if (token.hasGithub === undefined) token.hasGithub = false
      
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = (token.role as any) || "USER"
        session.user.twitterHandle = (token.twitterHandle as string) || null
        session.user.githubHandle = (token.githubHandle as string) || null
        session.user.hasTwitter = (token.hasTwitter as boolean) || false
        session.user.hasGithub = (token.hasGithub as boolean) || false
      }
      return session
    },
  },
  pages: {
    signIn: "/",
    error: "/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update every 24 hours
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  trustHost: true,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

