import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function unlinkGitHub(identifier: string) {
  try {
    console.log(`Looking for user with identifier: ${identifier}`)

    // Find user by email, githubHandle, or twitterHandle
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { githubHandle: identifier }, { twitterHandle: identifier }],
      },
      include: {
        accounts: true,
      },
    })

    if (!user) {
      console.error(`❌ User not found with identifier: ${identifier}`)
      return
    }

    console.log(`✅ Found user:`)
    console.log(`   - ID: ${user.id}`)
    console.log(`   - Email: ${user.email}`)
    console.log(`   - GitHub: ${user.githubHandle} (${user.githubId})`)
    console.log(`   - Twitter: ${user.twitterHandle}`)

    // Find GitHub account
    const githubAccount = user.accounts.find(a => a.provider === "github")

    if (!githubAccount && !user.githubId) {
      console.log("⚠️  No GitHub account linked to this user")
      return
    }

    console.log("\n🔓 Unlinking GitHub...")

    // Delete GitHub account record
    if (githubAccount) {
      await prisma.account.delete({
        where: {
          id: githubAccount.id,
        },
      })
      console.log("   ✅ Deleted GitHub Account record")
    }

    // Clear GitHub fields from User
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        githubId: null,
        githubHandle: null,
      },
    })
    console.log("   ✅ Cleared githubId and githubHandle from User")

    console.log("\n✅ GitHub successfully unlinked!")
    console.log(`   User can now link a different GitHub account.`)
  } catch (error) {
    console.error("❌ Error:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Get identifier from command line
const identifier = process.argv[2]

if (!identifier) {
  console.error("Usage: npx tsx scripts/unlink-github.ts <email|githubHandle|twitterHandle>")
  console.error("Example: npx tsx scripts/unlink-github.ts Airpote")
  process.exit(1)
}

unlinkGitHub(identifier)
