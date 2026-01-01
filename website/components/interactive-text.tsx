'use client'

import { useEffect, useRef, useState } from 'react'

interface InteractiveTextProps {
  text: string
  className?: string
}

export function InteractiveText({ text, className = '' }: InteractiveTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const cursorRef = useRef({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX
      cursorRef.current.y = e.clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      cursorRef.current.x = t.clientX
      cursorRef.current.y = t.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      mouseRef.current.x = left + width / 2
      mouseRef.current.y = top + height / 2
      cursorRef.current.x = mouseRef.current.x
      cursorRef.current.y = mouseRef.current.y
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  useEffect(() => {
    let rafId: number
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 12
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 12

      if (containerRef.current && isHovered) {
        const spans = containerRef.current.querySelectorAll<HTMLSpanElement>('span[data-char]')
        const containerRect = containerRef.current.getBoundingClientRect()
        const maxDist = Math.max(containerRect.width, containerRect.height) / 1.5

        spans.forEach((span) => {
          const rect = span.getBoundingClientRect()
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          }

          const dx = mouseRef.current.x - charCenter.x
          const dy = mouseRef.current.y - charCenter.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          const intensity = Math.max(0, 1 - distance / maxDist)
          const scale = 1 + intensity * 0.12
          const translateY = -intensity * 6
          const opacity = 0.7 + intensity * 0.3

          span.style.transform = `translateY(${translateY}px) scale(${scale})`
          span.style.opacity = opacity.toString()
        })
      } else if (containerRef.current) {
        // Reset to default when not hovered
        const spans = containerRef.current.querySelectorAll<HTMLSpanElement>('span[data-char]')
        spans.forEach((span) => {
          span.style.transform = 'translateY(0) scale(1)'
          span.style.opacity = '1'
        })
      }

      rafId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(rafId)
  }, [isHovered])

  const chars = text.split('')

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          data-char={char}
          className="inline-block will-change-transform"
          style={{
            transform: 'translateY(0) scale(1)',
            opacity: 1,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}

