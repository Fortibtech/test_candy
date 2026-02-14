import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateImage } from '@/lib/stability'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, prompt } = body

        if (!name || !prompt) {
            return NextResponse.json(
                { error: 'Name and prompt are required' },
                { status: 400 }
            )
        }

        // Generate a random seed

        const seed = Math.floor(Math.random() * 4294967295)

        // Call Stability AI
        const base64Image = await generateImage(prompt, seed)

        // Save to DB
        const character = await prisma.character.create({
            data: {
                name,
                fixed_prompt: prompt,
                seed: seed, // Store directly as BigInt (Prisma handles number -> BigInt if compatible, or valid JS number)
                // Wait, BigInt in JS needs 'n' suffix or BigInt() constructor if it's really big. 
                // Stability seed is uint32 (max 4294967295), which fits in standard JS number.
                // But Prisma BigInt expects BigInt type or similar.
                images: {
                    create: {
                        prompt_used: prompt,
                        base64: base64Image,
                    },
                },
            },
            include: {
                images: true,
            },
        })

        // Serialize BigInt for JSON response
        const serializedCharacter = {
            ...character,
            seed: character.seed.toString(),
            images: character.images.map(img => ({
                ...img,
            }))
        }

        return NextResponse.json({ success: true, character: serializedCharacter })
    } catch (error: any) {
        console.error('Error creating character:', error)
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        )
    }
}
