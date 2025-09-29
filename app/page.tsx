import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dna as DNA, Microscope, TreePine, Download } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DNA className="h-8 w-8 text-primary dna-animation" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-balance">eDNA Analysis</h1>
                <p className="text-sm text-muted-foreground">Environmental DNA Sequencing Platform</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#help" className="text-muted-foreground hover:text-foreground transition-colors">
                Help
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
              Discover and explore <span className="text-primary">DNA sequences</span> and their biological connections
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Advanced environmental DNA analysis platform for researchers, scientists, and biologists. Upload
              sequences, analyze relationships, and explore biodiversity with cutting-edge tools.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="scientific-glow text-lg px-8 py-6 bg-primary hover:bg-primary/90" asChild>
              <Link href="/upload">
                <Microscope className="mr-2 h-5 w-5" />
                Start Analysis
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5 bg-transparent"
              asChild
            >
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="scientific-glow border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                  <DNA className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Sequence Analysis</h3>
                <p className="text-muted-foreground text-pretty">
                  Advanced BLAST and Clustal Omega alignment for precise sequence identification and comparison.
                </p>
              </CardContent>
            </Card>

            <Card className="scientific-glow border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center space-y-4">
                <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto">
                  <TreePine className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Phylogenetic Trees</h3>
                <p className="text-muted-foreground text-pretty">
                  Interactive family trees and evolutionary relationships with detailed taxonomic information.
                </p>
              </CardContent>
            </Card>

            <Card className="scientific-glow border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                  <Download className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Comprehensive Reports</h3>
                <p className="text-muted-foreground text-pretty">
                  Detailed PDF and CSV reports with biological images and ecological context data.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Scientific Visualization */}
          <div className="mt-16 p-8 bg-card/30 rounded-2xl border border-border/50 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="text-6xl font-mono text-primary/40">ATCG</div>
              <div className="text-4xl text-muted-foreground">→</div>
              <div className="text-6xl font-mono text-accent/40">GCTA</div>
              <div className="text-4xl text-muted-foreground">→</div>
              <div className="text-6xl font-mono text-primary/40">TACG</div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Powered by advanced bioinformatics algorithms and comprehensive biological databases
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <DNA className="h-6 w-6 text-primary" />
              <span className="text-sm text-muted-foreground">
                © 2025 eDNA Analysis Platform. Advancing biological research.
              </span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#help" className="text-muted-foreground hover:text-foreground transition-colors">
                Help
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
