import { LainuxCyberHero } from '@/components/lainux-cyber-hero'
import { LainuxCyberFeatures } from '@/components/lainux-cyber-features'
import { LainuxCyberScreenshots } from '@/components/lainux-cyber-screenshots'
import { LainuxCyberWallpapers } from '@/components/lainux-cyber-wallpapers'
import { LainuxCyberInstallation } from '@/components/lainux-cyber-installation'
import { LainuxCyberDocumentation } from '@/components/lainux-cyber-documentation'

export const metadata = {
  title: 'Lainux Cyber - KDE Plasma Theme',
  description: 'Complete KDE Plasma 6 desktop theme with cyberpunk aesthetics. Cyan-dominant palette optimized for OLED displays with 17 custom wallpapers.',
}

export default function LainuxCyberThemePage() {
  return (
    <>
      <LainuxCyberHero />
      <LainuxCyberFeatures />
      <LainuxCyberScreenshots />
      <LainuxCyberWallpapers />
      <LainuxCyberInstallation />
      <LainuxCyberDocumentation />
    </>
  )
}

