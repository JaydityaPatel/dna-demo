"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Loader2, ArrowLeft, Microscope, Dna } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface AnalysisStep {
  id: string
  label: string
  description: string
  duration: number
}

const analysisSteps: AnalysisStep[] = [
  {
    id: "blast",
    label: "BLAST Sequence Alignment",
    description: "Comparing against NCBI database for sequence matches",
    duration: 4000,
  },
  {
    id: "clustal",
    label: "Clustal Omega Analysis",
    description: "Multiple sequence alignment and phylogenetic analysis",
    duration: 5000,
  },
  {
    id: "taxonomy",
    label: "Taxonomic Classification",
    description: "Identifying species and building family relationships",
    duration: 3000,
  },
  {
    id: "images",
    label: "Biological Data Retrieval",
    description: "Fetching organism images and ecological information",
    duration: 2000,
  },
]

export default function AnalysisPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isPaused) return

    const processStep = (stepIndex: number) => {
      if (stepIndex >= analysisSteps.length) {
        setIsComplete(true)
        setProgress(100)
        return
      }

      const step = analysisSteps[stepIndex]
      const stepProgress = (stepIndex / analysisSteps.length) * 100
      const nextStepProgress = ((stepIndex + 1) / analysisSteps.length) * 100

      setCurrentStep(stepIndex)

      const startTime = Date.now()
      const animate = () => {
        if (isPaused) return

        const elapsed = Date.now() - startTime
        const stepProgressPercent = Math.min(elapsed / step.duration, 1)
        const currentProgress = stepProgress + (nextStepProgress - stepProgress) * stepProgressPercent

        setProgress(currentProgress)

        if (stepProgressPercent < 1) {
          requestAnimationFrame(animate)
        } else {
          setTimeout(() => {
            if (!isPaused) {
              processStep(stepIndex + 1)
            }
          }, 800)
        }
      }

      animate()
    }

    const timer = setTimeout(() => {
      processStep(0)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isPaused])

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setProgress(0)
    setIsComplete(false)
    setIsPaused(false)
  }

  const handleViewResults = () => {
    router.push("/results")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/processing">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Processing
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Sequence Analysis</h1>
            <p className="text-muted-foreground">Advanced bioinformatics analysis in progress</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="scientific-glow border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isComplete ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <Microscope className="h-6 w-6 text-primary dna-animation" />
                )}
                {isComplete ? "Analysis Complete" : "Running Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Analysis Progress</span>
                  <span className="font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              {/* Analysis Steps */}
              <div className="space-y-4">
                {analysisSteps.map((step, index) => {
                  const isCurrentStep = index === currentStep && !isComplete
                  const isCompletedStep = index < currentStep || isComplete
                  const isPendingStep = index > currentStep && !isComplete

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                        isCurrentStep
                          ? "border-primary bg-primary/5"
                          : isCompletedStep
                            ? "border-green-500/20 bg-green-500/5"
                            : "border-border bg-card/50"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {isCompletedStep ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : isCurrentStep ? (
                          <Loader2 className="h-6 w-6 text-primary animate-spin" />
                        ) : (
                          <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/30" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${isCurrentStep ? "text-primary" : ""}`}>{step.label}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Current Status */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Dna className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    {isComplete
                      ? "Analysis complete! Your sequence has been identified and biological data has been compiled."
                      : isPaused
                        ? "Analysis paused. Click resume to continue."
                        : `Currently running ${analysisSteps[currentStep]?.label.toLowerCase()}...`}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <div className="flex gap-2">
                  {!isComplete && (
                    <Button variant="outline" onClick={handlePause}>
                      {isPaused ? "Resume" : "Pause"}
                    </Button>
                  )}
                  {!isComplete && (
                    <Button variant="outline" onClick={handleRestart}>
                      Restart
                    </Button>
                  )}
                </div>
                {isComplete && (
                  <Button size="lg" onClick={handleViewResults} className="scientific-glow">
                    View Results
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Visualization */}
          {!isComplete && (
            <div className="mt-8 p-6 bg-card/30 rounded-2xl border border-border/50 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="flex justify-center items-center gap-4 text-2xl font-mono">
                  <span className="text-primary animate-pulse">BLAST</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-accent animate-pulse" style={{ animationDelay: "500ms" }}>
                    ALIGN
                  </span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-primary animate-pulse" style={{ animationDelay: "1000ms" }}>
                    CLASSIFY
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Aligning sequences and identifying related sequences using advanced bioinformatics algorithms
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
