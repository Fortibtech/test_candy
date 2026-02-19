import { NextResponse } from 'next/server'
import { generateVideo } from '@/lib/stability'

export async function POST(request: Request) {
    try {
        const { imageBase64, seed } = await request.json()

        if (!imageBase64 || !seed) {
            return NextResponse.json(
                { success: false, error: 'Image and seed are required' },
                { status: 400 }
            )
        }

        // Start video generation
        // Note: seed is optional for video but good for consistency if supported
        console.log("Starting video generation for seed:", seed)
        const generationId = await generateVideo(imageBase64, Number(seed))
        console.log("Video generation started:", generationId)

        return NextResponse.json({
            success: true,
            generationId,
        })
    } catch (error: any) {
        console.error('Video generation error (Detailed):', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to start video generation' },
            { status: 500 }
        )
    }
}
