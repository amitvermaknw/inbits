"use client";

// import { useState } from "react";
// import { Button } from "@/src/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
// import { Menu, X } from "lucide-react";
// import { DialogTitle } from "@/src/components/ui/dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "../ui/navItems";


export default function Header() {
    const pathname = usePathname();

    // const [open, setOpen] = useState(false);

    return (
        <header className="w-full bg-white dark:bg-gray-900 shadow-md">
            <div className="container mx-auto px-2 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">InBits</h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className="flex flex-col items-center">
                            {/* <div
                                className={`p-2 rounded-full transition-all ${pathname === item.href
                                    ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                                    : "text-neutral-700 dark:text-neutral-300"
                                    }`}
                            >
                                {item.icon}
                            </div> */}
                            <span className={`font-normal ${pathname === item.href ? "text-neutral-900 dark:text-neutral-100 font-medium" : "text-neutral-500 dark:text-neutral-400"}`}>
                                {item.label}
                            </span>
                        </Link>
                    ))}

                    {/* <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Home</Link>
                    <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">About</Link>
                    <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Contact</Link> */}
                </nav>

                {/* Mobile Menu Button */}
                {/* <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <DialogTitle className="sr-only">Mobile Menu</DialogTitle>
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold">Menu</h2>
                            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                                <X className="w-6 h-6" />
                            </Button>
                        </div>
                        <nav className="mt-6 flex flex-col space-y-4">
                            <Link href="/" className="text-gray-700 dark:text-gray-300" onClick={() => setOpen(false)}>Home</Link>
                            <Link href="/about" className="text-gray-700 dark:text-gray-300" onClick={() => setOpen(false)}>About</Link>
                            <Link href="/contact" className="text-gray-700 dark:text-gray-300" onClick={() => setOpen(false)}>Contact</Link>
                        </nav>
                    </SheetContent>
                </Sheet> */}
            </div>
        </header>
    );
}
