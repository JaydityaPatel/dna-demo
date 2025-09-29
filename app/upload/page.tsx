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
            <h1 className="text-4xl font-bold">
              <span className="gradient-text-large">Heart of the</span> DNA Analysis
            </h1>
            <p className="text-muted-foreground text-lg">Your smart companion for discovering marine species, one sequence at a time</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Main Upload Section - Side by Side */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* File Upload Card */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5 text-primary" />
                  File Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="space-y-2">
                      <FileText className="h-10 w-10 text-primary mx-auto" />
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                      <Button variant="outline" size="sm" onClick={() => setFile(null)} className="neon-glow">
                        Remove File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto" />
                      <div>
                        <p className="font-medium">Drop your FASTA or CSV file here</p>
                        <p className="text-sm text-muted-foreground">or click to browse files</p>
                      </div>
                      <input
                        type="file"
                        accept=".fasta,.fa,.csv,.txt"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button variant="outline" asChild className="neon-glow">
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
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-primary" />
                  Or Paste Sequence Directly
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                  className="min-h-32 font-mono text-sm search-bar"
                />
              </CardContent>
            </Card>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <p className="text-destructive">{error}</p>
            </div>
          )}

          {/* Next Button */}
          <div className="flex justify-end">
            <Button size="lg" onClick={handleNext} disabled={!canProceed} className="modern-button">
              Next: Process Data
            </Button>
          </div>

          {/* Existing FASTA Files Section */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fish className="h-5 w-5 text-primary neon-text" />
                <span className="neon-text">Existing FASTA Files</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Explore sample analysis results for different marine species to see what the tool can do.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-3 bg-transparent species-button neon-glow transition-all duration-300"
                  asChild
                >
                  <Link href="/demo/salmon">
                    <div className="w-16 h-16 bg-muted/30 rounded-lg flex items-center justify-center font-mono text-xs text-primary">
                      <div className="text-center">
                        <div>ATCGATCG</div>
                        <div>GCTAGCTA</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Atlantic Salmon</div>
                      <div className="text-xs text-muted-foreground">Salmo salar</div>
                    </div>
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-3 bg-transparent species-button neon-glow transition-all duration-300"
                  asChild
                >
                  <Link href="/demo/trout">
                    <div className="w-16 h-16 bg-muted/30 rounded-lg flex items-center justify-center font-mono text-xs text-primary">
                      <div className="text-center">
                        <div>GCTAGCTA</div>
                        <div>ATCGATCG</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Rainbow Trout</div>
                      <div className="text-xs text-muted-foreground">Oncorhynchus mykiss</div>
                    </div>
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-3 bg-transparent species-button neon-glow transition-all duration-300"
                  asChild
                >
                  <Link href="/demo/whitefish">
                    <div className="w-16 h-16 bg-muted/30 rounded-lg flex items-center justify-center font-mono text-xs text-primary">
                      <div className="text-center">
                        <div>CGATCGAT</div>
                        <div>TAGCTAGC</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">European Whitefish</div>
                      <div className="text-xs text-muted-foreground">Coregonus lavaretus</div>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
