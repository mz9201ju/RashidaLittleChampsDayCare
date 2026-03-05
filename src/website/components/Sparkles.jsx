import { useEffect, useRef } from 'react'

const COUNT = 28

function rand(min, max) {
    return min + Math.random() * (max - min)
}

class Sparkle {
    constructor(w, h) {
        this.w = w
        this.h = h
        this.reset(true)
    }

    reset(scatter = false) {
        this.x = rand(0, this.w)
        this.y = scatter ? rand(0, this.h) : this.h + rand(0, 20)
        this.size = rand(1.8, 4.2)
        this.maxOpacity = rand(0.55, 0.95)
        this.opacity = this.maxOpacity
        this.vy = rand(0.18, 0.5)
        this.vx = rand(-0.18, 0.18)
        this.life = 1
        this.decay = rand(0.003, 0.007)
    }

    update() {
        this.y -= this.vy
        this.x += this.vx
        this.life -= this.decay
        this.opacity = Math.max(0, this.life * this.maxOpacity)
        if (this.life <= 0 || this.y < -8) this.reset()
    }

    draw(ctx) {
        const s = this.size
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = '#fff7ae'
        ctx.shadowColor = '#ffd45c'
        ctx.shadowBlur = s * 3
        ctx.beginPath()
        // 4-pointed star
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4
            const r = i % 2 === 0 ? s : s * 0.38
            ctx.lineTo(this.x + Math.cos(angle) * r, this.y + Math.sin(angle) * r)
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()
    }
}

export default function Sparkles() {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        let animId
        let sparkles = []
        let cssWidth = 0
        let cssHeight = 0

        const resize = () => {
            cssWidth = canvas.offsetWidth || window.innerWidth
            cssHeight = canvas.offsetHeight || window.innerHeight
            const dpr = window.devicePixelRatio || 1

            canvas.width = cssWidth * dpr
            canvas.height = cssHeight * dpr

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            sparkles = Array.from(
                { length: COUNT },
                () => new Sparkle(cssWidth, cssHeight)
            )
        }

        const animate = () => {
            ctx.clearRect(0, 0, cssWidth, cssHeight)
            sparkles.forEach((s) => {
                s.update()
                s.draw(ctx)
            })
            animId = requestAnimationFrame(animate)
        }

        resize()
        animate()

        window.addEventListener('resize', resize)
        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return <canvas ref={canvasRef} className="sparkles-canvas" aria-hidden="true" />
}
