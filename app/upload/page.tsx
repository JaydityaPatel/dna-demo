"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, AlertCircle, ArrowLeft, Waves, Fish, Droplets } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [sequence, setSequence] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = (uploadedFile: File) => {
    const validTypes = ["text/plain", "text/csv", "application/csv"]
    const validExtensions = [".fasta", ".fa", ".csv", ".txt"]

    const hasValidExtension = validExtensions.some((ext) => uploadedFile.name.toLowerCase().endsWith(ext))

    if (!validTypes.includes(uploadedFile.type) && !hasValidExtension) {
      setError("Please upload a valid FASTA or CSV file")
      return
    }

    setFile(uploadedFile)
    setError("")
    setSequence("") // Clear text input when file is uploaded
  }

  const handleNext = () => {
    if (!file && !sequence.trim()) {
      setError("Please upload a file or paste a DNA sequence")
      return
    }

    if (sequence.trim() && !/^[ATCGN\s\n\r>]+$/i.test(sequence)) {
      setError("Invalid DNA sequence. Please use only A, T, C, G, N characters")
      return
    }

    // Store data and navigate to processing
    if (file) {
      sessionStorage.setItem("uploadedFile", file.name)
    }
    if (sequence) {
      sessionStorage.setItem("pastedSequence", sequence)
    }

    router.push("/processing")
  }

  const canProceed = file || sequence.trim()

  return (
    <div className="min-h-screen dark-gradient text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Upload DNA Sequence</h1>
            <p className="text-muted-foreground">Upload a file or paste your sequence to begin analysis</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Three Column Layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* File Upload Card */}
            <Card className="bg-gray-800/50 border-gray-600/50 h-96 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5 text-primary" />
                  File Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors flex-1 flex flex-col justify-center ${
                    dragActive ? "border-primary bg-primary/5" : "border-gray-500 hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="space-y-2">
                      <FileText className="h-10 w-10 text-primary mx-auto" />
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                      <Button variant="outline" size="sm" onClick={() => setFile(null)}>
                        Remove File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto" />
                      <div>
                        <p className="font-medium text-sm">Drop your FASTA or CSV file here</p>
                        <p className="text-xs text-muted-foreground">or click to browse files</p>
                      </div>
                      <input
                        type="file"
                        accept=".fasta,.fa,.csv,.txt"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button variant="outline" size="sm" asChild>
                        <label htmlFor="file-upload" className="cursor-pointer">
                          Browse Files
                        </label>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Text Input Card */}
            <Card className="bg-gray-800/50 border-gray-600/50 h-96 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-primary" />
                  Paste Sequence
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <Textarea
                  placeholder="Paste your DNA sequence here (FASTA format supported)&#10;Example:&#10;>Sample_Sequence&#10;ATCGATCGATCGATCG..."
                  value={sequence}
                  onChange={(e) => {
                    setSequence(e.target.value)
                    if (e.target.value.trim()) {
                      setFile(null) // Clear file when text is entered
                    }
                    setError("")
                  }}
                  className="flex-1 font-mono text-sm resize-none"
                />
              </CardContent>
            </Card>

            {/* Demo Dashboards Card */}
            <Card className="bg-gray-800/50 border-gray-600/50 h-96 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fish className="h-5 w-5 text-primary" />
                  Demo Dashboards
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4">
                  Explore sample analysis results for different marine species.
                </p>
                <div className="space-y-4 flex-1">
                  {/* Top Row - Two buttons side by side */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="h-20 p-3 flex flex-col items-center justify-center gap-2 bg-transparent species-button neon-glow transition-all duration-300 hover:scale-105"
                      asChild
                    >
                      <Link href="/demo/salmon">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center font-mono text-sm text-primary border border-primary/30">
                          <div className="text-center leading-tight">
                            <div>ATCG</div>
                            <div>GCTA</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-sm">Salmon</div>
                          <div className="text-xs text-muted-foreground">Salmo salar</div>
                        </div>
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 p-3 flex flex-col items-center justify-center gap-2 bg-transparent species-button neon-glow transition-all duration-300 hover:scale-105"
                      asChild
                    >
                      <Link href="/demo/trout">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center font-mono text-sm text-primary border border-primary/30">
                          <div className="text-center leading-tight">
                            <div>GCTA</div>
                            <div>ATCG</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-sm">Trout</div>
                          <div className="text-xs text-muted-foreground">Oncorhynchus</div>
                        </div>
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Bottom Row - One centered button */}
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      className="h-20 px-6 py-3 flex flex-col items-center justify-center gap-2 bg-transparent species-button neon-glow transition-all duration-300 hover:scale-105"
                      asChild
                    >
                      <Link href="/demo/whitefish">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center font-mono text-sm text-primary border border-primary/30">
                          <div className="text-center leading-tight">
                            <div>CGAT</div>
                            <div>TAGC</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-sm">Whitefish</div>
                          <div className="text-xs text-muted-foreground">Coregonus</div>
                        </div>
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg mt-6">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <p className="text-destructive">{error}</p>
            </div>
          )}

          {/* Next Button */}
          <div className="flex justify-end mt-6">
            <Button size="lg" onClick={handleNext} disabled={!canProceed} className="modern-button">
              Next: Process Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
