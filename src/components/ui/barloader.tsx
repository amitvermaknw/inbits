import { useEffect, useState } from 'react';

export default function BarLoader({ loading }: { loading: boolean }) {
    const [width, setWidth] = useState(0);
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (loading) {
            setVisible(true);
            setWidth(10);

            interval = setInterval(() => {
                setWidth(prev => {
                    if (prev >= 90) return prev;
                    return prev + Math.random() * 5;
                });
            }, 150);
        } else {
            setWidth(100);
            setTimeout(() => {
                setVisible(false);
                setWidth(0)
            }, 300);
        }

        return () => clearInterval(interval);
    }, [loading]);

    if (!visible) return null;

    return (
        <div className="fixed left-0 w-full h-1 bg-gray-200 z-50 bottom-14">
            <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${width}%` }}
            />
        </div>
    );
}
