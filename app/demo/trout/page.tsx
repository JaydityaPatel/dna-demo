"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Eye, TreePine, ImageIcon, Dna, MapPin, Info } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PhylogeneticTree } from "@/components/phylogenetic-tree"

// Demo data for Rainbow Trout
const troutResults = {
  taxonomy: {
    scientificName: "Oncorhynchus mykiss",
    commonName: "Rainbow Trout",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Actinopterygii",
    order: "Salmoniformes",
    family: "Salmonidae",
    genus: "Oncorhynchus",
    species: "mykiss",
    confidence: 97.8,
  },
  sequence: {
    length: 658,
    gcContent: 51.2,
    quality: "High",
    region: "COI (Cytochrome c oxidase subunit I)",
  },
  ecology: {
    habitat: "Cold freshwater streams, rivers, and lakes",
    distribution: "North America, introduced worldwide",
    conservation: "Least Concern",
    diet: "Carnivorous - insects, crustaceans, small fish",
  },
}

export default function TroutDemoPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleDownload = (format: "pdf" | "csv") => {
    console.log(`Downloading trout report as ${format.toUpperCase()}`)
  }

  const handleViewDetails = () => {
    router.push("/detailed-view")
  }

  const handleExploreRelated = () => {
    router.push("/explore")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Loading Analysis Results</h2>
            <p className="text-muted-foreground">Processing Rainbow Trout sequence data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen dark-gradient text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/upload">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Upload
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Demo: Rainbow Trout Analysis</h1>
              <p className="text-muted-foreground">Comprehensive sequence identification and biological data</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleDownload("csv")}>
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button onClick={() => handleDownload("pdf")} className="glass-card">
              <Download className="h-4 w-4 mr-2" />
              PDF Report
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Taxonomy Card */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna className="h-5 w-5 text-primary" />
                  Taxonomic Identification
                  <Badge variant="secondary" className="ml-auto">
                    {troutResults.taxonomy.confidence}% confidence
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">{troutResults.taxonomy.scientificName}</h3>
                    <p className="text-lg text-muted-foreground">{troutResults.taxonomy.commonName}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Kingdom:</span>
                      <span className="font-medium">{troutResults.taxonomy.kingdom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phylum:</span>
                      <span className="font-medium">{troutResults.taxonomy.phylum}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class:</span>
                      <span className="font-medium">{troutResults.taxonomy.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order:</span>
                      <span className="font-medium">{troutResults.taxonomy.order}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Family:</span>
                      <span className="font-medium">{troutResults.taxonomy.family}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sequence Information */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>Sequence Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Length:</span>
                      <span className="font-medium">{troutResults.sequence.length} bp</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GC Content:</span>
                      <span className="font-medium">{troutResults.sequence.gcContent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quality:</span>
                      <Badge variant="secondary">{troutResults.sequence.quality}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Region:</span>
                      <span className="font-medium">{troutResults.sequence.region}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg font-mono text-sm">
                    <div className="text-xs text-muted-foreground mb-2">Sequence Preview:</div>
                    <div className="break-all">
                      ATCGATCGATCGTAGCTAGCTAGCTAGCTAGCT AGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTA
                      GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAG
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      ... showing first 96 of {troutResults.sequence.length} base pairs
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phylogenetic Relationships */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-primary" />
                  Phylogenetic Relationships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PhylogeneticTree />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Biological Images */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Biological Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div
                    className="aspect-square bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors flex items-center justify-center"
                    onClick={() => setSelectedImage("trout-1")}
                  >
                    <img
                      src="/rainbow-trout.jpg"
                      alt="Rainbow trout specimen"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div
                    className="aspect-square bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors flex items-center justify-center"
                    onClick={() => setSelectedImage("trout-2")}
                  >
                    <img
                      src="/placeholder.jpg"
                      alt="Rainbow trout habitat"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Images
                </Button>
              </CardContent>
            </Card>

            {/* Ecological Information */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Ecological Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Habitat</h4>
                    <p className="text-sm">{troutResults.ecology.habitat}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Distribution</h4>
                    <p className="text-sm">{troutResults.ecology.distribution}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Conservation Status</h4>
                    <Badge variant="secondary">{troutResults.ecology.conservation}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Diet</h4>
                    <p className="text-sm">{troutResults.ecology.diet}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleViewDetails} className="w-full modern-button neon-glow">
                <Info className="h-4 w-4 mr-2" />
                View Detailed Analysis
              </Button>
              <Button variant="outline" onClick={handleExploreRelated} className="w-full bg-transparent">
                <TreePine className="h-4 w-4 mr-2" />
                Explore Related Species
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
