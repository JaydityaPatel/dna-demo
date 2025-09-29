"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Eye, TreePine, MapPin, Filter, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for related sequences
const relatedSequences = [
  {
    id: "seq-001",
    scientificName: "Salmo salar",
    commonName: "Atlantic Salmon",
    similarity: 94.2,
    family: "Salmonidae",
    habitat: "Anadromous - Ocean and freshwater",
    conservation: "Least Concern",
    image: "/atlantic-salmon.jpg",
    description: "Closely related species with high genetic similarity to brown trout",
  },
  {
    id: "seq-002",
    scientificName: "Oncorhynchus mykiss",
    commonName: "Rainbow Trout",
    similarity: 89.7,
    family: "Salmonidae",
    habitat: "Freshwater streams and lakes",
    conservation: "Least Concern",
    image: "/rainbow-trout.jpg",
    description: "Popular sport fish with similar ecological niche",
  },
  {
    id: "seq-003",
    scientificName: "Salvelinus fontinalis",
    commonName: "Brook Trout",
    similarity: 87.3,
    family: "Salmonidae",
    habitat: "Cold freshwater streams",
    conservation: "Least Concern",
    image: "/brook-trout.jpg",
    description: "Native North American char species",
  },
  {
    id: "seq-004",
    scientificName: "Thymallus thymallus",
    commonName: "European Grayling",
    similarity: 82.1,
    family: "Salmonidae",
    habitat: "Fast-flowing rivers",
    conservation: "Near Threatened",
    image: "/european-grayling.jpg",
    description: "Distinctive dorsal fin and unique spawning behavior",
  },
  {
    id: "seq-005",
    scientificName: "Coregonus lavaretus",
    commonName: "European Whitefish",
    similarity: 78.9,
    family: "Salmonidae",
    habitat: "Deep lakes and coastal waters",
    conservation: "Least Concern",
    image: "/european-whitefish.jpg",
    description: "Important commercial species in northern Europe",
  },
  {
    id: "seq-006",
    scientificName: "Hucho hucho",
    commonName: "Huchen",
    similarity: 76.4,
    family: "Salmonidae",
    habitat: "Large rivers in Danube basin",
    conservation: "Endangered",
    image: "/huchen-salmon.jpg",
    description: "Largest European salmonid, critically endangered",
  },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"similarity" | "name">("similarity")
  const router = useRouter()

  const filteredSequences = relatedSequences
    .filter((seq) => {
      const matchesSearch =
        seq.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seq.commonName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFamily = !selectedFamily || seq.family === selectedFamily
      return matchesSearch && matchesFamily
    })
    .sort((a, b) => {
      if (sortBy === "similarity") return b.similarity - a.similarity
      return a.scientificName.localeCompare(b.scientificName)
    })

  const handleExploreSequence = (sequenceId: string) => {
    // In a real app, this would navigate to detailed view of the selected sequence
    console.log(`Exploring sequence: ${sequenceId}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/results">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Results
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Explore Related Sequences</h1>
            <p className="text-muted-foreground">Discover similar species and their evolutionary relationships</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by species name or common name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={sortBy === "similarity" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("similarity")}
            >
              <Star className="h-4 w-4 mr-2" />
              By Similarity
            </Button>
            <Button variant={sortBy === "name" ? "default" : "outline"} size="sm" onClick={() => setSortBy("name")}>
              <Filter className="h-4 w-4 mr-2" />
              By Name
            </Button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSequences.map((sequence) => (
            <Card
              key={sequence.id}
              className="scientific-glow border-border/50 hover:border-primary/30 transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-balance">{sequence.scientificName}</CardTitle>
                    <p className="text-muted-foreground">{sequence.commonName}</p>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {sequence.similarity}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Species Image */}
                <div className="aspect-video bg-muted/30 rounded-lg overflow-hidden">
                  <img
                    src={sequence.image || "/placeholder.svg"}
                    alt={sequence.commonName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Species Info */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground text-pretty">{sequence.description}</p>

                  <div className="flex items-center gap-2 text-sm">
                    <TreePine className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Family:</span>
                    <span>{sequence.family}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Habitat:</span>
                    <span className="text-pretty">{sequence.habitat}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        sequence.conservation === "Endangered"
                          ? "destructive"
                          : sequence.conservation === "Near Threatened"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {sequence.conservation}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleExploreSequence(sequence.id)}
                      className="bg-transparent"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Explore
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredSequences.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No sequences found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="scientific-glow border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{relatedSequences.length}</div>
              <p className="text-muted-foreground">Related Species Found</p>
            </CardContent>
          </Card>
          <Card className="scientific-glow border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {Math.max(...relatedSequences.map((s) => s.similarity)).toFixed(1)}%
              </div>
              <p className="text-muted-foreground">Highest Similarity</p>
            </CardContent>
          </Card>
          <Card className="scientific-glow border-border/50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">1</div>
              <p className="text-muted-foreground">Taxonomic Family</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
