import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ship Board - f🔻ckingship',
  description: 'Track who\'s shipping what, weekly.',
  alternates: {
    canonical: 'https://fuckingship.org/ship-board',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Ship Board - f🔻ckingship',
    description: 'Track who\'s shipping what, weekly.',
    url: 'https://fuckingship.org/ship-board',
    type: 'website',
    images: [
      {
        url: 'https://fuckingship.org/ship-board/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Ship Board - f🔻ckingship',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ship Board - f🔻ckingship',
    description: 'Track who\'s shipping what, weekly.',
    creator: '@freakingship',
    images: ['https://fuckingship.org/ship-board/opengraph-image'],
  },
}

export default function ShipBoard() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="text-sm text-black/60 hover:text-black mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-6xl font-bold text-black mb-4 tracking-tight">Ship Board</h1>
          <div className="h-1 w-24 bg-[#E84142]"></div>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Intro */}
          <div>
            <p className="text-2xl text-black leading-relaxed mb-6">
              Track who's shipping what, weekly.
            </p>
            <p className="text-lg text-black/70 leading-relaxed">
              Public accountability. Every member posts their ship every two weeks with proof: URL, demo, contract address, or merged PR.
            </p>
          </div>

          <div className="h-px bg-gray-200"></div>

          {/* Mockup */}
          <div>
            <div className="mb-6">
              <p className="text-sm font-semibold text-black/60 uppercase tracking-wide mb-2">Preview</p>
              <h2 className="text-2xl font-bold text-black">What it looks like</h2>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-black">Sprint #2 — Week ending Oct 25, 2025</p>
                  <p className="text-sm text-black/60">23/25 builders shipped</p>
                </div>
              </div>

              {/* Example Ships */}
              <div className="divide-y divide-gray-200">
                {/* Ship 1 */}
                <div className="px-6 py-5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-black mb-1">
                        <a 
                          href="https://x.com/chrisfusillo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#E84142] transition-colors"
                        >
                          @chrisfusillo
                        </a>
                      </p>
                      <p className="text-sm text-black/60">Track: Chase degen/viral narratives • Streak: 🔥 5</p>
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">SHIPPED</span>
                  </div>
                  <p className="text-base text-black mb-3">
                    Spin the wheel for bitcoin airdrops on custom BTC L1. Viral mechanic driving user acquisition.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <a 
                      href="https://x.com/SatlyBTC/status/1931354214682239182"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:text-[#E84142] transition-colors"
                    >
                      Demo on X
                    </a>
                    <span className="text-black/40">→</span>
                    <span className="text-black/60">Next: Add leaderboard + referrals</span>
                  </div>
                </div>

                {/* Ship 2 */}
                <div className="px-6 py-5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-black mb-1">
                        <a 
                          href="https://x.com/owenwahlgren"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#E84142] transition-colors"
                        >
                          @owenwahlgren
                        </a>
                      </p>
                      <p className="text-sm text-black/60">Track: Novel app with Avalanche tech • Streak: 🔥 6</p>
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">SHIPPED</span>
                  </div>
                  <p className="text-base text-black mb-3">
                    Genesis Wizard for Subnet-EVM L1s. Shipped visual config tool for deploying custom L1s in &lt;5 minutes.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <a 
                      href="https://x.com/owenwahlgren/status/1978165647621210608" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:text-[#E84142] transition-colors"
                    >
                      Demo on X
                    </a>
                    <span className="text-black/40">→</span>
                    <span className="text-black/60">Next: Add precompile config wizard</span>
                  </div>
                </div>

                {/* Ship 3 */}
                <div className="px-6 py-5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-black mb-1">
                        <a 
                          href="https://x.com/harry_avax"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#E84142] transition-colors"
                        >
                          @harry_avax
                        </a>
                      </p>
                      <p className="text-sm text-black/60">Track: Chase degen/viral narratives • Streak: 🔥 3</p>
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">SHIPPED</span>
                  </div>
                  <p className="text-base text-black mb-3">
                    Pharaoh V3 auto-compounding pools on yieldyak. Live on mainnet with automated yield optimization.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <a 
                      href="https://x.com/yieldyak_/status/1981394842912493653"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:text-[#E84142] transition-colors"
                    >
                      Demo on X
                    </a>
                    <span className="text-black/40">→</span>
                    <span className="text-black/60">Next: Add more pool strategies</span>
                  </div>
                </div>

                {/* Ship 4 */}
                <div className="px-6 py-5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-black mb-1">
                        <a 
                          href="https://x.com/0xMoonbags"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#E84142] transition-colors"
                        >
                          @0xMoonbags
                        </a>
                      </p>
                      <p className="text-sm text-black/60">Track: Novel app with Avalanche tech • Streak: 🔥 4</p>
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">SHIPPED</span>
                  </div>
                  <p className="text-base text-black mb-3">
                    Added text-only posts and rich text formatting to $JUICY. Shipped new post types + editor UI.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <a 
                      href="https://x.com/0xMoonbags/status/1979608468802965888"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:text-[#E84142] transition-colors"
                    >
                      Demo on X
                    </a>
                    <span className="text-black/40">→</span>
                    <span className="text-black/60">Next: Add markdown support</span>
                  </div>
                </div>

                {/* Removed */}
                <div className="px-6 py-5 bg-red-50/30">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-black mb-1">
                        <a 
                          href="https://x.com/JustnThePhotog"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-red-700 transition-colors"
                        >
                          @JustnThePhotog
                        </a>
                      </p>
                      <p className="text-sm text-black/60">Track: Port from other chains • Streak: —</p>
                    </div>
                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">REMOVED</span>
                  </div>
                  <p className="text-sm text-red-600 mb-2">
                    Nonstop complaining about factors outside of his own control.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <a 
                      href="https://x.com/JustnThePhotog/status/1981125362332696983"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/50 underline hover:text-black/70 transition-colors"
                    >
                      See context
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
                <p className="text-xs text-black/50 text-center">
                  This is a mockup. Actual Ship Board coming soon.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200"></div>

          {/* What to expect */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">What to expect</h2>
            <div className="space-y-6">
              <div>
                <p className="text-lg font-semibold text-black mb-2">Weekly updates</p>
                <p className="text-base text-black/70 leading-relaxed">
                  Every builder posts their progress: what shipped, what's next, blockers.
                </p>
              </div>
              
              <div>
                <p className="text-lg font-semibold text-black mb-2">Public demos</p>
                <p className="text-base text-black/70 leading-relaxed">
                  Live URLs, ≤60-second videos, contract addresses, transaction hashes. No slides, no vapor.
                </p>
              </div>

              <div>
                <p className="text-lg font-semibold text-black mb-2">Sprint streaks</p>
                <p className="text-base text-black/70 leading-relaxed">
                  Track consecutive ships. Miss two demos without notice → removed from the program.
                </p>
              </div>

              <div>
                <p className="text-lg font-semibold text-black mb-2">Metrics that matter</p>
                <p className="text-base text-black/70 leading-relaxed">
                  Signups, transaction count, retention, revenue flow. Whatever proves users care.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200"></div>

          {/* CTA */}
          <div className="text-center py-8">
            <p className="text-lg text-black/70 mb-6">
              Want to be on the Ship Board?
            </p>
            <Link 
              href="/"
              className="inline-block bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Apply to f🔻ckingship
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

