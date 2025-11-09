import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { rateLimit } from "@/lib/ratelimit"

// POST - Create application
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user has both Twitter and GitHub connected - verify from database
    // (Admins don't need GitHub to access the site, but do need it to submit)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        accounts: {
          select: {
            provider: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const hasTwitter = user.accounts.some(a => a.provider === "twitter")
    const hasGithub = user.accounts.some(a => a.provider === "github")

    // All users (including admins) need both accounts to submit applications
    if (!hasTwitter || !hasGithub) {
      return NextResponse.json(
        { error: "Please connect both X and GitHub accounts to submit an application" },
        { status: 400 }
      )
    }

    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
    if (!rateLimit(ip, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { whatYouShipped, proofOfWork, whatYouWillBuild, role, whyAvalanche } = body

    // Check if user already has an application
    const existingApplication = await prisma.application.findUnique({
      where: { userId: session.user.id },
    })

    if (existingApplication) {
      return NextResponse.json({ error: "You already have an application" }, { status: 400 })
    }

    // Get GitHub handle from database user
    const githubHandle = user.githubHandle || "unknown"

    // Create application
    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        githubHandle,
        whatYouShipped,
        proofOfWork,
        whatYouWillBuild,
        role,
        whyAvalanche,
        status: "PENDING",
        submittedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, application })
  } catch (error) {
    console.error("Application creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT - Update application
export async function PUT(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { whatYouShipped, proofOfWork, whatYouWillBuild, role, whyAvalanche } = body

    // Get existing application
    const existingApplication = await prisma.application.findUnique({
      where: { userId: session.user.id },
    })

    if (!existingApplication) {
      return NextResponse.json({ error: "No application found" }, { status: 404 })
    }

    // Check if application can be edited
    if (existingApplication.status === "APPROVED" || existingApplication.status === "REJECTED") {
      return NextResponse.json(
        { error: "Cannot edit approved or rejected applications" },
        { status: 400 }
      )
    }

    // Update application (GitHub handle stays the same from session)
    const application = await prisma.application.update({
      where: { userId: session.user.id },
      data: {
        whatYouShipped,
        proofOfWork,
        whatYouWillBuild,
        role,
        whyAvalanche,
      },
    })

    return NextResponse.json({ success: true, application })
  } catch (error) {
    console.error("Application update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET - Get user's application
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const application = await prisma.application.findUnique({
      where: { userId: session.user.id },
    })

    return NextResponse.json({ application })
  } catch (error) {
    console.error("Application fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Delete application (rejected only, with time restriction)
export async function DELETE() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get existing application
    const existingApplication = await prisma.application.findUnique({
      where: { userId: session.user.id },
    })

    if (!existingApplication) {
      return NextResponse.json({ error: "No application found" }, { status: 404 })
    }

    // Only allow deletion of rejected applications
    if (existingApplication.status !== "REJECTED") {
      return NextResponse.json(
        { error: "Only rejected applications can be deleted" },
        { status: 400 }
      )
    }

    // Check time restriction (2 weeks on production, no restriction on local)
    const isProduction = process.env.VERCEL_ENV === "production"

    if (isProduction && existingApplication.reviewedAt) {
      const now = new Date()
      const twoWeeksAfterRejection = new Date(existingApplication.reviewedAt)
      twoWeeksAfterRejection.setDate(twoWeeksAfterRejection.getDate() + 14)

      if (now < twoWeeksAfterRejection) {
        const daysLeft = Math.ceil(
          (twoWeeksAfterRejection.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        )
        return NextResponse.json(
          { error: `You can reapply in ${daysLeft} day${daysLeft === 1 ? "" : "s"}` },
          { status: 400 }
        )
      }
    }

    // Delete application
    await prisma.application.delete({
      where: { userId: session.user.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Application deletion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
