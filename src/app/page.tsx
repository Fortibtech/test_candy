'use client'

import React, { useState } from 'react'
import { CharacterGallery, CharacterClient } from '@/components/character-gallery'
import { Sparkles, Zap, Plus, Video, Image as ImageIcon } from 'lucide-react'

export default function Home() {
  const [characters, setCharacters] = useState<CharacterClient[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterClient | null>(null)

  const [name, setName] = useState('')
  const [prompt, setPrompt] = useState('')

  const [variationPrompt, setVariationPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  // Mock Credit System
  const [credits, setCredits] = useState(150)

  // Function to create a new character
  const handleCreateCharacter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !prompt) return
    if (credits < 10) {
      alert("Not enough credits! (This is a demo)")
      return
    }

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
        setCredits(prev => prev - 10) // Deduct credits
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
    if (credits < 5) {
      alert("Not enough credits!")
      return
    }

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
        setCredits(prev => prev - 5)
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
    <main className="min-h-screen text-white selection:bg-pink-500 selection:text-white">
      {/* Header / Nav */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Candy AI <span className="text-xs font-normal text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">PREMIUM</span></span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <Zap size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-bold">{credits}</span>
              <span className="text-xs text-gray-400 uppercase font-medium">Credits</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 border border-white/20"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Controls (4 cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Create Character Panel */}
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
              {/* Decorative gradient blob */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl group-hover:bg-pink-500/30 transition-all duration-700"></div>

              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500">
                  <Plus size={20} />
                </div>
                <h2 className="text-lg font-semibold">New Character</h2>
              </div>

              <form onSubmit={handleCreateCharacter} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Character Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input outline-none transition-all placeholder:text-gray-600"
                    placeholder="e.g. Alice"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Concept Prompt</label>
                  <textarea
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input outline-none transition-all placeholder:text-gray-600 min-h-[120px] resize-none"
                    placeholder="Describe appearance, style, mood..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                    ${loading
                      ? 'bg-gray-700 cursor-not-allowed opacity-70'
                      : 'bg-gradient-to-r from-pink-600 to-violet-600 hover:shadow-lg hover:shadow-pink-500/25 hover:scale-[1.02] active:scale-[0.98]'}
                  `}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">Generating...</span>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Create (10 Credits)
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Variation Panel */}
            {selectedCharacter ? (
              <div className="glass-panel p-6 rounded-2xl border border-violet-500/30 relative overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl"></div>

                <div className="flex items-center gap-2 mb-6 relative z-10">
                  <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
                    <ImageIcon size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Variation</h2>
                    <p className="text-xs text-gray-400">Modify {selectedCharacter.name}</p>
                  </div>
                </div>

                <form onSubmit={handleGenerateVariation} className="space-y-4 relative z-10">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Scenario / Outfit</label>
                    <textarea
                      value={variationPrompt}
                      onChange={e => setVariationPrompt(e.target.value)}
                      className="w-full p-3 rounded-xl glass-input outline-none transition-all placeholder:text-gray-600 min-h-[100px] resize-none focus:border-violet-500/50"
                      placeholder="e.g. wearing a summer dress at the beach..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-violet-600/80 hover:bg-violet-600 text-white font-bold py-3 px-4 rounded-xl transition-all border border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/20"
                  >
                    Generate Variation (5 Credits)
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-white/5 rounded-2xl text-center text-gray-500">
                Select a character to verify consistency
              </div>
            )}
          </div>

          {/* Right Column: Gallery (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Gallery</h2>
            </div>

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
