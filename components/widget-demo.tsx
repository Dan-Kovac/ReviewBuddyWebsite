"use client";

import { useRef, useState } from "react";
import { ExampleFrame, GoogleChip, WireBar, WireCard } from "@/components/example";

const tabs = [
  { id: "list", label: "List" },
  { id: "slider", label: "Slider" },
  { id: "badge", label: "Badge" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function ListLayout() {
  return (
    <div className="grid gap-3">
      {[0, 1].map((index) => (
        <WireCard key={index}>
          <div className="flex items-center gap-3">
            <span className="size-9 shrink-0 rounded-full bg-[#e6e8eb]" aria-hidden="true" />
            <WireBar className="h-3 w-28" />
            <span className="ml-auto">
              <GoogleChip />
            </span>
          </div>
          <div className="mt-3 grid gap-2">
            <WireBar className="h-3 w-full" />
            <WireBar className="h-3 w-4/5" />
          </div>
        </WireCard>
      ))}
    </div>
  );
}

function SliderLayout() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[0, 1].map((index) => (
        <WireCard key={index}>
          <div className="flex items-center justify-between">
            <GoogleChip />
            <span className="inline-flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }, (_, star) => (
                <svg key={star} viewBox="0 0 20 20" className="size-3 fill-[#e0a106]">
                  <path d="M10 1.8l2.1 4.5 4.9.7-3.5 3.4.8 4.9L10 13.1 5.7 15.3l.8-4.9L3 7l4.9-.7L10 1.8z" />
                </svg>
              ))}
            </span>
          </div>
          <div className="mt-3 grid gap-2">
            <WireBar className="h-3 w-full" />
            <WireBar className="h-3 w-3/5" />
          </div>
        </WireCard>
      ))}
    </div>
  );
}

function BadgeLayout() {
  return (
    <div className="mx-auto max-w-xs">
      <WireCard className="text-center">
        <div className="mx-auto flex w-fit items-center gap-2">
          <GoogleChip />
          <span className="inline-flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }, (_, star) => (
              <svg key={star} viewBox="0 0 20 20" className="size-3.5 fill-[#e0a106]">
                <path d="M10 1.8l2.1 4.5 4.9.7-3.5 3.4.8 4.9L10 13.1 5.7 15.3l.8-4.9L3 7l4.9-.7L10 1.8z" />
              </svg>
            ))}
          </span>
        </div>
        <WireBar className="mx-auto mt-3 h-3 w-2/3" />
        <WireBar className="mx-auto mt-2 h-3 w-1/2" />
      </WireCard>
    </div>
  );
}

export function WidgetDemo() {
  const [tab, setTab] = useState<TabId>("list");
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    list: null,
    slider: null,
    badge: null,
  });

  function onKeyDown(event: React.KeyboardEvent, current: TabId) {
    const order: TabId[] = ["list", "slider", "badge"];
    const next =
      event.key === "ArrowRight"
        ? order[(order.indexOf(current) + 1) % order.length]
        : event.key === "ArrowLeft"
          ? order[(order.indexOf(current) - 1 + order.length) % order.length]
          : null;
    if (next) {
      event.preventDefault();
      setTab(next);
      tabRefs.current[next]?.focus();
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Widget layouts"
        className="mb-6 flex justify-center gap-2"
      >
        {tabs.map((item) => (
          <button
            key={item.id}
            ref={(node) => {
              tabRefs.current[item.id] = node;
            }}
            role="tab"
            id={`widget-tab-${item.id}`}
            aria-selected={tab === item.id}
            aria-controls="widget-panel"
            tabIndex={tab === item.id ? 0 : -1}
            onClick={() => setTab(item.id)}
            onKeyDown={(event) => onKeyDown(event, item.id)}
            className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors ${
              tab === item.id
                ? "bg-brand text-ink"
                : "bg-ink-2 text-white hover:bg-white/10"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="widget-panel"
        aria-labelledby={`widget-tab-${tab}`}
        className="widget-crossfade"
      >
        <ExampleFrame url="example.com" dark>
          <div className="bg-white p-5 sm:p-8">
            {tab === "list" ? <ListLayout /> : null}
            {tab === "slider" ? <SliderLayout /> : null}
            {tab === "badge" ? <BadgeLayout /> : null}
            <div
              className="slide-in-once mt-4 flex items-center gap-2 rounded-full border border-line bg-brand-tint px-3 py-2"
              role="status"
            >
              <span className="pulse-dot size-2 rounded-full bg-brand" aria-hidden="true" />
              <span className="text-sm font-semibold text-ink">
                New review just came in
              </span>
            </div>
          </div>
        </ExampleFrame>
      </div>
    </div>
  );
}
