// components/InstaFlux.tsx
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Image, Settings, Wand2, AlertCircle, Info } from 'lucide-react'

export default function InstaFlux() {
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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!apiKey || !prompt) {
      setError('API Key and Prompt are required.')
      return
    }

    setIsLoading(true)
    setError('')

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

      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const data = await response.json()
      
      if (data.images && data.images.length > 0) {
        setGeneratedImage(data.images[0])
      } else {
        throw new Error('No image generated')
      }
    } catch (error) {
      console.error('Error generating image:', error)
      setError('Failed to generate image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-gray-800 border-pink-500 border-2">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-pink-500">InstaFlux Image Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-gray-700">
              <TabsTrigger value="basic" className="data-[state=active]:bg-pink-500">Basic</TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-pink-500">Advanced</TabsTrigger>
              <TabsTrigger value="output" className="data-[state=active]:bg-pink-500">Output</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4">
              <div>
                <Label htmlFor="apiKey" className="text-pink-500">API Key</Label>
                <p className="text-sm text-gray-400 mb-1">Your Runware API key for authentication</p>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your Runware API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-gray-700 text-white border-purple-500 border-2"
                />
              </div>
              <div>
                <Label htmlFor="prompt" className="text-pink-500">Prompt</Label>
                <p className="text-sm text-gray-400 mb-1">Describe the image you want to generate</p>
                <Input
                  id="prompt"
                  placeholder="Describe the image you want to generate"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-gray-700 text-white border-pink-500 border-2"
                />
              </div>
              <div>
                <Label htmlFor="negativePrompt" className="text-pink-500">Negative Prompt</Label>
                <p className="text-sm text-gray-400 mb-1">Describe what you don't want in the image</p>
                <Input
                  id="negativePrompt"
                  placeholder="Describe what you don't want in the image"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  className="bg-gray-700 text-white border-purple-500 border-2"
                />
              </div>
            </TabsContent>
            <TabsContent value="advanced" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-pink-500">Width: {width}px</Label>
                  <p className="text-sm text-gray-400 mb-1">Image width in pixels</p>
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
                  <Label className="text-pink-500">Height: {height}px</Label>
                  <p className="text-sm text-gray-400 mb-1">Image height in pixels</p>
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
                  <Label className="text-pink-500">Inference Steps: {inferenceSteps}</Label>
                  <p className="text-sm text-gray-400 mb-1">Number of denoising steps</p>
                  <Slider
                    min={1}
                    max={50}
                    value={[inferenceSteps]}
                    onValueChange={(value) => setInferenceSteps(value[0])}
                    className="border-pink-500 border-2 p-2 rounded"
                  />
                </div>
                <div>
                  <Label className="text-pink-500">Guidance Scale: {guidanceScale}</Label>
                  <p className="text-sm text-gray-400 mb-1">How closely to follow the prompt</p>
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
                <Label htmlFor="seed" className="text-pink-500">Seed</Label>
                <p className="text-sm text-gray-400 mb-1">Seed for reproducible results (-1 for random)</p>
                <Input
                  id="seed"
                  type="number"
                  placeholder="Seed (-1 for random)"
                  value={seed}
                  onChange={(e) => setSeed(parseInt(e.target.value))}
                  className="bg-gray-700 text-white border-pink-500 border-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="batchSize" className="text-pink-500">Batch Size</Label>
                  <p className="text-sm text-gray-400 mb-1">Number of images to generate in a single batch</p>
                  <Input
                    id="batchSize"
                    type="number"
                    value={batchSize}
                    onChange={(e) => setBatchSize(parseInt(e.target.value))}
                    className="bg-gray-700 text-white border-purple-500 border-2"
                  />
                </div>
                <div>
                  <Label htmlFor="numberResults" className="text-pink-500">Number of Results</Label>
                  <p className="text-sm text-gray-400 mb-1">Number of images to generate</p>
                  <Input
                    id="numberResults"
                    type="number"
                    value={numberResults}
                    onChange={(e) => setNumberResults(parseInt(e.target.value))}
                    className="bg-gray-700 text-white border-purple-500 border-2"
                  />
                </div>
              </div>
              <div>
                <Label className="text-pink-500">Scheduler</Label>
                <p className="text-sm text-gray-400 mb-1">Choose the denoising algorithm</p>
                <Select value={scheduler} onValueChange={setScheduler}>
                  <SelectTrigger className="bg-gray-700 text-white border-pink-500 border-2">
                    <SelectValue placeholder="Select scheduler" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dpmsolver++">DPM-Solver++</SelectItem>
                    <SelectItem value="euler_a">Euler Ancestral</SelectItem>
                    <SelectItem value="ddim">DDIM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between border-purple-500 border-2 p-2 rounded">
                        <span className="text-pink-500">Use LCM</span>
                        <Switch checked={useLCM} onCheckedChange={setUseLCM} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Use Latent Consistency Models for faster inference</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between border-pink-500 border-2 p-2 rounded">
                        <span className="text-pink-500">Use XL</span>
                        <Switch checked={useXL} onCheckedChange={setUseXL} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Use Stable Diffusion XL for higher quality images</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between border-purple-500 border-2 p-2 rounded">
                        <span className="text-pink-500">Use Refiner</span>
                        <Switch checked={useRefiner} onCheckedChange={setUseRefiner} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Use a refiner model for enhanced details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between border-pink-500 border-2 p-2 rounded">
                        <span className="text-pink-500">Use ControlNet</span>
                        <Switch checked={useControlNet} onCheckedChange={setUseControlNet} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Use ControlNet for guided image generation</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TabsContent>
            <TabsContent value="output" className="space-y-4">
              <div>
                <Label htmlFor="model" className="text-pink-500">Model</Label>
                <p className="text-sm text-gray-400 mb-1">Specify the model to use for image generation (runware:101@1 flux.dev / runware:100@1 fastflux)</p>
                <Input
                  id="model"
                  placeholder="Specify the model (e.g., runware:101@1)"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="bg-gray-700 text-white border-purple-500 border-2"
                />
              </div>
              <div>
                <Label className="text-pink-500">Output Type</Label>
                <p className="text-sm text-gray-400 mb-1">Choose the format of the generated image data</p>
                <Select value={outputType} onValueChange={setOutputType}>
                  <SelectTrigger className="bg-gray-700 text-white border-pink-500 border-2">
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
                <Label className="text-pink-500">Output Format</Label>
                <p className="text-sm text-gray-400 mb-1">Choose the file format of the generated image</p>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger className="bg-gray-700 text-white border-pink-500 border-2">
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JPG">JPG</SelectItem>
                    <SelectItem value="PNG">PNG</SelectItem>
                    <SelectItem value="WEBP">WEBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          {error && (
            <Alert variant="destructive" className="mt-4 bg-red-900 border-red-500">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleGenerate}
            className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Wand2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Image
              </>
            )}
          </Button>

          <div className="mt-8 border-2 border-pink-500 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center text-pink-500">
              <Image className="mr-2 h-5 w-5" />
              Generated Image
            </h3>
            {generatedImage ? (
              <img src={generatedImage} alt="Generated" className="w-full h-auto rounded-md" />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-gray-700 text-gray-400 rounded-md">
                <Info className="mr-2 h-5 w-5" />
                No image generated yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}