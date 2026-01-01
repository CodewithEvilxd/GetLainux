'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code?: string
  tabs?: Array<{ name: string; code: string }>
}

export function CodeBlock({ code, tabs }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(tabs ? tabs[0].name : '')
  const [copied, setCopied] = useState(false)

  const currentCode = tabs
    ? tabs.find((tab) => tab.name === activeTab)?.code || ''
    : code || ''

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      {tabs && (
        <div className="flex gap-1 bg-muted p-1 rounded-t-lg border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.name
                  ? 'bg-background text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      )}

      <div className="relative bg-muted rounded-lg overflow-hidden">
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-game">{currentCode}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-md bg-background border border-border hover:bg-accent transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  )
}

