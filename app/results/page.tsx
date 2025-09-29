"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Eye, TreePine, ImageIcon, Dna, MapPin, Info } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PhylogeneticTree } from "@/components/phylogenetic-tree"

// Mock data for demonstration
const analysisResults = {
  taxonomy: {
    scientificName: "Salmo trutta",
    commonName: "Brown Trout",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Actinopterygii",
    order: "Salmoniformes",
    family: "Salmonidae",
    genus: "Salmo",
    species: "trutta",
    confidence: 98.7,
  },
  sequence: {
    length: 658,
    gcContent: 52.3,
    quality: "High",
    region: "COI (Cytochrome c oxidase subunit I)",
  },
  ecology: {
    habitat: "Freshwater streams and lakes",
    distribution: "Europe, Asia, North America",
    conservation: "Least Concern",
    diet: "Carnivorous - insects, crustaceans, small fish",
  },
}

export default function ResultsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const router = useRouter()

  const handleDownload = (format: "pdf" | "csv") => {
    // Mock download functionality
    console.log(`Downloading report as ${format.toUpperCase()}`)
    // In real implementation, this would trigger actual file download
  }

  const handleViewDetails = () => {
    router.push("/detailed-view")
  }

  const handleExploreRelated = () => {
    router.push("/explore")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/analysis">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Analysis
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Analysis Results</h1>
              <p className="text-muted-foreground">Comprehensive sequence identification and biological data</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleDownload("csv")}>
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button onClick={() => handleDownload("pdf")} className="scientific-glow">
              <Download className="h-4 w-4 mr-2" />
              PDF Report
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Taxonomy Card */}
            <Card className="scientific-glow border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna className="h-5 w-5 text-primary" />
                  Taxonomic Identification
                  <Badge variant="secondary" className="ml-auto">
                    {analysisResults.taxonomy.confidence}% confidence
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">{analysisResults.taxonomy.scientificName}</h3>
                    <p className="text-lg text-muted-foreground">{analysisResults.taxonomy.commonName}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Kingdom:</span>
                      <span className="font-medium">{analysisResults.taxonomy.kingdom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phylum:</span>
                      <span className="font-medium">{analysisResults.taxonomy.phylum}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class:</span>
                      <span className="font-medium">{analysisResults.taxonomy.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order:</span>
                      <span className="font-medium">{analysisResults.taxonomy.order}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Family:</span>
                      <span className="font-medium">{analysisResults.taxonomy.family}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sequence Information */}
            <Card className="scientific-glow border-border/50">
              <CardHeader>
                <CardTitle>Sequence Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Length:</span>
                      <span className="font-medium">{analysisResults.sequence.length} bp</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GC Content:</span>
                      <span className="font-medium">{analysisResults.sequence.gcContent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quality:</span>
                      <Badge variant="secondary">{analysisResults.sequence.quality}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Region:</span>
                      <span className="font-medium">{analysisResults.sequence.region}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg font-mono text-sm">
                    <div className="text-xs text-muted-foreground mb-2">Sequence Preview:</div>
                    <div className="break-all">
                      ATCGATCGATCGTAGCTAGCTAGCTAGCTAGCT AGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTA
                      GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAG
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      ... showing first 96 of {analysisResults.sequence.length} base pairs
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phylogenetic Relationships */}
            <Card className="scientific-glow border-border/50">
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
            <Card className="scientific-glow border-border/50">
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
                      src="/brown-trout-fish-swimming.jpg"
                      alt="Brown trout specimen"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div
                    className="aspect-square bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors flex items-center justify-center"
                    onClick={() => setSelectedImage("trout-2")}
                  >
                    <img
                      src="/brown-trout-habitat-stream.jpg"
                      alt="Brown trout habitat"
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
            <Card className="scientific-glow border-border/50">
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
                    <p className="text-sm">{analysisResults.ecology.habitat}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Distribution</h4>
                    <p className="text-sm">{analysisResults.ecology.distribution}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Conservation Status</h4>
                    <Badge variant="secondary">{analysisResults.ecology.conservation}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Diet</h4>
                    <p className="text-sm">{analysisResults.ecology.diet}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleViewDetails} className="w-full scientific-glow">
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
