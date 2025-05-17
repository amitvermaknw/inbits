import { Home, Trophy, Clapperboard, LayoutListIcon, CpuIcon } from "lucide-react";

export const navItems = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/politics", label: "Politics", icon: <LayoutListIcon className="w-4 h-4" /> },
    { href: "/sports", label: "Sports", icon: <Trophy className="w-4 h-4" /> },
    { href: "/entertainment", label: "Entertainment", icon: <Clapperboard className="w-4 h-4" /> },
    { href: "/technology", label: "Technology", icon: <CpuIcon className="w-4 h-4" /> },
];