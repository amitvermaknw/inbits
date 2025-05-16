
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const ShareButton = ({ title, url }: { title: string; url: string }) => {
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = async () => {
        if (isSharing) return;

        setIsSharing(true);
        try {
            if (navigator.share) {
                await navigator.share({
                    title,
                    url,
                });
            } else {
                await navigator.clipboard.writeText(url);
                alert("Link copied to clipboard!");
            }
        } catch (err) {
            if (err instanceof Error)
                console.error("Share failed:");
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <Button onClick={handleShare} disabled={isSharing} className="text-black border border-black bg-white hover:bg-gray-100 px-2 py-1 h-auto text-sm">
            <Share2 className="w-2 h-2 me-1" />
            Share
        </Button>
    );
};

export default ShareButton;