'use client'

import React from 'react'
import type { Character, Image } from '@prisma/client'

// Frontend type where BigInt fields are strings (serialization)
export type CharacterClient = Omit<Character, 'seed'> & {
    seed: string
    images: Image[]
}

interface CharacterGalleryProps {
    characters: CharacterClient[]
    onSelectCharacter: (char: CharacterClient) => void
    selectedCharacterId?: string
}

export function CharacterGallery({ characters, onSelectCharacter, selectedCharacterId }: CharacterGalleryProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {characters.map((char) => (
                <div
                    key={char.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedCharacterId === char.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => onSelectCharacter(char)}
                >
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg">{char.name}</h3>
                        <span className="text-xs text-gray-500">Seed: {char.seed}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 truncate" title={char.fixed_prompt}>{char.fixed_prompt}</p>

                    <div className="grid grid-cols-2 gap-2">
                        {char.images.map((img) => (
                            <div key={img.id} className="relative aspect-square bg-gray-100 rounded overflow-hidden group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`data:image/png;base64,${img.base64}`}
                                    alt={img.prompt_used}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-black/50 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity overflow-auto">
                                    {img.prompt_used}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {characters.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-10">
                    No characters created yet. Create one to get started!
                </div>
            )}
        </div>
    )
}
