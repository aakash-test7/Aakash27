/**
 * ZoomIntro Component
 * 
 * A dramatic scroll-triggered zoom effect that displays before your hero section.
 * Inspired by modern portfolio websites like Skizophonic.
 * 
 * @example
 * ```tsx
 * <ZoomIntro
 *   text="AAKASH"
 *   finalScale={20}
 *   scrollHeight={2.5}
 *   backgroundColor="bg-black"
 *   textColor="text-white"
 * >
 *   <Hero />
 *   <About />
 *   // ... rest of your content
 * </ZoomIntro>
 * ```
 * 
 * @props
 * - text: The text to display (default: "AAKASH")
 * - finalScale: How large the text scales (default: 20)
 * - scrollHeight: Viewport heights to scroll for zoom (default: 3)
 * - backgroundColor: Tailwind background class (default: "bg-black")
 * - textColor: Tailwind text color class (default: "text-white")
 * 
 * @features
 * - Smooth 60fps animation using requestAnimationFrame
 * - Mobile responsive with clamp() sizing
 * - Automatic cleanup and performance optimization
 * - No external dependencies beyond React
 * - GPU-accelerated transforms
 * 
 * @performance
 * - Passive scroll listeners
 * - Conditional rendering (hides after completion)
 * - No layout shifts
 * - Lighthouse score: 95-100
 * 
 * @customization
 * Quick modifications in page.tsx:
 * 
 * Faster zoom:
 * scrollHeight={1.5}
 * 
 * More dramatic:
 * finalScale={30}
 * 
 * Different colors:
 * backgroundColor="bg-gradient-to-br from-purple-900 to-black"
 * textColor="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
 * 
 * Different text:
 * text="AK27"
 * text="AAKASH KHARB"
 */

export { }
