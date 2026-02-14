import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateImage } from '@/lib/stability'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { characterId, modifier } = body

        if (!characterId || !modifier) {
            return NextResponse.json(
                { error: 'Character ID and modifier prompt are required' },
                { status: 400 }
            )
        }

        const character = await prisma.character.findUnique({
            where: { id: characterId },
        })

        if (!character) {
            return NextResponse.json(
                { error: 'Character not found' },
                { status: 404 }
            )
        }

        // Combine prompts for consistency
        // Strategy: "[fixed_prompt], [modifier]"
        const fullPrompt = `${character.fixed_prompt}, ${modifier}`

        // Reuse the seed!
        // character.seed is BigInt. Convert to Number for API if safe, API expects number. 
        // Max safe integer is 9e15, seed max is 4e9, so Number(seed) is safe.
        const seed = Number(character.seed)

        const base64Image = await generateImage(fullPrompt, seed)

        const image = await prisma.image.create({
            data: {
                characterId: character.id,
                prompt_used: fullPrompt,
                base64: base64Image,
            },
        })

        return NextResponse.json({ success: true, image })
    } catch (error: any) {
        console.error('Error creating variation:', error)
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        )
    }
}
