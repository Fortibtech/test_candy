"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number; // in ms
    duration?: number; // in ms
}

export default function Reveal({ children, className, delay = 0, duration = 700 }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect(); // Animate only once
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    // Convert delay to class if standard values, otherwise inline style
    // Tailwind's delay-{amount} might not cover everything, but we can use inline style for precision

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all ease-out transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                className
            )}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`
            }}
        >
            {children}
        </div>
    );
}
