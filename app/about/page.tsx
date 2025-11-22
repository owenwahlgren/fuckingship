import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - fuckingship',
  description: 'Private Avalanche builders who ship weekly, publicly, on mainnet. No grants. No BS.',
  alternates: {
    canonical: 'https://fuckingship.org/about',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'About f🔻ckingship',
    description: 'Private Avalanche builders who ship weekly, publicly, on mainnet. No grants. No BS.',
    url: 'https://fuckingship.org/about',
    type: 'website',
    images: [
      {
        url: 'https://fuckingship.org/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'f🔻ckingship - Avalanche builders who ship',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About f🔻ckingship',
    description: 'Private Avalanche builders who ship weekly, publicly, on mainnet. No grants. No BS.',
    creator: '@freakingship',
    images: ['https://fuckingship.org/opengraph-image'],
  },
}

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="text-sm text-black/60 hover:text-black mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-6xl font-bold text-black mb-4 tracking-tight">f🔻ckingship</h1>
          <div className="h-1 w-24 bg-[#E84142]"></div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="space-y-12">
            {/* Intro */}
            <div>
              <p className="text-xl text-black leading-relaxed">
                We're a private sprint program for Avalanche builders. Ship weekly, publicly, on mainnet. We start with 25 builders and run rolling admission.
              </p>
              <p className="text-xl text-black leading-relaxed mt-6 font-semibold">
                No stealth. No decks. No grant beggars. No pre-announces.
              </p>
              <p className="text-lg text-black/80 leading-relaxed mt-6">
                If you haven't deployed a <strong>user-visible mainnet artifact in the last 60 days</strong>, this isn't for you.
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* What is Ship */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">What is Ship?</h2>
              <p className="text-xl text-black/90 leading-relaxed mb-6">
                A user-visible mainnet artifact with proof:
              </p>
              <div className="space-y-3 ml-6 mb-8">
                <p className="text-lg text-black/90 leading-relaxed">• Live URL</p>
                <p className="text-lg text-black/90 leading-relaxed">• Contract address + deployment txn</p>
                <p className="text-lg text-black/90 leading-relaxed">• Merged PR powering a live service</p>
                <p className="text-lg text-black/90 leading-relaxed">• ≤60-second demo showing it works</p>
              </div>
              <p className="text-base text-black/70 leading-relaxed mb-6">
                Infra counts if it serves live traffic. Testnet is allowed every other week (week 1 → testnet, week 2 → mainnet, week 3 → testnet, rinse and repeat).
              </p>
              <div className="border-l-4 border-[#E84142] pl-6 py-2">
                <p className="text-lg text-black font-semibold leading-relaxed">
                  Done = deployed + a measurable behavior you're watching
                </p>
                <p className="text-base text-black/70 mt-1">
                  (signups, tx count, retention, revenue flow)
                </p>
              </div>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Cohort Mechanics */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">Cohort Mechanics</h2>
              <p className="text-lg text-black/90 leading-relaxed">
                Rolling admission. Dynamic membership. We start with 25 builders and adjust as needed. Ship or leave. Re-apply anytime after shipping a new mainnet artifact.
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Tracks */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">Tracks</h2>
              <p className="text-lg text-black/90 leading-relaxed mb-6">
                Pick one. Nothing is off-limits if it fills a real gap on Avalanche.
              </p>
              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold text-black mb-3">Chase degen/viral narratives</p>
                  <p className="text-base text-black/70 leading-relaxed">
                    Arena.Social just launched mini apps? → build your own.
                  </p>
                  <p className="text-base text-black/70 leading-relaxed mt-2">
                    KET shameboard is popular on X? → build something USEFUL to compliment it.
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold text-black mb-3">Novel app with Avalanche tech</p>
                  <p className="text-base text-black/70 leading-relaxed italic">
                    Encrypted ERC-20s, Custom L1s, ICM and ICTT...
                  </p>
                  <p className="text-base text-black/70 leading-relaxed mt-2">
                    Why can't I deposit encrypted USDC on Aave? → build the primitive.
                  </p>
                  <p className="text-base text-black/70 leading-relaxed mt-2">
                    Why hasn't anyone built a HyperLiquid-style product on an Avalanche L1? → start building it.
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold text-black mb-3">Port from other chains</p>
                  <div>
                    <p className="text-base text-black/70 leading-relaxed">
                      Saw punk.auction on Ethereum? → ship nochillio.auction on Avalanche.
                    </p>
                    <p className="text-base text-black/70 leading-relaxed mt-2">
                      Saw football.fun on Solana? → ship the Avalanche equivalent.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 mb-6 text-center">
                <p className="text-base text-black/60 italic">
                  These are just examples.
                  <br />
                  You can build anything you want, it just has to be on Avalanche, high quality and serve a purpose.
                </p>
              </div>
              <div className="mt-8 p-4 bg-gray-50 border-l-4 border-black">
                <p className="text-base text-black/70 leading-relaxed">
                  This is <strong>NOT</strong> a place for NFT collection launches.<br />
                  This is <strong>NOT</strong> a place for memecoin launches.<br />
                  This is <strong>NOT</strong> a place for low-effort games.
                </p>
              </div>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Why Avalanche */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">Why Avalanche</h2>
              <p className="text-lg text-black/90 leading-relaxed mb-4">
                C-Chain delivers fast blocks, fast finality, low gas, deep liquidity, and <strong>natively issued stablecoins</strong>. L1s let you customize everything—gas token, precompiles, consensus, etc. Everything is EVM compatible.
              </p>
              <p className="text-lg text-black/90 leading-relaxed">
                Avalanche tech is innovative and battletested. 
                <br />
                What's missing are <strong>apps that feel like magic</strong>.
              </p>
              <p className="text-sm text-black/60 mt-4">
                First time hearing about Avalanche? Go read:{' '}
                <a
                  href="https://avax.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline hover:text-[#E84142] transition-colors"
                >
                  avax.network
                </a>
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* How We Work */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">How We Work</h2>
              
              <div className="mb-8">
                <p className="text-xl text-black/90 leading-relaxed mb-2">
                  <strong>Time commitment:</strong>
                </p>
                <p className="text-base text-black/70 leading-relaxed">
                  ~5-10 hours/week. Two-week sprints. One weekly call, async reviews, ship your thing.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-lg font-semibold text-black mb-1">Workshops & Feedback Sessions</p>
                  <p className="text-base text-black/70">
                    Optional. Wednesdays 9:30am ET. Product reviews, technical feedback, and collaborative problem-solving.
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold text-black mb-1">Communication</p>
                  <p className="text-base text-black/70">
                    Telegram for building. X chat for sharing posts.
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold text-black mb-1">Two-week sprints</p>
                  <p className="text-base text-black/70">
                    Demo or it didn't happen. URLs and 60-second videos, not slides.
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold text-black mb-1">Reviews</p>
                  <p className="text-base text-black/70">
                    Optional. Available on request. Code/product reviews within 24 hours.
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold text-black mb-1">Owner + date on everything</p>
                  <p className="text-base text-black/70">
                    No group tasks. Small scopes, fast merges.
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold text-black mb-1">Ship Board</p>
                  <p className="text-base text-black/70">
                    Track who's shipping what, weekly.{' '}
                    <a
                      href="/ship-board"
                      className="text-black underline hover:text-[#E84142] transition-colors"
                    >
                      View Ship Board
                    </a>
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 border-l-4 border-[#E84142]">
                <p className="text-lg text-black font-semibold leading-relaxed mb-3">
                  We help each other, but no one holds your hand.
                </p>
                <p className="text-base text-black/70 leading-relaxed">
                  If you can't get yourself out of bed and ship something every week, no one will save you. We rely on each other for high-impact items—social connections, novel ideas, recommendations on SDKs and integrations. We amplify each other publicly.
                </p>
              </div>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Rules */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">Rules</h2>
              <p className="text-sm text-black/60 mb-6 italic">
                Membership is dynamic. Ship or leave. Re-apply anytime after shipping a new mainnet artifact.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-lg text-black mb-2">Removal triggers:</p>
                  <ul className="space-y-2 text-base text-black/90">
                    <li className="leading-relaxed">
                      Fail to ship within <strong>14 days</strong> of joining → <strong className="text-red-600">removed</strong> (extensions only for pre-approved blockers)
                    </li>
                    <li className="leading-relaxed">
                      Miss <strong>two demos</strong> without ≥12h notice → <strong className="text-red-600">removed</strong>
                    </li>
                    <li className="leading-relaxed">
                      Ghost <strong>7 days</strong> during an active sprint → <strong className="text-red-600">removed</strong> (posting weekly artifacts = not ghosted)
                    </li>
                    <li className="leading-relaxed">
                      Ignore a tagged blocker for <strong>24h</strong> → <strong className="text-red-600">removed from reviewer bench</strong> for the sprint
                    </li>
                    <li className="leading-relaxed">
                      Low quality ship / clear lack of effort → <strong className="text-red-600">removed</strong>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-lg text-black mb-2">Instant bans:</p>
                  <ul className="space-y-2 text-base text-black/90">
                    <li className="leading-relaxed">You talk shit about the community or the program instead of helping each other</li>
                    <li className="leading-relaxed">You only complain about factors outside of your control</li>
                    <li className="leading-relaxed">You make deceptive security claims about your own project</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-lg text-black mb-2">Pre-announce policy:</p>
                  <p className="text-base text-black/90 leading-relaxed">
                    No public claims of features, tokens, or partnerships before users can touch it. NDA partner updates are fine.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-lg text-black mb-2">Avalanche first:</p>
                  <p className="text-base text-black/90 leading-relaxed">
                    Launch on Avalanche first. Multi-chain later only if it helps users.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Who Applies */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">Who Applies</h2>
              <p className="text-lg text-black/90 leading-relaxed mb-4">
                <strong>Individuals only.</strong> Inside the community, members may form small groups ≤3 people.
              </p>
              <p className="text-lg text-black/90 leading-relaxed mb-4">
                We want: Engineers (contracts, frontend, bots, infra). Product/design/operators who turn "works for 10" into "works for 10,000."
              </p>
              <p className="text-lg text-black font-semibold leading-relaxed">
                Hard requirement: You've shipped code, deployed contracts, or run infra <strong>within 60 days</strong>. The application process requires proof of work and your GitHub handle.
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Application */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">Application</h2>
              <p className="text-lg text-black/90 leading-relaxed mb-4">
                Objective, &lt;5 minutes. We check:
              </p>
              <ul className="space-y-2 text-base text-black/90">
                <li className="leading-relaxed">Links to your last 2 ships (≤60 days): URL / repo / PR / contract / txn</li>
                <li className="leading-relaxed">GitHub + Avalanche address</li>
                <li className="leading-relaxed">Track (pick one)</li>
                <li className="leading-relaxed">Two-week goal (one measurable sentence)</li>
              </ul>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* No Payouts */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">No Payouts</h2>
              <p className="text-lg text-black/90 leading-relaxed mb-4">
                <strong>No grants. No tokens. No equity.</strong>
              </p>
              <p className="text-lg text-black/90 leading-relaxed mb-4">
                Your reward: accountability, feedback from experienced builders, and a forcing function to ship consistently.
              </p>
              <p className="text-lg text-black/90 leading-relaxed">
                <strong>External grants:</strong> Allowed outside the program. Disclose conflicts if they affect sprint priorities.
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">FAQ</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-lg text-black">Can I apply as a team?</p>
                  <p className="text-base text-black/80 mt-1">No. Individuals apply. You may form groups ≤3 inside the community.</p>
                </div>
                <div>
                  <p className="font-semibold text-lg text-black">Can I use testnet?</p>
                  <p className="text-base text-black/80 mt-1">Yes, every other week. Alternate between testnet and mainnet demos.</p>
                </div>
                <div>
                  <p className="font-semibold text-lg text-black">What if I miss a demo?</p>
                  <p className="text-base text-black/80 mt-1">Give ≥12h notice. Miss two without notice → removed. Miss three regardless of notice → removed.</p>
                </div>
                <div>
                  <p className="font-semibold text-lg text-black">Can I re-apply?</p>
                  <p className="text-base text-black/80 mt-1">Yes. Anytime after shipping a new mainnet artifact.</p>
                </div>
                <div>
                  <p className="font-semibold text-lg text-black">How will I know that I'm accepted?</p>
                  <p className="text-base text-black/80 mt-1">
                    <a 
                      href="https://x.com/freakingship"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:text-[#E84142] transition-colors"
                    >
                      @freakingship
                    </a>
                    {' '}on X will reach out to you with onboarding details.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-lg text-black">Can I build multi-chain?</p>
                  <p className="text-base text-black/80 mt-1">Launch on Avalanche first. Add other chains later if it helps users.</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Disclaimer */}
            <div>
              <p className="text-sm text-black/50 italic">
                Participation does not constitute investment advice, partnership, employment, or endorsement. You own what you ship.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-8 text-center">
              <p className="text-2xl font-bold text-black leading-relaxed">
                Ready to build?
              </p>
              <p className="text-2xl font-bold text-[#E84142] mt-2">
                Let's fucking ship.
              </p>
              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-block bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Apply Now
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-center gap-4">
                <Link
                  href="/ship-board"
                  className="text-sm text-black/50 hover:text-black underline transition-colors"
                >
                  Ship Board
                </Link>
                <span className="text-sm text-black/30">•</span>
                <Link
                  href="/disclaimer"
                  className="text-sm text-black/50 hover:text-black underline transition-colors"
                >
                  Full Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

