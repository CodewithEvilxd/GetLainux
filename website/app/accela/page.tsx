import { NexusHero } from '@/components/nexus-hero'
import { NexusFeatures } from '@/components/nexus-features'
import { NexusInstallation } from '@/components/nexus-installation'
import { NexusDocumentation } from '@/components/nexus-documentation'

export const metadata = {
  title: 'Nexus Engine | GetLainux Ecosystem',
  description: 'High-performance system execution engine with Protocol language. Bridge between kernel and system automation.',
}

export default function NexusPage() {
  return (
    <>
      <NexusHero />
      <NexusFeatures />
      <NexusInstallation />
      <NexusDocumentation />
    </>
  )
}

