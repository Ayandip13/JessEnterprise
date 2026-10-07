import React from "react";

export function LoadingState({ message = "Loading equipment catalog..." }: { message?: string }) {
  return (
    <div className="py-16 text-center flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-700 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-600 text-sm font-medium">{message}</p>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-slate-200 p-5 animate-pulse">
          <div className="w-full h-44 bg-slate-100 rounded mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-slate-100 rounded w-full mb-2"></div>
          <div className="h-4 bg-slate-100 rounded w-2/3 mb-6"></div>
          <div className="h-9 bg-slate-200 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
}
