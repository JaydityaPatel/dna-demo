"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Download, FileText, Table, CheckCircle, Home, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ReportSection {
  id: string
  label: string
  description: string
  included: boolean
}

export default function DownloadPage() {
  const [reportSections, setReportSections] = useState<ReportSection[]>([
    {
      id: "taxonomy",
      label: "Taxonomic Classification",
      description: "Complete taxonomic hierarchy and confidence scores",
      included: true,
    },
    {
      id: "sequence",
      label: "Sequence Analysis",
      description: "Sequence quality metrics, GC content, and annotations",
      included: true,
    },
    {
      id: "phylogenetic",
      label: "Phylogenetic Tree",
      description: "Interactive tree data and evolutionary relationships",
      included: true,
    },
    {
      id: "alignment",
      label: "Multiple Sequence Alignment",
      description: "BLAST results and sequence comparisons",
      included: false,
    },
    {
      id: "images",
      label: "Biological Images",
      description: "Species photographs and habitat images",
      included: true,
    },
    {
      id: "ecology",
      label: "Ecological Information",
      description: "Habitat, distribution, and conservation status",
      included: true,
    },
  ])

  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "complete">("idle")
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "csv">("pdf")
  const router = useRouter()

  const handleSectionToggle = (sectionId: string) => {
    setReportSections((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, included: !section.included } : section)),
    )
  }

  const handleDownload = async (format: "pdf" | "csv") => {
    setDownloadStatus("downloading")
    setSelectedFormat(format)

    // Simulate download process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setDownloadStatus("complete")

    // In a real app, this would trigger actual file download
    console.log(
      `Downloading ${format.toUpperCase()} report with sections:`,
      reportSections.filter((s) => s.included).map((s) => s.id),
    )
  }

  const handleNewAnalysis = () => {
    router.push("/")
  }

  const handleHome = () => {
    router.push("/")
  }

  if (downloadStatus === "complete") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="p-4 bg-green-500/10 rounded-full w-fit mx-auto">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Download Complete!</h1>
            <p className="text-muted-foreground">
              Your {selectedFormat.toUpperCase()} report has been downloaded successfully.
            </p>
          </div>
          <div className="space-y-3">
            <Button onClick={handleNewAnalysis} className="w-full scientific-glow">
              <RotateCcw className="h-4 w-4 mr-2" />
              Start New Analysis
            </Button>
            <Button variant="outline" onClick={handleHome} className="w-full bg-transparent">
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Thank you for using eDNA Analysis. We hope the results were helpful!
            </p>
          </div>
        </div>
      </div>
    )
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
            <h1 className="text-3xl font-bold">Download Report</h1>
            <p className="text-muted-foreground">Customize and download your analysis results</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Report Sections */}
          <Card className="scientific-glow border-border/50">
            <CardHeader>
              <CardTitle>Report Sections</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select which sections to include in your downloadable report
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {reportSections.map((section) => (
                <div
                  key={section.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <Checkbox
                    id={section.id}
                    checked={section.included}
                    onCheckedChange={() => handleSectionToggle(section.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor={section.id} className="font-medium cursor-pointer">
                      {section.label}
                    </label>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Download Options */}
          <Card className="scientific-glow border-border/50">
            <CardHeader>
              <CardTitle>Download Format</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleDownload("pdf")}
                  disabled={downloadStatus === "downloading"}
                  className="h-auto p-6 flex-col gap-3 bg-transparent hover:bg-primary/5"
                >
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <div className="font-semibold">PDF Report</div>
                    <div className="text-sm text-muted-foreground">
                      Complete formatted report with images and charts
                    </div>
                  </div>
                  {downloadStatus === "downloading" && selectedFormat === "pdf" && (
                    <div className="text-xs text-primary">Generating PDF...</div>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleDownload("csv")}
                  disabled={downloadStatus === "downloading"}
                  className="h-auto p-6 flex-col gap-3 bg-transparent hover:bg-primary/5"
                >
                  <Table className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <div className="font-semibold">CSV Data</div>
                    <div className="text-sm text-muted-foreground">Raw data for further analysis and processing</div>
                  </div>
                  {downloadStatus === "downloading" && selectedFormat === "csv" && (
                    <div className="text-xs text-primary">Preparing CSV...</div>
                  )}
                </Button>
              </div>

              {downloadStatus === "downloading" && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-primary animate-pulse" />
                    <div>
                      <p className="font-medium text-primary">Preparing your download...</p>
                      <p className="text-sm text-muted-foreground">
                        Compiling {reportSections.filter((s) => s.included).length} sections into{" "}
                        {selectedFormat.toUpperCase()} format
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Report Preview */}
          <Card className="scientific-glow border-border/50">
            <CardHeader>
              <CardTitle>Report Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="font-medium">Your report will include:</div>
                <ul className="space-y-1 text-muted-foreground">
                  {reportSections
                    .filter((section) => section.included)
                    .map((section) => (
                      <li key={section.id} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {section.label}
                      </li>
                    ))}
                </ul>
                {reportSections.filter((section) => section.included).length === 0 && (
                  <p className="text-muted-foreground italic">No sections selected</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
