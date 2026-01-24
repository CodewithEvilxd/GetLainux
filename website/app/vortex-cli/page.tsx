import { VortexCliHero } from '../../components/vortex-cli-hero'
import { VortexCliOverview } from '../../components/vortex-cli-overview'
import { VortexCliInstallation } from '../../components/vortex-cli-installation'
import { VortexCliUsage } from '../../components/vortex-cli-usage'
import { VortexCliFeatures } from '../../components/vortex-cli-features'
import { VortexCliTerminal } from '../../components/vortex-cli-terminal'
import { VortexCliDocumentation } from '../../components/vortex-cli-documentation'

export const metadata = {
  title: 'Vortex CLI - Lightning-Fast YouTube Browser for Terminal',
  description: 'A powerful, lightning-fast YouTube browser for your terminal. Browse, stream, and download YouTube content without leaving your command line with beautiful previews and fuzzy search.',
}

export default function VortexCliPage() {
  return (
    <>
      <VortexCliHero />
      <VortexCliOverview />
      <VortexCliInstallation />
      <VortexCliUsage />
      <VortexCliFeatures />
      <VortexCliTerminal />
      <VortexCliDocumentation />
    </>
  )
}