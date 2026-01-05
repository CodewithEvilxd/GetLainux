import { ApexLinuxHero } from '@/components/apexlinux-hero'
import { ApexLinuxOverview } from '@/components/apexlinux-overview'
import { ApexLinuxInstallation } from '@/components/apexlinux-installation'
import { ApexLinuxUsage } from '@/components/apexlinux-usage'
import { ApexLinuxFeatures } from '@/components/apexlinux-features'
import { ApexLinuxSecurityFeatures } from '@/components/apexlinux-security-features'
import { ApexLinuxSystemTest } from '@/components/apexlinux-system-test'
import { ApexLinuxTerminalEnv } from '@/components/apexlinux-terminal-env'
import { ApexLinuxDocumentation } from '@/components/apexlinux-documentation'

export const metadata = {
  title: 'ApexLinux - QML Shell for Linux',
  description: 'Minimal, customizable QML-based shell for Linux built with Quickshell.',
}

export default function ApexLinuxPage() {
  return (
    <>
      <ApexLinuxHero />
      <ApexLinuxOverview />
      <ApexLinuxInstallation />
      <ApexLinuxUsage />
      <ApexLinuxFeatures />
      <ApexLinuxSecurityFeatures />
      <ApexLinuxTerminalEnv />
      <ApexLinuxSystemTest />
      <ApexLinuxDocumentation />
    </>
  )
}

