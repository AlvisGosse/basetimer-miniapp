"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/status", label: "Status" },
  { href: "/my", label: "My" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={`nav-link${isActive ? " nav-link-active" : ""}`}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
