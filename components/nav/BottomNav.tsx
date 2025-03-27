"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Info, Phone } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
        { href: "/about", label: "About", icon: <Info className="w-5 h-5" /> },
        { href: "/contact", label: "Contact", icon: <Phone className="w-5 h-5" /> },
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-300 dark:border-neutral-700 shadow-md md:hidden">
            <div className="flex justify-around py-3">
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
