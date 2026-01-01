'use client'

import { useEffect, useRef, useState } from 'react'

interface TargetCursorProps {
  targetSelector?: string
  hideDefaultCursor?: boolean
}

export function TargetCursor({ 
  targetSelector = 'a, button, [role="button"], [role="link"], [role="tab"], input[type="button"], input[type="submit"], input[type="reset"], .cursor-target, [onclick], [data-clickable], [data-state], [tabindex]:not([tabindex="-1"])',
  hideDefaultCursor = true 
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cornersRef = useRef<HTMLDivElement[]>([])
  const dotRef = useRef<HTMLDivElement>(null)
  const isActiveRef = useRef(false)
  const targetRectRef = useRef<DOMRect | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef<Element | null>(null)
  const animationFrameRef = useRef<number>()

  const isMobile = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 768)

  useEffect(() => {
    if (isMobile || !cursorRef.current) return

    const cursor = cursorRef.current
    const corners = cursor.querySelectorAll<HTMLDivElement>('.target-corner')
    cornersRef.current = Array.from(corners)

    if (hideDefaultCursor) {
      document.body.style.cursor = 'none'
    }

    const updateCursor = (x: number, y: number) => {
      mouseRef.current.x = x
      mouseRef.current.y = y
      
      if (cursor) {
        cursor.style.left = `${x}px`
        cursor.style.top = `${y}px`
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      updateCursor(e.clientX, e.clientY)
    }

    const handleMouseDown = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = 'translate(-50%, -50%) scale(0.7)'
      }
      if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.9)'
      }
    }

    const handleMouseUp = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
      }
      if (cursor) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)'
      }
    }

    const handleMouseEnter = (e: MouseEvent) => {
      let target = (e.target as Element).closest(targetSelector)
      
      // Also check for clickable cards (cards wrapped in links)
      if (!target) {
        const card = (e.target as Element).closest('[class*="Card"], [class*="card"]')
        if (card) {
          // Check if card is inside a link
          const parentLink = card.closest('a, [role="link"]')
          if (parentLink) {
            target = parentLink
          }
        }
      }
      
      // Check for any element inside a link
      if (!target) {
        const link = (e.target as Element).closest('a, [role="link"]')
        if (link) {
          target = link
        }
      }
      
      // Check for tabs and tab triggers
      if (!target) {
        const tab = (e.target as Element).closest('[role="tab"], [data-state]')
        if (tab && (tab.getAttribute('role') === 'tab' || tab.hasAttribute('data-state'))) {
          target = tab
        }
      }
      
      // Skip if target is not interactive or same as current
      if (!target || target === targetRef.current) return
      
      // Skip text nodes and non-interactive elements
      if (target.tagName === 'SPAN' || target.tagName === 'P' || target.tagName === 'DIV') {
        const hasInteractiveParent = target.closest('a, button, [role="button"], [role="link"]')
        if (hasInteractiveParent) {
          target = hasInteractiveParent
        } else {
          return
        }
      }

      if (targetRef.current) {
        isActiveRef.current = false
        targetRectRef.current = null
      }

      targetRef.current = target
      const rect = target.getBoundingClientRect()
      targetRectRef.current = rect
      isActiveRef.current = true
    }

    const handleMouseLeave = () => {
      isActiveRef.current = false
      targetRectRef.current = null
      targetRef.current = null
    }

    const handleScroll = () => {
      if (targetRef.current && isActiveRef.current) {
        const rect = targetRef.current.getBoundingClientRect()
        targetRectRef.current = rect
      }
    }

    // Animate corners with smooth interpolation
    let cornerPositions = cornersRef.current.map(() => ({ x: 0, y: 0 }))
    
    const animate = () => {
      if (!cursor) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      if (isActiveRef.current && targetRectRef.current) {
        const { x, y } = mouseRef.current
        const borderWidth = 3
        const cornerSize = 12
        const offset = borderWidth
        const rect = targetRectRef.current

        const targetPositions = [
          { x: rect.left - offset - x, y: rect.top - offset - y },
          { x: rect.right + offset - cornerSize - x, y: rect.top - offset - y },
          { x: rect.right + offset - cornerSize - x, y: rect.bottom + offset - cornerSize - y },
          { x: rect.left - offset - x, y: rect.bottom + offset - cornerSize - y },
        ]

        cornersRef.current.forEach((corner, i) => {
          if (corner) {
            // Smooth interpolation
            cornerPositions[i].x += (targetPositions[i].x - cornerPositions[i].x) * 0.15
            cornerPositions[i].y += (targetPositions[i].y - cornerPositions[i].y) * 0.15
            
            corner.style.transform = `translate(${cornerPositions[i].x}px, ${cornerPositions[i].y}px)`
            corner.style.opacity = '1'
          }
        })
      } else {
        // Reset corners smoothly
        cornersRef.current.forEach((corner, i) => {
          if (corner) {
            const cornerSize = 12
            const targetPositions = [
              { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
              { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
              { x: cornerSize * 0.5, y: cornerSize * 0.5 },
              { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
            ]
            
            cornerPositions[i].x += (targetPositions[i].x - cornerPositions[i].x) * 0.2
            cornerPositions[i].y += (targetPositions[i].y - cornerPositions[i].y) * 0.2
            
            corner.style.transform = `translate(${cornerPositions[i].x}px, ${cornerPositions[i].y}px)`
            
            if (Math.abs(cornerPositions[i].x - targetPositions[i].x) < 0.1 && 
                Math.abs(cornerPositions[i].y - targetPositions[i].y) < 0.1) {
              corner.style.opacity = '0'
            }
          }
        })
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Reset corners when not active
    const resetCorners = () => {
      if (!cursor) return
      const cornerSize = 12
      cornerPositions = [
        { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
        { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
        { x: cornerSize * 0.5, y: cornerSize * 0.5 },
        { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
      ]

      cornersRef.current.forEach((corner, i) => {
        if (corner) {
          corner.style.transform = `translate(${cornerPositions[i].x}px, ${cornerPositions[i].y}px)`
          corner.style.opacity = '0'
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mouseover', handleMouseEnter as EventListener)
    document.addEventListener('mouseout', handleMouseLeave)

    // Initial position
    updateCursor(window.innerWidth / 2, window.innerHeight / 2)

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseover', handleMouseEnter as EventListener)
      document.removeEventListener('mouseout', handleMouseLeave)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      if (hideDefaultCursor) {
        document.body.style.cursor = ''
      }
      
      resetCorners()
    }
  }, [targetSelector, hideDefaultCursor, isMobile])

  if (isMobile) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999]"
      style={{
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full"
        style={{
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.2s ease-out',
        }}
      />
      <div
        className="target-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-primary -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0 opacity-0"
        style={{
          transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
        }}
      />
      <div
        className="target-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-primary translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0 opacity-0"
        style={{
          transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
        }}
      />
      <div
        className="target-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-primary translate-x-1/2 translate-y-1/2 border-l-0 border-t-0 opacity-0"
        style={{
          transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
        }}
      />
      <div
        className="target-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-primary -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0 opacity-0"
        style={{
          transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
        }}
      />
    </div>
  )
}

