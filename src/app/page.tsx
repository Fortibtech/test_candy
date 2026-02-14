'use client'

import React, { useState } from 'react'
import { CharacterGallery, CharacterClient } from '@/components/character-gallery'

export default function Home() {
  const [characters, setCharacters] = useState<CharacterClient[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterClient | null>(null)

  const [name, setName] = useState('')
  const [prompt, setPrompt] = useState('')

  const [variationPrompt, setVariationPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  // Function to create a new character
  const handleCreateCharacter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !prompt) return

    setLoading(true)
    try {
      const res = await fetch('/api/character/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, prompt }),
      })

      const data = await res.json()
      if (data.success) {
        setCharacters([data.character, ...characters])
        setName('')
        setPrompt('')
      } else {
        alert(data.error || 'Failed to create character')
      }
    } catch (error) {
      console.error(error)
      alert('Error creating character')
    } finally {
      setLoading(false)
    }
  }

  // Function to generate a variation
  const handleGenerateVariation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCharacter || !variationPrompt) return

    setLoading(true)
    try {
      const res = await fetch('/api/character/variation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterId: selectedCharacter.id,
          modifier: variationPrompt
        }),
      })

      const data = await res.json()
      if (data.success) {
        // Update local state with new image
        const updatedCharacters = characters.map(char => {
          if (char.id === selectedCharacter.id) {
            const updated = {
              ...char,
              images: [data.image, ...char.images]
            }
            setSelectedCharacter(updated) // Keep selection updated
            return updated
          }
          return char
        })
        setCharacters(updatedCharacters)
        setVariationPrompt('')
      } else {
        alert(data.error || 'Failed to create variation')
      }
    } catch (error) {
      console.error(error)
      alert('Error generating variation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Candy AI Prototype
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left Column: Creator & Controls */}
          <div className="space-y-6">

            {/* Create Character Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">New Character</h2>
              <form onSubmit={handleCreateCharacter} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-200 outline-none text-black"
                    placeholder="e.g. Alice"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Concept Prompt</label>
                  <textarea
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-200 outline-none h-24 text-black"
                    placeholder="Describe the base character appearance..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
                  style={{ backgroundColor: '#ec4899' }}
                >
                  {loading ? 'Generating...' : 'Create Character'}
                </button>
              </form>
            </div>

            {/* Variation Form (Visible only if character selected) */}
            {selectedCharacter && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-violet-100 ring-1 ring-violet-50">
                <h2 className="text-xl font-semibold mb-4 text-violet-900">
                  Variation for {selectedCharacter.name}
                </h2>
                <form onSubmit={handleGenerateVariation} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Situation / Variation</label>
                    <textarea
                      value={variationPrompt}
                      onChange={e => setVariationPrompt(e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-violet-200 outline-none h-24 text-black"
                      placeholder="e.g. eating ice cream, wearing a hat..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
                    style={{ backgroundColor: '#7c3aed' }}
                  >
                    {loading ? 'Generating...' : 'Generate Variation'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Gallery */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <p className="text-gray-500 mb-4">
              Select a character to generate consistent variations.
            </p>

            <CharacterGallery
              characters={characters}
              onSelectCharacter={setSelectedCharacter}
              selectedCharacterId={selectedCharacter?.id}
            />
          </div>

        </div>
      </div>
    </main>
  )
}
