import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects2 from '@/components/sections/Projects2'
import Contact from '@/components/sections/Contact'
import ZoomIntro from '@/components/effects/ZoomIntro'

export default function Home() {
  return (
    <ZoomIntro
      text="AAKASH"
      finalScale={15}
      scrollHeight={0.9}
      minLoadingTime={800}
    >
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects2 />
      <Contact />
    </ZoomIntro>
  )
}
