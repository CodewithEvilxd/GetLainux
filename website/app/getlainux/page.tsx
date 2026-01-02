import { Hero } from '@/components/hero'
import { Overview } from '@/components/overview'
import { Installation } from '@/components/installation'
import { Usage } from '@/components/usage'
import { Features } from '@/components/features'
import { SystemTest } from '@/components/system-test'
import { TerminalEnv } from '@/components/terminal-env'
import { Documentation } from '@/components/documentation'

export const metadata = {
  title: 'GetLainux - Minimal Linux Distribution',
  description: 'A minimal Linux distribution built on Arch Linux. For developers who want control, not convenience.',
}

export default function GetLainuxPage() {
  return (
    <>
      <Hero />
      <Overview />
      <Installation />
      <Usage />
      <Features />
      <TerminalEnv />
      <SystemTest />
      <Documentation />
    </>
  )
}

