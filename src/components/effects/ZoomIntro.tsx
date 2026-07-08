'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

interface ZoomIntroProps {
    text?: string
    finalScale?: number
    scrollHeight?: number
    minLoadingTime?: number // Minimum time to show intro (ms)
    children: React.ReactNode
}

export default function ZoomIntro({
    text = 'AAKASH',
    finalScale = 20,
    scrollHeight = 2.5,
    minLoadingTime = 1500, // Show intro for at least 1.5 seconds
    children,
}: ZoomIntroProps) {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [isZoomComplete, setIsZoomComplete] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [isPageLoaded, setIsPageLoaded] = useState(false)
    const [canStartScroll, setCanStartScroll] = useState(false)
    const [loadingPercentage, setLoadingPercentage] = useState(0)
    const contentRef = useRef<HTMLDivElement>(null)
    const loadStartTime = useRef<number>(0)
    const { theme, resolvedTheme } = useTheme()
    const scrollHeightPx = typeof window !== 'undefined' ? window.innerHeight * scrollHeight : 2500

    useEffect(() => {
        setMounted(true)
        loadStartTime.current = Date.now()

        // Add a small delay for smooth appearance
        const timer = setTimeout(() => setIsReady(true), 50)
        return () => clearTimeout(timer)
    }, [])

    // Wait for page to fully load
    useEffect(() => {
        if (!mounted) return

        // Simulate progressive loading (faster)
        const progressInterval = setInterval(() => {
            setLoadingPercentage(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval)
                    return prev
                }
                return prev + Math.random() * 20
            })
        }, 60)

        const handleLoad = () => {
            clearInterval(progressInterval)

            // Complete the loading animation to 100% (faster)
            const completeLoading = setInterval(() => {
                setLoadingPercentage(prev => {
                    if (prev >= 100) {
                        clearInterval(completeLoading)
                        return 100
                    }
                    return prev + 8
                })
            }, 30)

            const loadTime = Date.now() - loadStartTime.current
            const remainingTime = Math.max(0, minLoadingTime - loadTime)

            // Wait for minimum loading time, then allow scroll (reduced delay)
            setTimeout(() => {
                setIsPageLoaded(true)
                setCanStartScroll(true)
            }, remainingTime + 150) // Reduced from 300ms to 150ms
        }

        // Check if already loaded
        if (document.readyState === 'complete') {
            handleLoad()
        } else {
            window.addEventListener('load', handleLoad)
            return () => {
                window.removeEventListener('load', handleLoad)
                clearInterval(progressInterval)
            }
        }

        return () => clearInterval(progressInterval)
    }, [mounted, minLoadingTime])

    useEffect(() => {
        // Don't allow scrolling until page is loaded
        if (!canStartScroll) return

        const handleScroll = () => {
            // Only process scroll if zoom is not yet complete
            if (isZoomComplete) return

            const scrollY = window.scrollY
            const maxScroll = scrollHeightPx

            const progress = Math.min(scrollY / maxScroll, 1)
            setScrollProgress(progress)

            // Mark zoom as complete at 90% - this only happens once (even faster completion)
            if (progress >= 0.90) {
                setIsZoomComplete(true)

                // Scroll to top of page (position 0) after zoom completes
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                }, 40)
            }
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [scrollHeightPx, isZoomComplete, canStartScroll])

    const scale = 1 + (finalScale - 1) * scrollProgress
    const opacity = 1 - scrollProgress * 1.5
    const rotate = scrollProgress * 8
    const letterSpacing = scrollProgress * 2

    const isDark = !mounted ? true : (resolvedTheme || theme) === 'dark'
    const bgColor = isDark ? 'bg-black' : 'bg-white'
    const textColor = isDark ? 'text-white' : 'text-black'
    const indicatorColor = isDark ? 'text-white/60' : 'text-black/60'

    // Show loading/preloader state
    if (!mounted || !isReady || !isPageLoaded) {
        const displayPercentage = Math.min(Math.round(loadingPercentage), 100)

        return (
            <div
                className={`fixed inset-0 z-[100] ${bgColor} transition-colors duration-300 flex items-center justify-center overflow-hidden`}
                suppressHydrationWarning
            >
                <div className="flex flex-col items-center gap-12">
                    <h1
                        className={`font-orbitron font-black ${textColor} whitespace-nowrap select-none`}
                        style={{
                            fontSize: 'clamp(3rem, 12vw, 10rem)',
                            opacity: isReady ? 1 : 0,
                            transition: 'opacity 0.5s ease-in',
                        }}
                    >
                        {text}
                    </h1>

                    {/* Loading section */}
                    {!isPageLoaded && (
                        <div className="flex flex-col items-center gap-4 w-80">
                            {/* Percentage */}
                            <div
                                className={`${textColor} font-orbitron text-2xl font-bold tabular-nums`}
                                style={{
                                    opacity: isReady ? 1 : 0,
                                    transition: 'opacity 0.3s ease-in 0.2s',
                                }}
                            >
                                {displayPercentage}%
                            </div>

                            {/* Slash Pattern Loading bar */}
                            <div
                                className="flex items-center justify-center gap-1 w-full"
                                style={{
                                    opacity: isReady ? 1 : 0,
                                    transition: 'opacity 0.3s ease-in 0.2s',
                                }}
                            >
                                {Array.from({ length: 30 }).map((_, i) => {
                                    const slashProgress = (i / 30) * 100
                                    const isActive = displayPercentage >= slashProgress

                                    return (
                                        <div
                                            key={i}
                                            className="transition-all duration-300"
                                            style={{
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold',
                                                color: isActive
                                                    ? (isDark ? '#ffffff' : '#000000')
                                                    : (isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'),
                                                opacity: isActive ? 1 : 0.3,
                                                transform: isActive ? 'scale(1)' : 'scale(0.9)',
                                            }}
                                        >
                                            /
                                        </div>
                                    )
                                })}
                            </div>                            {/* Loading text */}
                            <div
                                className={`${indicatorColor} text-xs font-medium uppercase tracking-wider text-center`}
                                style={{
                                    opacity: isReady ? 1 : 0,
                                    transition: 'opacity 0.3s ease-in 0.3s',
                                }}
                            >
                                Loading Experience
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <>
            {/* Hide overflow and prevent scrolling on body during zoom */}
            {!isZoomComplete && (
                <style dangerouslySetInnerHTML={{
                    __html: `
                        body {
                            overflow: ${!canStartScroll ? 'hidden' : 'auto'} !important;
                        }
                        header, footer {
                            display: none !important;
                        }
                    `
                }} />
            )}

            {/* Show navigation and footer after zoom completes with fade in */}
            {isZoomComplete && (
                <style dangerouslySetInnerHTML={{
                    __html: `
                        @media (min-width: 1024px) {
                            header:first-of-type {
                                display: block !important;
                                animation: fadeInNav 0.6s ease-in-out;
                            }
                        }
                        @media (max-width: 1023px) {
                            header:last-of-type {
                                display: block !important;
                                animation: fadeInNav 0.6s ease-in-out;
                            }
                        }
                        footer {
                            display: block !important;
                            animation: fadeInNav 0.6s ease-in-out;
                        }
                        @keyframes fadeInNav {
                            from { opacity: 0; transform: translateY(-10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `
                }} />
            )}

            {/* Zoom Intro Overlay - Only shows when not complete */}
            {!isZoomComplete && (
                <>
                    {/* Spacer for scroll depth */}
                    <div style={{ height: `${scrollHeightPx}px` }} />

                    {/* Fixed overlay */}
                    <div
                        className={`fixed inset-0 z-50 flex items-center justify-center ${bgColor} pointer-events-none transition-colors duration-300`}
                        style={{
                            opacity: opacity > 0 ? 1 : 0,
                            willChange: 'opacity',
                        }}
                        suppressHydrationWarning
                    >
                        <div
                            className="overflow-hidden"
                            style={{
                                transform: `scale(${scale}) rotate(${rotate}deg)`,
                                opacity: opacity,
                                transition: 'none',
                                willChange: 'transform, opacity',
                            }}
                        >
                            <h1
                                className={`font-orbitron font-black ${textColor} whitespace-nowrap select-none`}
                                style={{
                                    fontSize: 'clamp(4rem, 15vw, 12rem)',
                                    letterSpacing: `${letterSpacing}rem`,
                                    textShadow: isDark
                                        ? `0 0 ${20 * scrollProgress}px rgba(255, 255, 255, ${0.3 * scrollProgress})`
                                        : `0 0 ${20 * scrollProgress}px rgba(0, 0, 0, ${0.2 * scrollProgress})`,
                                    willChange: 'letter-spacing',
                                }}
                            >
                                {text}
                            </h1>
                        </div>

                        <div className="absolute inset-0 overflow-hidden">
                            <div
                                className={`absolute top-1/4 left-1/4 w-96 h-96 ${isDark ? 'bg-white/5' : 'bg-black/5'} rounded-full blur-3xl`}
                                style={{
                                    transform: `scale(${1 + scrollProgress * 2}) translate(-${scrollProgress * 100}px, ${scrollProgress * 100}px)`,
                                    opacity: 0.3 * (1 - scrollProgress),
                                    willChange: 'transform, opacity',
                                }}
                            />
                            <div
                                className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${isDark ? 'bg-white/5' : 'bg-black/5'} rounded-full blur-3xl`}
                                style={{
                                    transform: `scale(${1 + scrollProgress * 2}) translate(${scrollProgress * 100}px, -${scrollProgress * 100}px)`,
                                    opacity: 0.3 * (1 - scrollProgress),
                                    willChange: 'transform, opacity',
                                }}
                            />
                        </div>

                        {scrollProgress < 0.1 && canStartScroll && (
                            <div
                                className="absolute bottom-10 left-0 right-0 flex flex-col items-center justify-center gap-2 animate-bounce"
                                style={{
                                    opacity: 1 - scrollProgress * 10,
                                    willChange: 'opacity',
                                }}
                            >
                                <span className={`${indicatorColor} text-sm font-medium uppercase tracking-wider text-center`}>
                                    Scroll to Enter
                                </span>
                                <svg
                                    className={`w-6 h-6 ${indicatorColor}`}
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                </svg>
                            </div>
                        )}

                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: isDark
                                    ? `radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, ${scrollProgress * 0.5}) 100%)`
                                    : `radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, ${scrollProgress * 0.3}) 100%)`,
                            }}
                        />
                    </div>
                </>
            )}

            {/* Main Content */}
            <div ref={contentRef}>
                {children}
            </div>
        </>
    )
}
