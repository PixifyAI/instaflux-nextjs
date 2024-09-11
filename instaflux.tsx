'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function RunwareApp() {
  const [apiKey, setApiKey] = useState('')
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [width, setWidth] = useState(512)
  const [height, setHeight] = useState(512)
  const [inferenceSteps, setInferenceSteps] = useState(20)
  const [guidanceScale, setGuidanceScale] = useState(7.5)
  const [seed, setSeed] = useState(-1)
  const [batchSize, setBatchSize] = useState(1)
  const [numberResults, setNumberResults] = useState(1)
  const [scheduler, setScheduler] = useState('dpmsolver++')
  const [useLCM, setUseLCM] = useState(false)
  const [useXL, setUseXL] = useState(false)
  const [useRefiner, setUseRefiner] = useState(false)
  const [useControlNet, setUseControlNet] = useState(false)
  const [model, setModel] = useState('runware:101@1')
  const [outputType, setOutputType] = useState('URL')
  const [outputFormat, setOutputFormat] = useState('PNG')
  const [generatedImage, setGeneratedImage] = useState(null)

  const handleGenerate = async () => {
    try {
      const response = await fetch('https://api.runware.ai/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt,
          negative_prompt: negativePrompt,
          width,
          height,
          num_inference_steps: inferenceSteps,
          guidance_scale: guidanceScale,
          seed,
          num_images: numberResults,
          batch_size: batchSize,
          scheduler,
          use_lcm: useLCM,
          use_xl: useXL,
          use_refiner: useRefiner,
          use_controlnet: useControlNet,
          model,
          number_results: numberResults,
          output_type: outputType,
          output_format: outputFormat
        })
      })
      const data = await response.json()
      console.log(data)
      
      // Assuming the API returns an array of image URLs
      if (data.images && data.images.length > 0) {
        setGeneratedImage(data.images[0])
      }
    } catch (error) {
      console.error('Error generating image:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-gray-800 border-pink-500 border-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-pink-500">Runware API Image Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Your Runware API key for authentication</p>
                <Input
                  type="text"
                  placeholder="API Key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-gray-700 text-white border-purple-500 border-2"
                />
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Describe the image you want to generate</p>
                <Input
                  type="text"
                  placeholder="Prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-gray-700 text-white border-pink-500 border-2"
                />
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Describe what you don't want in the image</p>
                <Input
                  type="text"
                  placeholder="Negative Prompt"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  className="w-full bg-gray-700 text-white border-purple-500 border-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Image width in pixels</p>
                  <label className="block mb-2">Width: {width}</label>
                  <Slider
                    min={64}
                    max={1024}
                    step={64}
                    value={[width]}
                    onValueChange={(value) => setWidth(value[0])}
                    className="border-pink-500 border-2 p-2 rounded"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Image height in pixels</p>
                  <label className="block mb-2">Height: {height}</label>
                  <Slider
                    min={64}
                    max={1024}
                    step={64}
                    value={[height]}
                    onValueChange={(value) => setHeight(value[0])}
                    className="border-purple-500 border-2 p-2 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Number of denoising steps</p>
                  <label className="block mb-2">Inference Steps: {inferenceSteps}</label>
                  <Slider
                    min={1}
                    max={50}
                    value={[inferenceSteps]}
                    onValueChange={(value) => setInferenceSteps(value[0])}
                    className="border-pink-500 border-2 p-2 rounded"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">How closely to follow the prompt</p>
                  <label className="block mb-2">Guidance Scale: {guidanceScale}</label>
                  <Slider
                    min={1}
                    max={20}
                    step={0.1}
                    value={[guidanceScale]}
                    onValueChange={(value) => setGuidanceScale(value[0])}
                    className="border-purple-500 border-2 p-2 rounded"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Seed for reproducible results (-1 for random)</p>
                <Input
                  type="number"
                  placeholder="Seed (-1 for random)"
                  value={seed}
                  onChange={(e) => setSeed(parseInt(e.target.value))}
                  className="w-full bg-gray-700 text-white border-pink-500 border-2"
                />
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Number of images to generate in a single batch</p>
                <Input
                  type="number"
                  placeholder="Batch Size"
                  value={batchSize}
                  onChange={(e) => setBatchSize(parseInt(e.target.value))}
                  className="w-full bg-gray-700 text-white border-purple-500 border-2"
                />
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Number of images to generate</p>
                <Input
                  type="number"
                  placeholder="Number of Results"
                  value={numberResults}
                  onChange={(e) => setNumberResults(parseInt(e.target.value))}
                  className="w-full bg-gray-700 text-white border-purple-500 border-2"
                />
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Choose the denoising algorithm</p>
                <Select value={scheduler} onValueChange={setScheduler}>
                  <SelectTrigger className="w-full bg-gray-700 text-white border-pink-500 border-2">
                    <SelectValue placeholder="Select scheduler" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dpmsolver++">DPM-Solver++</SelectItem>
                    <SelectItem value="euler_a">Euler Ancestral</SelectItem>
                    <SelectItem value="ddim">DDIM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Use Latent Consistency Models for faster inference</p>
                <div className="flex items-center justify-between border-purple-500 border-2 p-2 rounded">
                  <span>Use LCM</span>
                  <Switch checked={useLCM} onCheckedChange={setUseLCM} />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Use Stable Diffusion XL for higher quality images</p>
                <div className="flex items-center justify-between border-pink-500 border-2 p-2 rounded">
                  <span>Use XL</span>
                  <Switch checked={useXL} onCheckedChange={setUseXL} />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Use a refiner model for enhanced details</p>
                <div className="flex items-center justify-between border-purple-500 border-2 p-2 rounded">
                  <span>Use Refiner</span>
                  <Switch checked={useRefiner} onCheckedChange={setUseRefiner} />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Use ControlNet for guided image generation</p>
                <div className="flex items-center justify-between border-pink-500 border-2 p-2 rounded">
                  <span>Use ControlNet</span>
                  <Switch checked={useControlNet} onCheckedChange={setUseControlNet} />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Specify the model to use for image generation (runware:101@1 flux.dev / runware:100@1 fastflux)</p>
                <Input
                  type="text"
                  placeholder="Model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-gray-700 text-white border-purple-500 border-2"
                />
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Choose the format of the generated image data</p>
                <Select value={outputType} onValueChange={setOutputType}>
                  <SelectTrigger className="w-full bg-gray-700 text-white border-pink-500 border-2">
                    <SelectValue placeholder="Select output type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="URL">URL</SelectItem>
                    <SelectItem value="base64Data">base64Data</SelectItem>
                    <SelectItem value="dataURI">dataURI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Choose the file format of the generated image</p>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger className="w-full bg-gray-700 text-white border-pink-500 border-2">
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JPG">JPG</SelectItem>
                    <SelectItem value="PNG">PNG</SelectItem>
                    <SelectItem value="WEBP">WEBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
              >
                Generate Image
              </Button>
            </div>

            <div className="border-2 border-pink-500 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Generated Image</h3>
              {generatedImage ? (
                <img src={generatedImage} alt="Generated" className="w-full h-auto" />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-700 text-gray-400">
                  No image generated yet
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}