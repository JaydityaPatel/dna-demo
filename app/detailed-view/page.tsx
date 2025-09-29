"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw, TreePine, Dna, FileText } from "lucide-react"
import Link from "next/link"

export default function DetailedViewPage() {
  const [zoomLevel, setZoomLevel] = useState(100)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const handleZoom = (direction: "in" | "out") => {
    setZoomLevel((prev) => {
      if (direction === "in") return Math.min(prev + 25, 200)
      return Math.max(prev - 25, 50)
    })
  }

  const resetZoom = () => setZoomLevel(100)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/results">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Results
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Detailed Analysis</h1>
              <p className="text-muted-foreground">Interactive phylogenetic tree and sequence annotations</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="phylogenetic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="phylogenetic">Phylogenetic Tree</TabsTrigger>
            <TabsTrigger value="annotations">Sequence Annotations</TabsTrigger>
            <TabsTrigger value="alignment">Multiple Alignment</TabsTrigger>
          </TabsList>

          <TabsContent value="phylogenetic" className="space-y-6">
            <Card className="scientific-glow border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TreePine className="h-5 w-5 text-primary" />
                    Interactive Phylogenetic Tree
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleZoom("out")}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">{zoomLevel}%</span>
                    <Button variant="outline" size="sm" onClick={() => handleZoom("in")}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetZoom}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-muted/20 rounded-lg p-6 min-h-96 overflow-auto">
                  <div
                    className="transition-transform origin-top-left"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  >
                    {/* Interactive tree visualization */}
                    <svg width="600" height="400" className="w-full">
                      {/* Tree branches */}
                      <g stroke="currentColor" strokeWidth="2" fill="none" className="text-border">
                        <path d="M50 200 L150 200 L150 100 L250 100" />
                        <path d="M150 200 L150 150 L250 150" />
                        <path d="M150 200 L150 250 L250 250" />
                        <path d="M150 200 L150 300 L250 300" />
                        <path d="M250 150 L350 120" />
                        <path d="M250 150 L350 180" />
                        <path d="M250 250 L350 220" />
                        <path d="M250 250 L350 280" />
                      </g>

                      {/* Tree nodes */}
                      <g>
                        <circle
                          cx="50"
                          cy="200"
                          r="6"
                          className="fill-muted-foreground cursor-pointer hover:fill-primary transition-colors"
                          onClick={() => setSelectedNode("root")}
                        />
                        <circle
                          cx="150"
                          cy="200"
                          r="6"
                          className="fill-muted-foreground cursor-pointer hover:fill-primary transition-colors"
                          onClick={() => setSelectedNode("salmonidae")}
                        />
                        <circle
                          cx="250"
                          cy="100"
                          r="6"
                          className="fill-muted-foreground cursor-pointer hover:fill-primary transition-colors"
                          onClick={() => setSelectedNode("oncorhynchus")}
                        />
                        <circle
                          cx="250"
                          cy="150"
                          r="6"
                          className="fill-primary cursor-pointer hover:fill-primary/80 transition-colors"
                          onClick={() => setSelectedNode("salmo")}
                        />
                        <circle
                          cx="350"
                          cy="120"
                          r="6"
                          className="fill-muted-foreground cursor-pointer hover:fill-primary transition-colors"
                          onClick={() => setSelectedNode("kisutch")}
                        />
                        <circle
                          cx="350"
                          cy="180"
                          r="8"
                          className="fill-primary stroke-primary stroke-2 cursor-pointer hover:fill-primary/80 transition-colors"
                          onClick={() => setSelectedNode("trutta")}
                        />
                        <circle
                          cx="350"
                          cy="220"
                          r="6"
                          className="fill-muted-foreground cursor-pointer hover:fill-primary transition-colors"
                          onClick={() => setSelectedNode("salar")}
                        />
                      </g>

                      {/* Labels */}
                      <g className="text-sm fill-current">
                        <text x="60" y="205" className="text-muted-foreground">
                          Salmoniformes
                        </text>
                        <text x="160" y="205" className="text-muted-foreground">
                          Salmonidae
                        </text>
                        <text x="260" y="105" className="text-muted-foreground">
                          Oncorhynchus
                        </text>
                        <text x="260" y="155" className="text-primary font-semibold">
                          Salmo
                        </text>
                        <text x="360" y="125" className="text-muted-foreground">
                          O. kisutch
                        </text>
                        <text x="360" y="185" className="text-primary font-bold">
                          S. trutta
                        </text>
                        <text x="360" y="225" className="text-muted-foreground">
                          S. salar
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>

                {selectedNode && (
                  <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">
                      {selectedNode === "trutta"
                        ? "Salmo trutta (Your Sequence)"
                        : selectedNode === "salmo"
                          ? "Genus Salmo"
                          : selectedNode === "salar"
                            ? "Salmo salar (Atlantic Salmon)"
                            : "Selected Node"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedNode === "trutta"
                        ? "Brown trout - Your analyzed sequence with 98.7% confidence match"
                        : "Click on nodes to explore evolutionary relationships and taxonomic information"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="annotations" className="space-y-6">
            <Card className="scientific-glow border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna className="h-5 w-5 text-primary" />
                  Sequence Annotations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Functional Regions</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-primary rounded"></div>
                        <span className="text-sm">COI Gene (1-658 bp)</span>
                        <Badge variant="secondary">Protein coding</Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-accent rounded"></div>
                        <span className="text-sm">Start Codon (1-3 bp)</span>
                        <Badge variant="outline">ATG</Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-destructive rounded"></div>
                        <span className="text-sm">Stop Codon (656-658 bp)</span>
                        <Badge variant="outline">TAA</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Sequence Quality Metrics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">GC Content:</span>
                        <span>52.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">AT Content:</span>
                        <span>47.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">N's (ambiguous):</span>
                        <span>0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quality Score:</span>
                        <Badge variant="secondary">High</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alignment" className="space-y-6">
            <Card className="scientific-glow border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Multiple Sequence Alignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/20 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                  <div className="space-y-1">
                    <div className="flex">
                      <span className="w-20 text-muted-foreground">Query:</span>
                      <span className="text-primary">ATCGATCGATCGTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCT</span>
                    </div>
                    <div className="flex">
                      <span className="w-20 text-muted-foreground">S.salar:</span>
                      <span>ATCGATCGATCGTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCT</span>
                    </div>
                    <div className="flex">
                      <span className="w-20 text-muted-foreground">Match:</span>
                      <span className="text-green-500">||||||||||||||||||||||||||||||||||||||||||||</span>
                    </div>
                    <div className="flex">
                      <span className="w-20 text-muted-foreground">O.kisutch:</span>
                      <span>ATCGATCGATCGTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGT</span>
                    </div>
                    <div className="flex">
                      <span className="w-20 text-muted-foreground">Match:</span>
                      <span className="text-green-500">|||||||||||||||||||||||||||||||||||||||||||.</span>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Showing alignment positions 1-44 of 658 total positions
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
