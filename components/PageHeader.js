import Link from "next/link";
import React from "react";

export default function PageHeader({ breadCrumbItems, header, description, children }) {
  return (
    <div className="flex flex-col items-start justify-start w-full gap-6 px-64 pt-12 pb-5">
      <div className="flex gap-3 pb-6">
        {breadCrumbItems.map((item, i, arr) => (
          <React.Fragment key={i}>
            <div className={arr.length - 1 === i ? "font-bold" : ""}>{item}</div>
            {/* if not last item */}
            {arr.length - 1 !== i && <span>/</span>}
          </React.Fragment>
        ))}
      </div>
      <h2 className="text-3xl font-semibold">{header}</h2>
      <p className="text-sm text-gray-500 md:text-base">{description}</p>
      {children}
    </div>
  );
}
