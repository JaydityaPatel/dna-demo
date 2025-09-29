"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Loader2, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ProcessingStep {
  id: string
  label: string
  description: string
  duration: number // in milliseconds
}

const processingSteps: ProcessingStep[] = [
  {
    id: "validate",
    label: "Validating Sequence",
    description: "Checking file format and sequence integrity",
    duration: 2000,
  },
  {
    id: "prepare",
    label: "Preparing Data",
    description: "Formatting sequences for analysis pipeline",
    duration: 3000,
  },
  {
    id: "ready",
    label: "Ready for Analysis",
    description: "Initializing bioinformatics algorithms",
    duration: 1500,
  },
]

export default function ProcessingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isCancelled) return

    const processStep = (stepIndex: number) => {
      if (stepIndex >= processingSteps.length) {
        setIsComplete(true)
        setProgress(100)
        return
      }

      const step = processingSteps[stepIndex]
      const stepProgress = (stepIndex / processingSteps.length) * 100
      const nextStepProgress = ((stepIndex + 1) / processingSteps.length) * 100

      setCurrentStep(stepIndex)

      // Animate progress for current step
      const startTime = Date.now()
      const animate = () => {
        if (isCancelled) return

        const elapsed = Date.now() - startTime
        const stepProgressPercent = Math.min(elapsed / step.duration, 1)
        const currentProgress = stepProgress + (nextStepProgress - stepProgress) * stepProgressPercent

        setProgress(currentProgress)

        if (stepProgressPercent < 1) {
          requestAnimationFrame(animate)
        } else {
          // Move to next step after a brief pause
          setTimeout(() => {
            if (!isCancelled) {
              processStep(stepIndex + 1)
            }
          }, 500)
        }
      }

      animate()
    }

    // Start processing after a brief delay
    const timer = setTimeout(() => {
      processStep(0)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isCancelled])

  const handleCancel = () => {
    setIsCancelled(true)
    router.push("/upload")
  }

  const handleContinue = () => {
    router.push("/analysis")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/upload">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Upload
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Processing Data</h1>
            <p className="text-muted-foreground">Preparing your DNA sequence for analysis</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="scientific-glow border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isComplete ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : isCancelled ? (
                  <AlertCircle className="h-6 w-6 text-destructive" />
                ) : (
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                )}
                {isComplete ? "Processing Complete" : isCancelled ? "Processing Cancelled" : "Processing in Progress"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              {/* Processing Steps */}
              <div className="space-y-4">
                {processingSteps.map((step, index) => {
                  const isCurrentStep = index === currentStep && !isComplete && !isCancelled
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
              {!isCancelled && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-center text-muted-foreground">
                    {isComplete
                      ? "Your sequence has been successfully processed and is ready for analysis."
                      : `Currently ${processingSteps[currentStep]?.label.toLowerCase()}...`}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                {!isComplete && !isCancelled && (
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel Processing
                  </Button>
                )}
                {isComplete && (
                  <Button size="lg" onClick={handleContinue} className="scientific-glow ml-auto">
                    Continue to Analysis
                  </Button>
                )}
                {isCancelled && (
                  <Button variant="outline" onClick={() => router.push("/upload")} className="ml-auto">
                    Return to Upload
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Processing Animation */}
          {!isComplete && !isCancelled && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "400ms" }} />
                </div>
                <span className="text-sm">Processing your sequence data</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
