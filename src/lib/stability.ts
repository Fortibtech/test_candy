export async function generateImage(prompt: string, seed: number) {
  const engineId = 'stable-diffusion-xl-1024-v1-0'
  const apiKey = process.env.STABILITY_API_KEY

  if (!apiKey) throw new Error('Missing STABILITY_API_KEY')

  const response = await fetch(
    `https://api.stability.ai/v1/generation/${engineId}/text-to-image`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
          },
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
        seed: seed, // Critical for consistency
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Stability AI Error: ${response.status} ${errorText}`)
  }

  const result = await response.json()
  return result.artifacts[0].base64
}
