"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react"; // Using Lucide icon for chevrons

const BreadCrumbs = () => {
  const pathname = usePathname(); // Get current path
  const pathSegments = pathname.split("/").filter((seg) => seg); // Split and clean

  return (
    <nav className="text-sm my-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-gray-600">
        {/* Home Link */}
        <li className="flex items-center gap-2">
          <Link
            href="/"
            className="text-white hover:text-amber-300 transition-colors font-bold"
          >
            Home
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/"); // Build link
          const isLast = index === pathSegments.length - 1;
          const label = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()); // Format

          return (
            <li key={href} className="flex items-center gap-2">
              {/* Chevron */}
              <ChevronRight className="w-4 h-4 text-yellow-400" />

              {/* Breadcrumb Link or Current Page */}
              {isLast ? (
                <span className="font-semibold text-white">{label}</span>
              ) : (
                <Link
                  href={href}
                  className="text-white hover:text-amber-300 transition-colors font-bold"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
