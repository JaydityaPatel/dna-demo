"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TreePine, ZoomIn, ZoomOut, RotateCcw, Loader2, ChevronLeft, ChevronsLeft } from "lucide-react"
import type React from "react"

interface TreeNode {
  id: string
  name: string
  scientificName?: string
  commonName?: string
  alignmentScore?: number
  confidence?: number
  x: number
  y: number
  children: TreeNode[]
  collapsed: boolean
  isUserSequence?: boolean
  taxonomicLevel?: string
  hasExpandButton?: boolean
}

const fishTreeData: TreeNode = {
  id: "root",
  name: "Root",
  x: 150,
  y: 400,
  children: [
    {
      id: "zebrafish",
      name: "zebrafish",
      scientificName: "Danio rerio",
      commonName: "Zebrafish",
      alignmentScore: 98.7,
      confidence: 99.2,
      x: 400,
      y: 150,
      collapsed: false,
      children: [],
      isUserSequence: true,
      taxonomicLevel: "Species",
    },
    {
      id: "branch1",
      name: "",
      x: 250,
      y: 200,
      collapsed: false,
      hasExpandButton: true,
      children: [
        {
          id: "danio-aesculapii",
          name: "Danio aesculapii",
          scientificName: "Danio aesculapii",
          alignmentScore: 89.3,
          confidence: 95.1,
          x: 400,
          y: 250,
          collapsed: false,
          children: [],
          taxonomicLevel: "Species",
        },
      ],
    },
    {
      id: "branch2",
      name: "",
      x: 250,
      y: 350,
      collapsed: false,
      hasExpandButton: true,
      children: [
        {
          id: "japanese-medaka",
          name: "Japanese medaka",
          scientificName: "Oryzias latipes",
          alignmentScore: 85.7,
          confidence: 92.4,
          x: 550,
          y: 250,
          collapsed: false,
          children: [],
          taxonomicLevel: "Species",
        },
        {
          id: "branch3",
          name: "",
          x: 450,
          y: 300,
          collapsed: false,
          hasExpandButton: true,
          children: [
            {
              id: "amazon-molly",
              name: "Amazon molly",
              scientificName: "Poecilia formosa",
              alignmentScore: 82.1,
              confidence: 88.3,
              x: 650,
              y: 300,
              collapsed: false,
              children: [],
              taxonomicLevel: "Species",
            },
          ],
        },
        {
          id: "branch4",
          name: "",
          x: 450,
          y: 350,
          collapsed: false,
          hasExpandButton: true,
          children: [
            {
              id: "nile-tilapia",
              name: "Nile tilapia",
              scientificName: "Oreochromis niloticus",
              alignmentScore: 78.9,
              confidence: 85.7,
              x: 550,
              y: 400,
              collapsed: false,
              children: [],
              taxonomicLevel: "Species",
            },
            {
              id: "branch5",
              name: "",
              x: 550,
              y: 350,
              collapsed: false,
              hasExpandButton: true,
              children: [
                {
                  id: "guppy",
                  name: "guppy",
                  scientificName: "Poecilia reticulata",
                  alignmentScore: 75.4,
                  confidence: 82.1,
                  x: 650,
                  y: 400,
                  collapsed: false,
                  children: [],
                  taxonomicLevel: "Species",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "branch6",
      name: "",
      x: 250,
      y: 450,
      collapsed: false,
      hasExpandButton: true,
      children: [
        {
          id: "torafugu",
          name: "torafugu",
          scientificName: "Takifugu rubripes",
          alignmentScore: 72.1,
          confidence: 79.8,
          x: 400,
          y: 450,
          collapsed: false,
          children: [],
          taxonomicLevel: "Species",
        },
        {
          id: "tongue-sole",
          name: "tongue sole",
          scientificName: "Cynoglossus semilaevis",
          alignmentScore: 69.7,
          confidence: 76.5,
          x: 400,
          y: 500,
          collapsed: false,
          children: [],
          taxonomicLevel: "Species",
        },
      ],
    },
    {
      id: "branch7",
      name: "",
      x: 250,
      y: 600,
      collapsed: false,
      hasExpandButton: true,
      children: [
        {
          id: "branch8",
          name: "",
          x: 350,
          y: 650,
          collapsed: false,
          hasExpandButton: true,
          children: [
            {
              id: "cutthroat-trout",
              name: "cutthroat trout",
              scientificName: "Oncorhynchus clarkii",
              alignmentScore: 65.4,
              confidence: 73.2,
              x: 450,
              y: 700,
              collapsed: false,
              children: [],
              taxonomicLevel: "Species",
            },
            {
              id: "atlantic-salmon",
              name: "Atlantic salmon",
              scientificName: "Salmo salar",
              alignmentScore: 62.8,
              confidence: 70.1,
              x: 450,
              y: 750,
              collapsed: false,
              children: [],
              taxonomicLevel: "Species",
            },
          ],
        },
      ],
    },
  ],
  collapsed: false,
}

export function PhylogeneticTree() {
  const [treeData, setTreeData] = useState<TreeNode>(fishTreeData)
  const [isLoading, setIsLoading] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<TreeNode | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // Simulate loading time for tree generation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleNodeClick = (node: TreeNode) => {
    if (node.children.length > 0) {
      const updatedTree = { ...treeData }
      const targetNode = findNodeById(updatedTree, node.id)
      if (targetNode) {
        targetNode.collapsed = !targetNode.collapsed
        setTreeData(updatedTree)
      }
    }
    setSelectedNode(node)
  }

  const findNodeById = (node: TreeNode, id: string): TreeNode | null => {
    if (node.id === id) return node
    for (const child of node.children) {
      const found = findNodeById(child, id)
      if (found) return found
    }
    return null
  }

  const renderConnections = (node: TreeNode): React.JSX.Element[] => {
    const connections: React.JSX.Element[] = []

    if (!node.collapsed && node.children.length > 0) {
      node.children.forEach((child) => {
        // Create smooth curved path between nodes
        const startX = node.x * zoom
        const startY = node.y * zoom
        const endX = child.x * zoom
        const endY = child.y * zoom

        // Calculate control points for smooth curves
        const midX = (startX + endX) / 2
        const midY = (startY + endY) / 2
        const controlX1 = startX + (midX - startX) * 0.7
        const controlY1 = startY
        const controlX2 = endX - (endX - midX) * 0.7
        const controlY2 = endY

        connections.push(
          <path
            key={`connection-${node.id}-${child.id}`}
            d={`M ${startX} ${startY} C ${controlX1} ${controlY1} ${controlX2} ${controlY2} ${endX} ${endY}`}
            stroke="hsl(142, 71%, 45%)"
            strokeWidth={child.isUserSequence ? 4 : 3}
            fill="none"
            className="transition-all duration-300"
          />,
        )
      })
    }

    // Recursively render connections for children
    node.children.forEach((child) => {
      connections.push(...renderConnections(child))
    })

    return connections
  }

  const renderNode = (node: TreeNode): React.JSX.Element[] => {
    const elements: React.JSX.Element[] = []

    // Skip rendering empty branch nodes that are just for structure
    if (!node.name && !node.hasExpandButton) {
      node.children.forEach((child) => {
        elements.push(...renderNode(child))
      })
      return elements
    }

    const nodeRadius = node.isUserSequence ? 25 : 20
    const nodeColor = node.isUserSequence ? "hsl(var(--links))" : "hsl(142, 71%, 45%)" // Blue for user sequence, green for others

    // Node circle
    if (node.name || node.hasExpandButton) {
      elements.push(
        <circle
          key={`node-${node.id}`}
          cx={node.x * zoom}
          cy={node.y * zoom}
          r={nodeRadius * zoom}
          fill={node.hasExpandButton ? "hsl(var(--background))" : nodeColor}
          stroke={node.hasExpandButton ? "hsl(142, 71%, 45%)" : "hsl(var(--background))"}
          strokeWidth={2}
          className="cursor-pointer transition-all duration-200 hover:stroke-primary hover:stroke-4"
          onClick={() => handleNodeClick(node)}
          onMouseEnter={() => setHoveredNode(node)}
          onMouseLeave={() => setHoveredNode(null)}
        />,
      )
    }

    // Fish icon for species nodes
    if (node.name && !node.hasExpandButton) {
      elements.push(
        <text
          key={`icon-${node.id}`}
          x={node.x * zoom}
          y={node.y * zoom + 3 * zoom}
          fontSize={14 * zoom}
          textAnchor="middle"
          className="pointer-events-none select-none"
        >
          🐟
        </text>,
      )
    }

    // Expand/collapse indicator for branch nodes
    if (node.hasExpandButton) {
      elements.push(
        <text
          key={`expand-icon-${node.id}`}
          x={node.x * zoom}
          y={node.y * zoom + 4 * zoom}
          fontSize={16 * zoom}
          textAnchor="middle"
          fill="white"
          className="pointer-events-none select-none font-bold"
        >
          {node.collapsed ? "+" : "+"}
        </text>,
      )
    }

    // Node label for species
    if (node.name && !node.hasExpandButton) {
      elements.push(
        <text
          key={`label-${node.id}`}
          x={node.x * zoom + 35 * zoom}
          y={node.y * zoom + 5 * zoom}
          fontSize={14 * zoom}
          fill="white"
          className="pointer-events-none select-none font-medium"
        >
          {node.name}
        </text>,
      )
    }

    // Render children
    if (!node.collapsed) {
      node.children.forEach((child) => {
        elements.push(...renderNode(child))
      })
    }

    return elements
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.2, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.2, 0.5))
  const handleReset = () => setZoom(1)

  if (isLoading) {
    return (
      <Card className="scientific-glow border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TreePine className="h-5 w-5 text-primary" />
            Phylogenetic Tree of Related Sequences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96 bg-muted/20 rounded-lg">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Generating phylogenetic tree...</p>
                <p className="text-xs text-muted-foreground">Analyzing evolutionary relationships between sequences</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="scientific-glow border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TreePine className="h-5 w-5 text-primary" />
          Phylogenetic Tree of Related Sequences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-links"></div>
                <span className="text-xs text-white">Your sequence</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(142, 71%, 45%)" }}></div>
                <span className="text-xs text-white">Related sequences</span>
              </div>
            </div>
          </div>

          {/* Tree Visualization */}
          <div className="relative bg-muted/20 rounded-lg overflow-hidden" style={{ height: "600px" }}>
            <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 800 800" className="cursor-move">
              {/* Render connections first (behind nodes) */}
              {renderConnections(treeData)}
              {/* Render nodes */}
              {renderNode(treeData)}
            </svg>

            {/* Hover tooltip */}
            {hoveredNode && hoveredNode.name && (
              <div className="absolute top-4 right-4 bg-background/95 border border-border rounded-lg p-3 shadow-lg max-w-xs">
                <div className="space-y-2">
                  <div className="font-medium text-sm">{hoveredNode.scientificName || hoveredNode.name}</div>
                  {hoveredNode.commonName && (
                    <div className="text-xs text-muted-foreground">{hoveredNode.commonName}</div>
                  )}
                  {hoveredNode.taxonomicLevel && (
                    <Badge variant="secondary" className="text-xs">
                      {hoveredNode.taxonomicLevel}
                    </Badge>
                  )}
                  {hoveredNode.alignmentScore && (
                    <div className="text-xs">
                      <span className="text-muted-foreground">Alignment: </span>
                      <span className="font-medium">{hoveredNode.alignmentScore}%</span>
                    </div>
                  )}
                  {hoveredNode.confidence && (
                    <div className="text-xs">
                      <span className="text-muted-foreground">Confidence: </span>
                      <span className="font-medium">{hoveredNode.confidence}%</span>
                    </div>
                  )}
                  {hoveredNode.isUserSequence && (
                    <Badge variant="default" className="text-xs">
                      Your Sequence
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="text-xs text-white space-y-1">
            <p>• Click + symbols to expand or collapse branches</p>
            <p>• Hover over nodes to see detailed taxonomic information</p>
            <p>• Use zoom controls to explore different taxonomic levels</p>
            <p>• Your sequence (zebrafish) is highlighted in blue</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
