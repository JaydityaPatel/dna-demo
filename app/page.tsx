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
        <div className="grid lg:grid-cols-2 gap-15">
          {/* Left Side - Main Content */}
          <div className="space-y-8">
            {/* Large Gradient Heading */}
            <div className="text-left space-y-2">
              <h1 className="leading-tight">
                <span className="moviebot-gradient">Explore</span>
              </h1>
              <h1 className="leading-tight">
                <span className="moviebot-gradient">DNA</span>
              </h1>
              <h1 className="leading-tight">
                <span className="moviebot-white-text">Sequence</span>
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="moviebot-button w-full max-w-md"
                asChild
              >
                <Link href="/upload">
                  <Microscope className="mr-2 h-5 w-5" />
                  Upload & Analyze
                </Link>
              </Button>
              
            </div>
          </div>

          {/* Right Side - Enlarged Spinning DNA */}
          <div className="dna-visualization">
            <div className="dna-large-spinner">
              <DNA className="dna-icon-large" />
            </div>
            <h3 className="dna-title">DNA Analysis</h3>
            <p className="dna-subtitle">Advanced sequencing and molecular analysis platform</p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <DNA className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold" style={{fontFamily: 'Poppins, sans-serif'}}>Sequence Analysis</h3>
              <p className="text-muted-foreground text-pretty">
                Advanced BLAST and Clustal Omega alignment for precise sequence identification and comparison.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-4">
              <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto">
                <TreePine className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold" style={{fontFamily: 'Poppins, sans-serif'}}>Phylogenetic Trees</h3>
              <p className="text-muted-foreground text-pretty">
                Interactive family trees and evolutionary relationships with detailed taxonomic information.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold" style={{fontFamily: 'Poppins, sans-serif'}}>Comprehensive Reports</h3>
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

                {/* DNA Sequence Display */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-primary/20">
                  <h3 className="text-lg font-semibold text-center mb-4 text-primary" style={{fontFamily: 'Poppins, sans-serif'}}>Sample DNA Sequences</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center font-mono text-sm text-primary border border-primary/30 mx-auto mb-2">
                        <div className="text-center leading-tight">
                          <div>ATCG</div>
                          <div>GCTA</div>
                        </div>
                      </div>
                      <p className="text-sm font-medium">Atlantic Salmon</p>
                      <p className="text-sm text-muted-foreground">Salmo salar</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center font-mono text-sm text-primary border border-primary/30 mx-auto mb-2">
                        <div className="text-center leading-tight">
                          <div>GCTA</div>
                          <div>ATCG</div>
                        </div>
                      </div>
                      <p className="text-sm font-medium">Rainbow Trout</p>
                      <p className="text-xs text-muted-foreground">Oncorhynchus mykiss</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center font-mono text-sm text-primary border border-primary/30 mx-auto mb-2">
                        <div className="text-center leading-tight">
                          <div>CGAT</div>
                          <div>TAGC</div>
                        </div>
                      </div>
                      <p className="text-sm font-medium">European Whitefish</p>
                      <p className="text-xs text-muted-foreground">Coregonus lavaretus</p>
                    </div>
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