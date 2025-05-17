"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navItems } from "../ui/navItems";

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-300 dark:border-neutral-700 shadow-md md:hidden z-50">
            <div className="flex justify-around py-1">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="flex flex-col items-center">
                        <div
                            className={`p-2 rounded-full transition-all ${pathname === item.href
                                ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                                : "text-neutral-700 dark:text-neutral-300"
                                }`}
                        >
                            {item.icon}
                        </div>
                        <span className={`text-xs ${pathname === item.href ? "text-neutral-900 dark:text-neutral-100 font-medium" : "text-neutral-500 dark:text-neutral-400"}`}>
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
