"use client";

export default function LoadingState() {
  return (
    <div className="w-full space-y-3 mt-6 fade-up">
      <Skel h="h-32" extra="mb-1"/>
      {[1,2].map(i => (
        <div key={i} className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="shimmer h-5 w-40 rounded-sm mb-5"/>
          {[1,2,3].map(j => (
            <div key={j} className="flex gap-4 mb-4">
              <div className="shimmer w-8 h-8 rounded-sm flex-shrink-0"/>
              <div className="flex-1 space-y-2">
                <div className="shimmer h-4 w-48 rounded-sm"/>
                <div className="shimmer h-3 w-full rounded-sm"/>
                <div className="shimmer h-3 w-3/4 rounded-sm"/>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="grid grid-cols-2 gap-3">
        <Skel h="h-40"/><Skel h="h-40"/>
      </div>
    </div>
  );
}

function Skel({ h, extra = "" }: { h: string; extra?: string }) {
  return <div className={`shimmer rounded-sm border border-[var(--border)] ${h} ${extra}`}/>;
}
