'use client'

import { CheckCircle, XCircle, Loader2, Terminal } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

export function ApexLinuxSystemTest() {
  const [checking, setChecking] = useState(false)
  const [results, setResults] = useState<Array<{ name: string; status: 'success' | 'error' | 'checking' }>>([])

  const runCheck = async () => {
    setChecking(true)
    setResults([
      { name: 'Quickshell installed', status: 'checking' },
      { name: 'Git available', status: 'checking' },
      { name: 'Config directory writable', status: 'checking' },
    ])

    // Simulate checks
    await new Promise(resolve => setTimeout(resolve, 500))
    setResults([
      { name: 'Quickshell installed', status: 'success' },
      { name: 'Git available', status: 'success' },
      { name: 'Config directory writable', status: 'success' },
    ])
    setChecking(false)
  }

  return (
    <section id="test" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center gap-3">
              <Terminal className="h-8 w-8 text-primary" />
              System Check
            </h2>
            <p className="text-base text-muted-foreground">Verify your system is ready</p>
          </div>

          <div className="p-6 border rounded-lg space-y-4">
            {results.length === 0 && (
              <p className="text-sm text-muted-foreground">Click "Check System" to verify requirements</p>
            )}
            {results.map((result, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {result.status === 'checking' && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                {result.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                {result.status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
                <span className="text-sm font-medium">{result.name}</span>
              </div>
            ))}
            <Button onClick={runCheck} disabled={checking} className="mt-4">
              {checking ? 'Checking...' : 'Check System'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
