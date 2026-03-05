import { useCallback, useRef } from 'react'

/**
 * Synthesises a soft paper-flip sound using the Web Audio API.
 * No external audio files required.
 */

function createAudioContext() {
    const Ctx = window.AudioContext || window.webkitAudioContext
    return Ctx ? new Ctx() : null
}

export function usePageSound() {
    const ctxRef = useRef(null)

    const playFlip = useCallback(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        try {
            if (!ctxRef.current) {
                ctxRef.current = createAudioContext()
            }
            const ctx = ctxRef.current
            if (!ctx) return
            if (ctx.state === 'suspended') ctx.resume()

            const now = ctx.currentTime
            const duration = 0.2

            // Noise buffer for paper rustle
            const bufLen = Math.floor(ctx.sampleRate * duration)
            const buffer = ctx.createBuffer(1, bufLen, ctx.sampleRate)
            const data = buffer.getChannelData(0)
            for (let i = 0; i < bufLen; i++) {
                data[i] = (Math.random() * 2 - 1) * 0.5
            }

            const src = ctx.createBufferSource()
            src.buffer = buffer

            // Band-pass filter shaped like paper
            const filter = ctx.createBiquadFilter()
            filter.type = 'bandpass'
            filter.frequency.value = 2400
            filter.Q.value = 0.6

            // Envelope: snap attack → fast decay
            const gain = ctx.createGain()
            gain.gain.setValueAtTime(0, now)
            gain.gain.linearRampToValueAtTime(0.28, now + 0.016)
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

            src.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)
            src.start(now)
            src.stop(now + duration)
        } catch {
            // Audio not available – fail silently
        }
    }, [])

    return { playFlip }
}
