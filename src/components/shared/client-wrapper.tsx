'use client'

import React, { ReactNode } from 'react'
import { useInitAnimations } from '@/components/hooks/use-init-animations'

export default function ClientWrapper({ children }: { children: ReactNode }) {
  useInitAnimations()
  return <>{children}</>
}
