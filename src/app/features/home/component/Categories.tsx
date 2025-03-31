import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Newspaper, Shield, Clapperboard } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const categories = [
    {
        title: "Politics",
        description: "Latest political news and updates.",
        icon: <Newspaper className="w-6 h-6 text-blue-600" />,
        link: "#"
    },
    {
        title: "Sports",
        description: "Recent sports events and scores.",
        icon: <Shield className="w-6 h-6 text-green-600" />,
        link: "#"
    },
    {
        title: "Movies",
        description: "New movie releases and reviews.",
        icon: <Clapperboard className="w-6 h-6 text-red-600" />,
        link: "#"
    },
    {
        title: "Movies3",
        description: "New movie releases and reviews.",
        icon: <Clapperboard className="w-6 h-6 text-red-600" />,
        link: "#"
    },
];

export default function CategoryMenu() {
    return (
        <div className="flex justify-center items-center mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <Link
                        key={category.title}
                        href={category.link}
                        className="block"
                    >
                        <Card className="shadow-lg w-48 md:w-48 transition-transform duration-300 hover:scale-105">
                            {/* <CardHeader className="flex flex-row items-center space-x-3"> */}
                            {/* {category.icon} */}
                            {/* <CardTitle>{category.title}</CardTitle> */}
                            {/* <p className="text-gray-600 mb-4 text-sm">{category.description}</p> */}
                            {/* </CardHeader> */}
                            <CardContent>
                                <p className="text-gray-600 text-sm ml-4">{category.title}</p>
                                {/* <div className="flex justify-between space-x-2">
                                    <Button variant="outline">View</Button>
                                    <Button>Subscribe</Button>
                                </div> */}
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}