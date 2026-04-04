'use client'

import { useEffect } from 'react'
// @ts-expect-error AOS has no TypeScript types
import AOS from 'aos'
import 'aos/dist/aos.css'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useInitAnimations = () => {
  useEffect(() => {
    requestAnimationFrame(() => {
      // AOS Init
      AOS.init({
        mirror: true,
        once: false,
        delay: 0,
        duration: 1500,
        offset: 0,
      })

      // Lenis Init
      const lenis = new Lenis({
        autoRaf: false,
        duration: 2,
      })

      lenis.on('scroll', () => {
        AOS.refresh()
        ScrollTrigger.update()
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      // Animate Text
      const animatedTextEls = document.querySelectorAll('.animateText')
      animatedTextEls.forEach((el, idx) => {
        const text = el.textContent || ''
        const wordsWithSpace = Array.from(text.matchAll(/(\S+)(\s*)/g))

        el.innerHTML = ''

        wordsWithSpace.forEach(([, word, space]) => {
          const wordSpan = document.createElement('span')
          wordSpan.className = 'inline-block'

          for (const char of word) {
            const charSpan = document.createElement('span')
            charSpan.textContent = char
            charSpan.className = 'inline-block opacity-0 translate-y-3 scale-[1.4] !normal-case'
            wordSpan.appendChild(charSpan)
          }

          el.appendChild(wordSpan)

          if (space) {
            const spaceSpan = document.createElement('span')
            spaceSpan.textContent = space
            el.appendChild(spaceSpan)
          }
        })

        const spans = el.querySelectorAll('span > span')
        if (spans.length === 0) return

        gsap.to(spans, {
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            once: true,
          },
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.03,
          delay: 0.1 * idx,
        })
      })

      // Scroll-animate (scale and rotate)
      const scrollElements = document.querySelectorAll('.scroll-animate')
      if (scrollElements.length > 0) {
        const options = {
          startScale: 0.5,
          endScale: 1,
          startRotate: 90,
          endRotate: 0,
          animateUntil: 0.5,
        }

        scrollElements.forEach((el) => {
          const element = el as HTMLElement
          let isVisible = false

          const observer = new IntersectionObserver(
            ([entry]) => (isVisible = entry.isIntersecting),
            { threshold: 0.1 },
          )
          observer.observe(element)

          window.addEventListener('scroll', () => {
            if (!isVisible) return

            const rect = element.getBoundingClientRect()
            const vh = window.innerHeight

            const end = vh * options.animateUntil
            const progress = Math.min(Math.max((vh - rect.top) / (vh - end), 0), 1)

            const scale = options.startScale + (options.endScale - options.startScale) * progress
            const rotateX = options.startRotate + (options.endRotate - options.startRotate) * progress

            element.style.transform = `perspective(1200px) scale(${scale}) rotateX(${rotateX}deg)`
          })
        })
      }

      // Hover Tilt
      function handleMouseMove(e: MouseEvent) {
        const card = e.currentTarget as HTMLElement
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * 5
        const rotateY = ((x - centerX) / centerX) * -5

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          transformOrigin: 'center',
          duration: 1,
          ease: 'power2.out',
        })
      }

      function handleMouseLeave(e: MouseEvent) {
        const card = e.currentTarget as HTMLElement
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 1,
          ease: 'power2.out',
        })
      }

      document.querySelectorAll('.d2c_team_card, .d2c_blog_card, .d2c_service_card').forEach((card) => {
        card.addEventListener('mousemove', handleMouseMove as EventListener)
        card.addEventListener('mouseleave', handleMouseLeave as EventListener)
      })
    })
  }, [])
}
