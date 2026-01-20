import { FlavourSwitchHero } from '../../components/flavourswitch-hero'
import { FlavourSwitchOverview } from '../../components/flavourswitch-overview'
import { FlavourSwitchInstallation } from '../../components/flavourswitch-installation'
import { FlavourSwitchUsage } from '../../components/flavourswitch-usage'
import { FlavourSwitchFeatures } from '../../components/flavourswitch-features'
import { FlavourSwitchDocumentation } from '../../components/flavourswitch-documentation'

export const metadata = {
  title: '🍭 FlavourSwitch - Ultimate QuickShell Theme Manager',
  description: 'Seamlessly switch between QuickShell configurations with style! Powerful CLI tool for managing multiple QuickShell themes with instant switching, intelligent keybind management, and beautiful QML interface.',
}

export default function FlavourSwitchPage() {
  return (
    <>
      <FlavourSwitchHero />
      <FlavourSwitchOverview />
      <FlavourSwitchInstallation />
      <FlavourSwitchUsage />
      <FlavourSwitchFeatures />
      <FlavourSwitchDocumentation />
    </>
  )
}