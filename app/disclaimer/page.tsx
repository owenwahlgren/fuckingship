import Link from "next/link"

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="text-sm text-black/60 hover:text-black mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-4xl font-bold text-black mb-4 tracking-tight">Disclaimer</h1>
          <div className="h-1 w-24 bg-[#E84142]"></div>
        </div>

        {/* Content */}
        <div className="space-y-8 text-black/90">
          {/* Not affiliated */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-3">No official affiliation</h2>
            <p className="text-base leading-relaxed">
              <strong>fuckingship</strong> is an independent community of builders and is{" "}
              <strong>
                not affiliated with, endorsed by, or officially connected to Ava Labs, the Avalanche
                Foundation, or any official Avalanche entity
              </strong>
              .
            </p>
            <p className="text-base leading-relaxed mt-3">
              Any opinions, projects, or statements made by members represent their individual views
              and do not reflect the positions of Ava Labs or the Avalanche Foundation.
            </p>
          </div>

          {/* Individual responsibility */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-3">Individual responsibility</h2>
            <p className="text-base leading-relaxed">
              All members participate on their own terms and are solely responsible for their own
              actions, projects, and code. <strong>fuckingship</strong>, its organizers, and its
              members are not liable for:
            </p>
            <ul className="mt-3 space-y-2 text-base list-disc list-inside text-black/80">
              <li>Security vulnerabilities, bugs, or exploits in member projects</li>
              <li>Financial losses incurred by users of member applications</li>
              <li>Regulatory compliance or legal issues arising from member activities</li>
              <li>Misrepresentation or misconduct by individual members</li>
              <li>
                Any damages, direct or indirect, resulting from participation in this community
              </li>
            </ul>
          </div>

          {/* No guarantees */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-3">No guarantees</h2>
            <p className="text-base leading-relaxed">
              Membership provides no guarantee of success, funding, partnerships, employment, or any
              other outcome. There are no financial incentives, grants, or compensation for
              participation.
            </p>
            <p className="text-base leading-relaxed mt-3">
              Projects built by members are not vetted, audited, or endorsed by the community. Users
              interact with member projects at their own risk.
            </p>
          </div>

          {/* Use at own risk */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-3">Use at your own risk</h2>
            <p className="text-base leading-relaxed">
              Any code, contracts, infrastructure, or products shared or developed by members are
              provided "as is" without warranty of any kind. Always conduct your own research,
              audits, and due diligence.
            </p>
          </div>

          {/* Intellectual property */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-3">Intellectual property</h2>
            <p className="text-base leading-relaxed">
              Members retain full ownership of their work. The community does not claim any rights
              to member projects, code, or intellectual property.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-3">Changes to terms</h2>
            <p className="text-base leading-relaxed">
              These terms may be updated at any time. Continued participation constitutes acceptance
              of any changes.
            </p>
          </div>

          {/* Contact */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-black/60">Last updated: October 23, 2025</p>
          </div>
        </div>
      </div>
    </div>
  )
}
