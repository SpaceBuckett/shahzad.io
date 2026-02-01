import React from 'react'
import { View } from 'react-native'
import type { EmploymentEntry } from '../types.js'
import { Branch } from './Branch.js'

export interface TimelineProps {
  entries: EmploymentEntry[]
  /** Index of the expanded branch (-1 = none) */
  expandedIndex: number
  /** Callback when a branch is pressed */
  onBranchPress: (index: number) => void
  /** Callback when a branch is long-pressed (e.g. open modal) */
  onBranchLongPress?: (entry: EmploymentEntry, index: number) => void
  /** Which entry is "active" (current job): id or index */
  activeId?: string | null
}

/**
 * Renders ASCII-tree branches (├─, │, └─) with Branch components.
 * Order: newest first (branch from current).
 */
export function Timeline({
  entries,
  expandedIndex,
  onBranchPress,
  onBranchLongPress,
  activeId = null,
}: TimelineProps) {
  return (
    <View>
      {entries.map((entry, index) => {
        const isFirst = index === 0
        const isLast = index === entries.length - 1
        let prefix = '├─ '
        if (entries.length === 1) prefix = '└─ '
        else if (isFirst) prefix = '├─ '
        else if (isLast) prefix = '│  └─ '
        else prefix = '│  ├─ '

        const isActive = activeId != null && (activeId === entry.id || activeId === String(index))

        return (
          <Branch
            key={entry.id}
            entry={entry}
            asciiPrefix={prefix}
            isActive={isActive}
            expanded={expandedIndex === index}
            onPress={() => onBranchPress(index)}
            onLongPress={onBranchLongPress ? () => onBranchLongPress(entry, index) : undefined}
          />
        )
      })}
    </View>
  )
}
