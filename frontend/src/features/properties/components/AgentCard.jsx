
import { useState } from "react";
import {
  Mail,
  Phone,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";

export default function AgentCard({
  agent,
  onBook,
  onViewProfile,
}) {
  const [showContact, setShowContact] = useState(false);

  // Don't render if agent information is unavailable
  if (!agent) {
    return null;
  }

  // Generate agent initials for the avatar fallback
  const initials = (agent.name ?? "Agent")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const stats = agent.stats ?? [];

  return (
    <section
      aria-label="Property agent"
      className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
    >
      {/* Card heading */}
      <h2 className="text-base font-semibold text-slate-900">
        Property Agent
      </h2>

      {/* Agent information */}
      <div className="mt-4 flex min-w-0 flex-col gap-4">
        <div className="flex min-w-0 items-start gap-3">
          {/* Agent avatar */}
          {agent.avatar ? (
            <img
              src={agent.avatar}
              alt={`${agent.name ?? "Agent"}'s profile`}
              className="size-12 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-violet-100 font-semibold text-violet-700">
              {initials || <UserRound size={20} />}
            </div>
          )}

          {/* Agent details */}
          <div className="min-w-0 flex-1">
            <p className="break-words font-semibold text-slate-900">
              {agent.name ?? "Property Agent"}
            </p>

            {agent.title && (
              <p className="mt-1 text-sm text-slate-500">
                {agent.title}
              </p>
            )}

            {agent.rating != null && (
              <p className="mt-2 flex flex-wrap items-center gap-1 text-sm text-slate-500">
                <Star
                  size={15}
                  className="fill-amber-400 text-amber-400"
                />

                <span className="font-medium text-slate-900">
                  {agent.rating}
                </span>

                <span>
                  ({agent.reviewCount ?? 0} reviews)
                </span>
              </p>
            )}

            {agent.base && (
              <p className="mt-1 text-sm text-slate-500">
                {agent.base}
              </p>
            )}
          </div>
        </div>

        {/* Agent statistics */}
        {stats.length > 0 && (
          <div className="grid grid-cols-3 gap-2 border-y border-slate-100 py-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-w-0 flex-col items-center text-center"
              >
                <span className="grid size-8 place-items-center rounded-full bg-violet-50 text-violet-700">
                  <ShieldCheck size={17} />
                </span>

                <span className="mt-1 text-base font-bold text-slate-900">
                  {stat.value}
                </span>

                <span className="text-xs text-slate-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Agent actions */}
      <div className="mt-5 grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={() => setShowContact((current) => !current)}
          aria-expanded={showContact}
          className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          {showContact ? "Hide Contact" : "Contact Agent"}
        </button>

        <button
          type="button"
          onClick={onViewProfile}
          className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          View Profile
        </button>

        <button
          type="button"
          onClick={onBook}
          className="rounded-lg bg-violet-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          Book a Visit
        </button>
      </div>

      {/* Contact information */}
      {showContact && (
        <div className="mt-4 space-y-3 rounded-lg bg-violet-50 p-3 text-sm">
          {agent.phone && (
            <a
              href={`tel:${agent.phone}`}
              className="flex min-w-0 items-center gap-2 break-all text-slate-700 hover:text-violet-700"
            >
              <Phone size={17} className="shrink-0" />
              {agent.phone}
            </a>
          )}

          {agent.email && (
            <a
              href={`mailto:${agent.email}`}
              className="flex min-w-0 items-center gap-2 break-all text-slate-700 hover:text-violet-700"
            >
              <Mail size={17} className="shrink-0" />
              {agent.email}
            </a>
          )}

          {!agent.phone && !agent.email && (
            <p className="text-slate-600">
              Contact information is not available.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
