'use client'

import React, { createContext, use } from 'react'

export type SidebarTabsContextType = {
  /** The slug of the currently active tab. */
  activeTabId: string
  /**
   * Reload the content for a specific tab, bypassing the cache.
   * Useful when the tab's data dependencies change.
   */
  reloadTabContent: (tabSlug: string) => void
}

const SidebarTabsContext = createContext<null | SidebarTabsContextType>(null)

export type SidebarTabsProviderProps = {
  activeTabId: string
  children: React.ReactNode
  reloadTabContent: (tabSlug: string) => void
}

export const SidebarTabsProvider: React.FC<SidebarTabsProviderProps> = ({
  activeTabId,
  children,
  reloadTabContent,
}) => {
  return (
    <SidebarTabsContext value={{ activeTabId, reloadTabContent }}>{children}</SidebarTabsContext>
  )
}

/**
 * Hook to access sidebar tab controls.
 * Returns null if used outside of a SidebarTabsProvider (e.g., when there's only one tab).
 */
export const useSidebarTabs = (): null | SidebarTabsContextType => {
  return use(SidebarTabsContext)
}
