import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load env
dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function main() {
    console.log("Testing Video API with multiple endpoints...")

    // A small 64x64 red square PNG (valid)
    const base64 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAR0lEQVRo3u3PQREAAAgDILV/55nCX4qAOpKdu9ra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2toLxF0A81l7iZMAAAAASUVORK5CYII="

    const endpoints = [
        "https://api.stability.ai/v2beta/image-to-video",
        "https://api.stability.ai/v2alpha/generation/image-to-video"
    ]

    for (const url of endpoints) {
        try {
            console.log(`\n----------------------------------------`)
            console.log(`Trying URL: ${url}`)
            const formData = new FormData()
            const buf = Buffer.from(base64, 'base64')
            const blob = new Blob([buf], { type: 'image/png' })

            // Critical: Filename
            formData.append('image', blob, 'image.png')
            formData.append('seed', '0')
            formData.append('cfg_scale', '1.8')
            formData.append('motion_bucket_id', '127')

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`
                },
                body: formData
            })

            console.log(`Status: ${res.status} ${res.statusText}`)
            const text = await res.text()
            console.log(`Body Response: ${text.slice(0, 500)}`) // Show first 500 chars

            if (res.ok) {
                console.log(">>> SUCCESS on this endpoint! Use this one.")
                const json = JSON.parse(text)
                console.log("Generation ID:", json.id)
                break // Stop on first success
            }
        } catch (e) {
            console.error("Fetch Error:", e)
        }
    }
}

main()
