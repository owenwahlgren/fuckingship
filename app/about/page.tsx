import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="text-sm text-black/60 hover:text-black mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-6xl font-bold text-black mb-4 tracking-tight">fuckingship</h1>
          <div className="h-1 w-24 bg-[#E84142]"></div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="space-y-12">
            {/* Intro */}
            <div>
              <p className="text-xl text-black leading-relaxed">
                We're a private, no-BS cell of Avalanche builders who <strong>ship</strong> weekly, publicly, on mainnet—C-Chain or your own L1.
              </p>
              <p className="text-xl text-black leading-relaxed mt-6 font-semibold">
                No "founders." No stealth. No decks. No LARPers. No grant beggars.
              </p>
              <p className="text-lg text-black/80 leading-relaxed mt-6">
                If you haven't shipped code, deployed contracts, or run infra in the last <strong>60 days</strong>, this isn't for you.
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* What we are */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">What we are</h2>
              <p className="text-lg text-black/90 leading-relaxed mb-4">
                <strong>fuckingship</strong> is an invite-only sprint program (20-35 active builders) for turning ideas into live products fast. We chase narratives, port what works from other chains, and launch original experiments—then iterate in production.
              </p>
              <p className="text-lg text-black/90 leading-relaxed">
                We bias toward <strong>viral, user-facing apps</strong> on C-Chain or custom L1s, and the minimal shared rails (auth, gas sponsorship, referrals, payments) that help them grow.
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* What we build */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">What we build</h2>
              <p className="text-lg text-black/90 leading-relaxed">
                Short cycles. Real users. Clear loops.
              </p>
              <p className="text-lg text-black/90 leading-relaxed mt-4">
                We build on C-Chain or custom Avalanche L1s, prioritize gasless UX and native USDC flows, and package primitives into products that feel inevitable. Shared rails are open to all projects in the group to speed up shipping.
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* How we work */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">How we work</h2>
              <p className="text-lg text-black/90 leading-relaxed mb-6">
                <strong>Time commitment:</strong> ~5-10 hours/week during sprints (2-week cycles). One 60-minute weekly call, async code reviews, and shipping your thing. If you can't commit to that, don't apply.
              </p>
              <ul className="space-y-3 text-lg text-black/90">
                <li className="leading-relaxed">
                  <strong>Two-week sprints:</strong> Demo or it didn't happen. URLs and 60-second videos, not slides.
                </li>
                <li className="leading-relaxed">
                  <strong>Weekly call (60 min):</strong> Wins → blockers → decisions → new bets.
                </li>
                <li className="leading-relaxed">
                  <strong>Owner + date on everything:</strong> No group tasks. Small scopes, fast merges.
                </li>
                <li className="leading-relaxed">
                  <strong>Reviewer bench:</strong> Code/product reviews within 24 hours.
                </li>
                <li className="leading-relaxed">
                  <strong>Open build, practical IP:</strong> You own what you ship. Open source encouraged; no vapor, no pre-announces.
                </li>
              </ul>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Rules */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">Rules</h2>
              <p className="text-sm text-black/60 mb-6 italic">
                Membership is dynamic. Ship or leave. You can re-apply anytime after shipping something new on mainnet.
              </p>
              <ul className="space-y-3 text-lg text-black/90">
                <li className="leading-relaxed">
                  <strong>Fail to ship</strong> something user-visible within 14 days of joining → <strong className="text-red-600">removed</strong>
                </li>
                <li className="leading-relaxed">
                  <strong>Miss two sprint demos</strong> without notice → <strong className="text-red-600">removed</strong>
                </li>
                <li className="leading-relaxed">
                  <strong>Go ghost</strong> (inactive in chat for 7 days during an active sprint) → <strong className="text-red-600">removed</strong>
                </li>
                <li className="leading-relaxed">
                  <strong>Ignore a tagged blocker</strong> for 24+ hours → <strong className="text-red-600">removed from reviewer bench</strong>
                </li>
                <li className="leading-relaxed">
                  <strong>Pre-announce</strong> features, tokens, or partnerships before shipping to users → <strong className="text-red-600">removed</strong>
                </li>
                <li className="leading-relaxed">
                  <strong>Spam grants/decks/token talk</strong> → <strong className="text-red-600">removed</strong>
                </li>
              </ul>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Why Avalanche */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">Why Avalanche (now)</h2>
              <p className="text-lg text-black/90 leading-relaxed">
                C-Chain has the rails for great UX—fast blocks and finality, low gas, mature EVM tooling, native USDC. L1s let you customize everything. What's missing are <strong>products that feel like magic</strong>. We focus on distribution, speed, and ruthless simplification to close that gap.
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

            {/* Who should apply */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">Who should apply</h2>
              <ul className="space-y-3 text-lg text-black/90">
                <li className="leading-relaxed">
                  Engineers who ship: contracts, frontend, bots, infra, data, growth
                </li>
                <li className="leading-relaxed">
                  Product/design/operators who turn "this works for 10" into "this works for 10,000"
                </li>
              </ul>
              <p className="text-lg text-black font-semibold mt-6 leading-relaxed">
                Hard requirement: You've shipped code, deployed contracts, or run infra <strong>within 60 days</strong>. Share <strong>proof of work</strong> and your <strong>GitHub handle</strong>.
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* No payouts */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">No payouts</h2>
              <p className="text-lg text-black/90 leading-relaxed mb-4">
                <strong>No grants. No tokens. No equity. No incentives.</strong>
              </p>
              <p className="text-lg text-black/90 leading-relaxed mb-4">
                Your reward is accountability, real feedback from experienced builders, and a forcing function to ship consistently.
              </p>
              <p className="text-lg text-black/90 leading-relaxed">
                <strong>Plan accordingly.</strong> Your application should make you money, generate revenue, or position you for opportunities. If you're waiting for a grant or banking on community goodwill to pay your bills, this isn't the place.
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* What this is not */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">What this is not</h2>
              <ul className="space-y-2 text-lg text-black/70">
                <li>Not a grant queue.</li>
                <li>Not a founder cosplay venue.</li>
                <li>Not stealth theater.</li>
                <li>Not another group chat you mute and forget.</li>
                <li>Not a safety net for projects that can't monetize.</li>
              </ul>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* How to get in */}
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">How to get in</h2>
              <ol className="space-y-4 text-lg text-black/90 list-decimal list-inside">
                <li className="leading-relaxed">
                  <strong>Apply</strong> with proof of something you shipped in the last 60 days
                </li>
                <li className="leading-relaxed">
                  If accepted, you get an invite and a short starter brief
                </li>
                <li className="leading-relaxed">
                  Join the sprint, pick a track, and <strong>ship within 14 days</strong>
                </li>
              </ol>
            </div>

            {/* CTA */}
            <div className="pt-8 text-center">
              <p className="text-2xl font-bold text-black leading-relaxed">
                If you're ready to build, we're ready to move.
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
              <div className="mt-8 pt-8 border-t border-gray-200">
                <Link 
                  href="/disclaimer"
                  className="text-sm text-black/50 hover:text-black underline transition-colors"
                >
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

