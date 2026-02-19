import { NextResponse } from 'next/server'
import { pollVideoResult } from '@/lib/stability'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // params is a Promise in Next.js 15+
) {
    try {
        const { id } = await params

        if (!id) {
            return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 })
        }

        const result = await pollVideoResult(id)

        if (result.status === 'in-progress') {
            return NextResponse.json({ success: true, status: 'in-progress' }, { status: 202 })
        }

        if (result.status === 'complete') {
            return NextResponse.json({
                success: true,
                status: 'complete',
                videoBase64: result.videoBase64
            })
        }

        return NextResponse.json({ success: false, error: 'Unknown status' }, { status: 500 })

    } catch (error: any) {
        console.error('Video polling error:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to poll video' },
            { status: 500 }
        )
    }
}
