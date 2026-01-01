'use client'

import { useRef, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

// Dynamic import for ogl to avoid SSR issues
let Renderer: any, Program: any, Triangle: any, Mesh: any

if (typeof window !== 'undefined') {
  import('ogl').then((ogl) => {
    Renderer = ogl.Renderer
    Program = ogl.Program
    Triangle = ogl.Triangle
    Mesh = ogl.Mesh
  })
}

export type RaysOrigin =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'right'
  | 'left'
  | 'bottom-center'
  | 'bottom-right'
  | 'bottom-left'

interface LightRaysProps {
  raysOrigin?: RaysOrigin
  raysColor?: string
  raysSpeed?: number
  lightSpread?: number
  rayLength?: number
  pulsating?: boolean
  fadeDistance?: number
  saturation?: number
  followMouse?: boolean
  mouseInfluence?: number
  noiseAmount?: number
  distortion?: number
  className?: string
}

const DEFAULT_COLOR = '#3b82f6'

// Color palette for cycling - vibrant RGB colors
const COLOR_PALETTE = [
  '#3b82f6', // Blue
  '#ef4444', // Red
  '#10b981', // Green
  '#f59e0b', // Orange
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#fbbf24', // Yellow
  '#6366f1', // Indigo
  '#14b8a6', // Teal
  '#f97316', // Orange Red
  '#a855f7'  // Violet
]

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [0.23, 0.51, 0.96]
}

// Interpolate between two RGB colors
const lerpRgb = (color1: [number, number, number], color2: [number, number, number], t: number): [number, number, number] => {
  return [
    color1[0] + (color2[0] - color1[0]) * t,
    color1[1] + (color2[1] - color1[1]) * t,
    color1[2] + (color2[2] - color1[2]) * t
  ]
}

const getAnchorAndDir = (
  origin: RaysOrigin,
  w: number,
  h: number
): { anchor: [number, number]; dir: [number, number] } => {
  const outside = 0.2
  switch (origin) {
    case 'top-left':
      return { anchor: [0, -outside * h], dir: [0, 1] }
    case 'top-right':
      return { anchor: [w, -outside * h], dir: [0, 1] }
    case 'left':
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] }
    case 'right':
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] }
    case 'bottom-left':
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] }
    case 'bottom-center':
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] }
    case 'bottom-right':
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] }
    default: // "top-center"
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] }
  }
}

type Vec2 = [number, number]
type Vec3 = [number, number, number]

interface Uniforms {
  iTime: { value: number }
  iResolution: { value: Vec2 }
  rayPos: { value: Vec2 }
  rayDir: { value: Vec2 }
  raysColor: { value: Vec3 }
  raysSpeed: { value: number }
  lightSpread: { value: number }
  rayLength: { value: number }
  pulsating: { value: number }
  fadeDistance: { value: number }
  saturation: { value: number }
  mousePos: { value: Vec2 }
  mouseInfluence: { value: number }
  noiseAmount: { value: number }
  distortion: { value: number }
}

const LightRays: React.FC<LightRaysProps> = ({
  raysOrigin = 'top-center',
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1.5,
  lightSpread = 0.9,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = ''
}) => {
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const uniformsRef = useRef<Uniforms | null>(null)
  const rendererRef = useRef<any>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 })
  const animationIdRef = useRef<number | null>(null)
  const meshRef = useRef<any>(null)
  const cleanupFunctionRef = useRef<(() => void) | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [oglLoaded, setOglLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const currentColorIndexRef = useRef(0)
  const transitionProgressRef = useRef(0)
  const colorStartTimeRef = useRef(Date.now())

  // Load ogl dynamically and set mounted
  useEffect(() => {
    if (typeof window === 'undefined') return
    setMounted(true)
    import('ogl').then((ogl) => {
      Renderer = ogl.Renderer
      Program = ogl.Program
      Triangle = ogl.Triangle
      Mesh = ogl.Mesh
      setOglLoaded(true)
    })
  }, [])

  // Color cycling effect - change color every 4 seconds
  useEffect(() => {
    if (theme !== 'dark' || !mounted) return

    const cycleDuration = 4000 // 4 seconds in milliseconds
    const transitionDuration = 1000 // 1 second smooth transition

    colorStartTimeRef.current = Date.now()

    const updateColor = () => {
      const elapsed = Date.now() - colorStartTimeRef.current
      const cycleTime = elapsed % cycleDuration
      
      // Calculate transition progress (0 to 1)
      const transitionTime = cycleTime % transitionDuration
      const progress = Math.min(transitionTime / transitionDuration, 1)
      
      transitionProgressRef.current = progress
      
      // Update color index when transition completes
      const cycleIndex = Math.floor(elapsed / cycleDuration)
      currentColorIndexRef.current = cycleIndex % COLOR_PALETTE.length

      requestAnimationFrame(updateColor)
    }

    const animationFrameId = requestAnimationFrame(updateColor)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [mounted, theme])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    // Set visible immediately for dark theme
    if (theme === 'dark') {
      setIsVisible(true)
    }

    observerRef.current = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [mounted, theme])

  useEffect(() => {
    if (!mounted || theme !== 'dark') return
    
    // Force visible for dark theme
    setIsVisible(true)
    
    if (!containerRef.current || !oglLoaded || !Renderer) return

    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current()
      cleanupFunctionRef.current = null
    }

    const initializeWebGL = async () => {
      if (!containerRef.current || !Renderer) return

      await new Promise(resolve => setTimeout(resolve, 10))

      if (!containerRef.current) return

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true
      })
      rendererRef.current = renderer

      const gl = renderer.gl
      gl.canvas.style.width = '100%'
      gl.canvas.style.height = '100%'
      gl.canvas.style.position = 'absolute'
      gl.canvas.style.top = '0'
      gl.canvas.style.left = '0'

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild)
      }
      containerRef.current.appendChild(gl.canvas)

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`

      const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor  = color;
}`

      const uniforms: Uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },
        raysColor: { value: hexToRgb(COLOR_PALETTE[0]) }, // Start with first color from palette
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1.0 : 0.0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion }
      }
      uniformsRef.current = uniforms

      const geometry = new Triangle(gl)
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms
      })
      const mesh = new Mesh(gl, { geometry, program })
      meshRef.current = mesh

      const updatePlacement = () => {
        if (!containerRef.current || !renderer) return

        renderer.dpr = Math.min(window.devicePixelRatio, 2)

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current
        renderer.setSize(wCSS, hCSS)

        const dpr = renderer.dpr
        const w = wCSS * dpr
        const h = hCSS * dpr

        uniforms.iResolution.value = [w, h]

        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h)
        uniforms.rayPos.value = anchor
        uniforms.rayDir.value = dir
      }

      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
          return
        }

        uniforms.iTime.value = t * 0.001

        // Update color based on transition progress using refs
        const currentIdx = currentColorIndexRef.current % COLOR_PALETTE.length
        const nextIdx = (currentIdx + 1) % COLOR_PALETTE.length
        const currentColor = hexToRgb(COLOR_PALETTE[currentIdx])
        const nextColor = hexToRgb(COLOR_PALETTE[nextIdx])
        const interpolatedColor = lerpRgb(currentColor, nextColor, transitionProgressRef.current)
        uniforms.raysColor.value = interpolatedColor

        if (followMouse && mouseInfluence > 0.0) {
          const smoothing = 0.92
          smoothMouseRef.current.x = smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing)
          smoothMouseRef.current.y = smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing)
          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y]
        }

        try {
          renderer.render({ scene: mesh })
          animationIdRef.current = requestAnimationFrame(loop)
        } catch (error) {
          console.warn('WebGL rendering error:', error)
          return
        }
      }

      window.addEventListener('resize', updatePlacement)
      updatePlacement()
      animationIdRef.current = requestAnimationFrame(loop)

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current)
          animationIdRef.current = null
        }
        window.removeEventListener('resize', updatePlacement)
        if (renderer) {
          try {
            const canvas = renderer.gl.canvas
            const loseContextExt = renderer.gl.getExtension('WEBGL_lose_context')
            if (loseContextExt) {
              loseContextExt.loseContext()
            }
            if (canvas && canvas.parentNode) {
              canvas.parentNode.removeChild(canvas)
            }
          } catch (error) {
            console.warn('Error during WebGL cleanup:', error)
          }
        }
        rendererRef.current = null
        uniformsRef.current = null
        meshRef.current = null
      }
    }

    initializeWebGL()

    return () => {
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current()
        cleanupFunctionRef.current = null
      }
    }
  }, [
    mounted,
    isVisible,
    oglLoaded,
    theme,
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion
  ])

  useEffect(() => {
    if (!uniformsRef.current || !containerRef.current || !rendererRef.current) return

    const u = uniformsRef.current
    const renderer = rendererRef.current

    // Note: raysColor is now handled in the animation loop for cycling
    u.raysSpeed.value = raysSpeed
    u.lightSpread.value = lightSpread
    u.rayLength.value = rayLength
    u.pulsating.value = pulsating ? 1.0 : 0.0
    u.fadeDistance.value = fadeDistance
    u.saturation.value = saturation
    u.mouseInfluence.value = mouseInfluence
    u.noiseAmount.value = noiseAmount
    u.distortion.value = distortion

    const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current
    const dpr = renderer.dpr
    const { anchor, dir } = getAnchorAndDir(raysOrigin, wCSS * dpr, hCSS * dpr)
    u.rayPos.value = anchor
    u.rayDir.value = dir
  }, [
    raysSpeed,
    lightSpread,
    raysOrigin,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    mouseInfluence,
    noiseAmount,
    distortion
  ])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !rendererRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouseRef.current = { x, y }
    }

    if (followMouse && theme === 'dark') {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [followMouse, theme])

  // Always render container for dark theme, even if not initialized yet
  if (!mounted) {
    return null
  }

  if (theme !== 'dark') {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden ${className}`.trim()}
      style={{ opacity: isVisible && oglLoaded ? 1 : 0 }}
    />
  )
}

export default LightRays

