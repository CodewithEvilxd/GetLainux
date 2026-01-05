'use client'

import React, { useRef, useEffect, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { JSX } from 'react'

export interface ShuffleTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  shuffleDirection?: 'left' | 'right'
  duration?: number
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  textAlign?: React.CSSProperties['textAlign']
  shuffleTimes?: number
  animationMode?: 'random' | 'evenodd'
  loop?: boolean
  loopDelay?: number
  stagger?: number
  triggerOnHover?: boolean
  respectReducedMotion?: boolean
  ease?: string
}

const ShuffleText: React.FC<ShuffleTextProps> = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.65,
  tag = 'span',
  textAlign = 'center',
  shuffleTimes = 2,
  animationMode = 'evenodd',
  loop = false,
  loopDelay = 0,
  stagger = 0.05,
  triggerOnHover = true,
  respectReducedMotion = true,
  ease = 'back.out(1.1)'
}) => {
  const ref = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const wrappersRef = useRef<HTMLElement[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const playingRef = useRef(false)
  const hoverHandlerRef = useRef<((e: Event) => void) | null>(null)

  useEffect(() => {
    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') {
        setFontsLoaded(true)
      } else {
        document.fonts.ready.then(() => setFontsLoaded(true))
      }
    } else {
      setFontsLoaded(true)
    }
  }, [])

  const removeHover = () => {
    if (hoverHandlerRef.current && ref.current) {
      ref.current.removeEventListener('mouseenter', hoverHandlerRef.current)
      hoverHandlerRef.current = null
    }
  }

  const teardown = () => {
    if (tlRef.current) {
      tlRef.current.kill()
      tlRef.current = null
    }
    if (wrappersRef.current.length) {
      wrappersRef.current.forEach(wrap => {
        const inner = wrap.firstElementChild as HTMLElement | null
        const orig = inner?.querySelector('[data-orig="1"]') as HTMLElement | null
        if (orig && wrap.parentNode) {
          wrap.parentNode.replaceChild(orig, wrap)
        }
      })
      wrappersRef.current = []
    }
    playingRef.current = false
  }

  const build = () => {
    teardown()

    const el = ref.current
    if (!el || !text) return

    // Clear any existing content
    el.innerHTML = ''

    const computedFont = getComputedStyle(el).fontFamily
    const computedFontSize = getComputedStyle(el).fontSize
    const computedLineHeight = getComputedStyle(el).lineHeight
    const chars = text.split('')
    wrappersRef.current = []

    const rolls = Math.max(1, Math.floor(shuffleTimes))
    const rand = (set: string) => set.charAt(Math.floor(Math.random() * set.length)) || ''

    chars.forEach((char, charIndex) => {
      if (char === ' ') {
        const space = document.createTextNode('\u00A0')
        el.appendChild(space)
        return
      }

      // Measure actual width of the character
      const temp = document.createElement('span')
      temp.style.visibility = 'hidden'
      temp.style.position = 'absolute'
      temp.style.fontFamily = computedFont
      temp.style.fontSize = computedFontSize
      temp.style.fontWeight = getComputedStyle(el).fontWeight
      temp.style.letterSpacing = getComputedStyle(el).letterSpacing
      temp.textContent = char
      document.body.appendChild(temp)
      const w = Math.ceil(temp.getBoundingClientRect().width) || 8
      document.body.removeChild(temp)

      // Create wrapper with fixed width
      const wrap = document.createElement('span')
      wrap.className = 'inline-block overflow-hidden align-baseline text-left'
      wrap.style.width = w + 'px'
      wrap.style.height = computedLineHeight || '1em'
      wrap.style.display = 'inline-block'
      wrap.style.verticalAlign = 'baseline'
      wrap.style.minWidth = w + 'px'
      wrap.style.maxWidth = w + 'px'
      wrap.style.flexShrink = '0'

      // Create inner container for animation
      const inner = document.createElement('span')
      inner.className = 'inline-block whitespace-nowrap will-change-transform origin-left transform-gpu'
      inner.style.display = 'inline-block'
      inner.style.height = computedLineHeight || '1em'
      inner.style.lineHeight = computedLineHeight || '1em'
      inner.style.width = w + 'px'
      inner.style.minWidth = w + 'px'
      inner.style.maxWidth = w + 'px'

      el.appendChild(wrap)
      wrap.appendChild(inner)

      // Create original character span
      const charSpan = document.createElement('span')
      charSpan.textContent = char
      charSpan.setAttribute('data-orig', '1')
      charSpan.className = 'inline-block text-left'
      charSpan.style.width = w + 'px'
      charSpan.style.fontFamily = computedFont
      charSpan.style.fontSize = computedFontSize
      charSpan.style.fontWeight = getComputedStyle(el).fontWeight
      charSpan.style.display = 'inline-block'
      charSpan.style.height = computedLineHeight || '1em'
      charSpan.style.lineHeight = computedLineHeight || '1em'
      charSpan.style.minWidth = w + 'px'
      charSpan.style.maxWidth = w + 'px'

      // Create first original
      const firstOrig = charSpan.cloneNode(true) as HTMLElement
      firstOrig.className = 'inline-block text-left'
      firstOrig.style.width = w + 'px'
      firstOrig.style.minWidth = w + 'px'
      firstOrig.style.maxWidth = w + 'px'

      inner.appendChild(firstOrig)
      
      // Create shuffle characters
      for (let k = 0; k < rolls; k++) {
        const c = charSpan.cloneNode(true) as HTMLElement
        c.textContent = String.fromCharCode(33 + Math.floor(Math.random() * 94))
        c.className = 'inline-block text-left'
        c.style.width = w + 'px'
        c.style.minWidth = w + 'px'
        c.style.maxWidth = w + 'px'
        inner.appendChild(c)
      }
      inner.appendChild(charSpan)

      const steps = rolls + 1
      let startX = 0
      let finalX = -steps * w
      if (shuffleDirection === 'right') {
        const firstCopy = inner.firstElementChild as HTMLElement | null
        const real = inner.lastElementChild as HTMLElement | null
        if (real) inner.insertBefore(real, inner.firstChild)
        if (firstCopy) inner.appendChild(firstCopy)
        startX = -steps * w
        finalX = 0
      }

      gsap.set(inner, { x: startX, force3D: true })
      inner.setAttribute('data-final-x', String(finalX))
      inner.setAttribute('data-start-x', String(startX))

      wrappersRef.current.push(wrap)
    })
  }

  const inners = () => wrappersRef.current.map(w => w.firstElementChild as HTMLElement).filter(Boolean)

  const play = () => {
    const strips = inners()
    if (!strips.length) return

    playingRef.current = true

      const tl = gsap.timeline({
      smoothChildTiming: true,
      repeat: loop ? -1 : 0,
      repeatDelay: loop ? loopDelay : 0,
      onRepeat: () => {
        // Reset position for loop
        gsap.set(strips, { x: (i, t: HTMLElement) => parseFloat(t.getAttribute('data-start-x') || '0') })
      },
      onComplete: () => {
        playingRef.current = false
        if (!loop) {
          setReady(true)
        } else {
          // For loop, reset and play again
          gsap.set(strips, { x: (i, t: HTMLElement) => parseFloat(t.getAttribute('data-start-x') || '0') })
        }
      }
    })

    const addTween = (targets: HTMLElement[], at: number) => {
      tl.to(
        targets,
        {
          x: (i, t: HTMLElement) => parseFloat(t.getAttribute('data-final-x') || '0'),
          duration,
          ease,
          force3D: true,
          stagger: animationMode === 'evenodd' ? stagger : 0
        },
        at
      )
    }

    if (animationMode === 'evenodd') {
      const odd = strips.filter((_, i) => i % 2 === 1)
      const even = strips.filter((_, i) => i % 2 === 0)
      const oddTotal = duration + Math.max(0, odd.length - 1) * stagger
      const evenStart = odd.length ? oddTotal * 0.7 : 0
      if (odd.length) addTween(odd, 0)
      if (even.length) addTween(even, evenStart)
    } else {
      strips.forEach(strip => {
        const d = Math.random() * stagger
        tl.to(
          strip,
          {
            x: parseFloat(strip.getAttribute('data-final-x') || '0'),
            duration,
            ease,
            force3D: true
          },
          d
        )
      })
    }

    tlRef.current = tl
  }

  const armHover = () => {
    if (!triggerOnHover || !ref.current) return
    removeHover()
    const handler = () => {
      if (playingRef.current) return
      build()
      play()
    }
    hoverHandlerRef.current = handler
    ref.current.addEventListener('mouseenter', handler)
  }

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return
      if (respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setReady(true)
        return
      }

      const create = () => {
        build()
        play()
        armHover()
        setReady(true)
      }

      // Auto-trigger on mount
      const timer = setTimeout(create, 100)

      return () => {
        clearTimeout(timer)
        removeHover()
        teardown()
        setReady(false)
      }
    },
    {
      dependencies: [
        text,
        duration,
        ease,
        fontsLoaded,
        shuffleDirection,
        shuffleTimes,
        animationMode,
        loop,
        loopDelay,
        stagger,
        triggerOnHover,
        respectReducedMotion
      ],
      scope: ref
    }
  )

  const baseTw = 'inline-block whitespace-nowrap'
  const classes = `${baseTw} ${ready ? 'visible' : 'invisible'} ${className}`.trim()
  const Tag = (tag || 'span') as keyof JSX.IntrinsicElements

  return React.createElement(Tag, { 
    ref: ref as any, 
    className: classes, 
    style: { 
      textAlign, 
      display: 'inline-block',
      whiteSpace: 'nowrap',
      ...style 
    } 
  })
}

export default ShuffleText
