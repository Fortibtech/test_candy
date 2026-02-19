'use client'

import { Image } from '@prisma/client'
import { useState } from 'react'
import { Play, Loader2, Video as VideoIcon } from 'lucide-react'

// Define the type for Character used on the client side
// The 'seed' comes from the DB as BigInt, but is serialized to string for JSON API
export type CharacterClient = {
    id: string
    name: string
    fixed_prompt: string
    seed: string
    createdAt: Date // or string if purely from JSON
    updatedAt: Date
    images: Image[]
}

interface CharacterGalleryProps {
    characters: CharacterClient[]
    onSelectCharacter: (character: CharacterClient) => void
    selectedCharacterId?: string
}

export function CharacterGallery({
    characters,
    onSelectCharacter,
    selectedCharacterId,
}: CharacterGalleryProps) {

    // State to track loading videos by image ID
    const [videoLoading, setVideoLoading] = useState<Record<string, boolean>>({})
    // State to store generated videos by image ID
    const [videos, setVideos] = useState<Record<string, string>>({})

    const handleGenerateVideo = async (e: React.MouseEvent, image: Image, seed: string) => {
        e.stopPropagation() // Prevent selecting character when clicking animate

        if (videoLoading[image.id] || videos[image.id]) return

        setVideoLoading(prev => ({ ...prev, [image.id]: true }))

        try {
            // 1. Start Generation
            const startRes = await fetch('/api/character/video', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    imageBase64: image.base64,
                    seed: seed
                })
            })
            const startData = await startRes.json()

            if (!startData.success) {
                throw new Error(startData.error)
            }

            const generationId = startData.generationId
            console.log("Video started, ID:", generationId)

            // 2. Poll for result
            const pollInterval = setInterval(async () => {
                try {
                    const pollRes = await fetch(`/api/character/video/${generationId}`)
                    const pollData = await pollRes.json()
                    console.log("Polling video status:", pollData)

                    if (pollData.success && pollData.status === 'complete') {
                        clearInterval(pollInterval)
                        console.log("Video complete, setting URL:", pollData.videoBase64)
                        setVideos(prev => ({ ...prev, [image.id]: pollData.videoBase64 }))
                        setVideoLoading(prev => ({ ...prev, [image.id]: false }))
                    } else if (!pollData.success) {
                        // Error or timeout logic could go here
                        console.error("Polling error:", pollData.error)
                        clearInterval(pollInterval)
                        setVideoLoading(prev => ({ ...prev, [image.id]: false }))
                        alert("Video generation failed during polling.")
                    }
                    // If in-progress, just wait for next tick
                } catch (e) {
                    console.error("Polling fetch error:", e)
                    clearInterval(pollInterval)
                }
            }, 2000)

        } catch (err) {
            console.error(err)
            alert("Failed to start video generation")
            setVideoLoading(prev => ({ ...prev, [image.id]: false }))
        }
    }

    if (characters.length === 0) {
        return (
            <div className="p-12 border border-white/10 rounded-2xl bg-white/5 text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">👻</span>
                </div>
                <p className="text-white font-medium text-lg">No characters yet</p>
                <p className="text-gray-400">Create your first AI muse on the left to get started.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((char) => (
                <div
                    key={char.id}
                    onClick={() => onSelectCharacter(char)}
                    className={`
            group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
            ${selectedCharacterId === char.id
                            ? 'ring-2 ring-pink-500 shadow-xl shadow-pink-500/20 scale-[1.02]'
                            : 'hover:scale-[1.02] hover:ring-2 hover:ring-white/20 border border-white/10'}
          `}
                >
                    {/* Main Display Image (First in list) */}
                    <div className="aspect-[3/4] relative bg-black">
                        {char.images.length > 0 ? (
                            // Use the video if available, else the image
                            videos[char.images[0].id] ? (
                                <video
                                    src={videos[char.images[0].id].startsWith('http')
                                        ? videos[char.images[0].id]
                                        : `data:video/mp4;base64,${videos[char.images[0].id]}`}
                                    poster={char.images[0].base64.startsWith('http')
                                        ? char.images[0].base64
                                        : `data:image/png;base64,${char.images[0].base64}`}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    controls
                                    className="w-full h-full object-cover z-40 relative"
                                />
                            ) : (
                                <img
                                    src={char.images[0].base64.startsWith('http')
                                        ? char.images[0].base64
                                        : `data:image/png;base64,${char.images[0].base64}`}
                                    alt={char.images[0].prompt_used}
                                    className="w-full h-full object-cover"
                                />
                            )
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-600">
                                No Image
                            </div>
                        )}

                        {/* Overlay Gradient - allow clicks to pass through to video controls */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 pointer-events-none z-20"></div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none z-30">
                            <h3 className="text-xl font-bold text-white mb-1">{char.name}</h3>
                            <p className="text-xs text-gray-400 font-mono mb-3 truncate opacity-80">{char.images[0]?.prompt_used}</p>

                            <div className="flex gap-2">
                                {/* Animate Button needs to be clickable */}
                                {char.images.length > 0 && !videos[char.images[0].id] && (
                                    <button
                                        onClick={(e) => handleGenerateVideo(e, char.images[0], char.seed)}
                                        disabled={videoLoading[char.images[0].id]}
                                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-2 border border-white/10 transition-colors pointer-events-auto"
                                    >
                                        {videoLoading[char.images[0].id] ? (
                                            <Loader2 size={12} className="animate-spin" />
                                        ) : (
                                            <VideoIcon size={12} />
                                        )}
                                        {videoLoading[char.images[0].id] ? 'Generating...' : 'Animate'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Seed Badge */}
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-white/50 border border-white/5">
                        SEED: {char.seed.toString().slice(0, 4)}...
                    </div>
                </div>
            ))}
        </div>
    )
}
