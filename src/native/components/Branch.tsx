import React from 'react'
import { View, Text, Pressable } from 'react-native'
import type { EmploymentEntry } from '../types.js'
import { Entry } from './Entry.js'
import { EmploymentTimelineStyles } from '../EmploymentTimeline.styles.js'

export interface BranchProps {
  entry: EmploymentEntry
  /** ASCII prefix: "├─ " or "│  └─ " etc. */
  asciiPrefix: string
  /** Current job → green highlight */
  isActive?: boolean
  /** Show details inline */
  expanded?: boolean
  onPress?: () => void
  /** Long-press opens full details (e.g. modal) */
  onLongPress?: () => void
}

export function Branch({
  entry,
  asciiPrefix,
  isActive = false,
  expanded = false,
  onPress,
  onLongPress,
}: BranchProps) {
  return (
    <View style={EmploymentTimelineStyles.asciiRow}>
      <Text style={EmploymentTimelineStyles.ascii}>{asciiPrefix}</Text>
      <Pressable
        style={({ pressed }) => [
          EmploymentTimelineStyles.branch,
          isActive && EmploymentTimelineStyles.branchActive,
          pressed && EmploymentTimelineStyles.branchPressed,
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
        accessibilityRole="button"
        accessibilityLabel={`${entry.company}, ${entry.role}. ${entry.period}.`}
        accessibilityState={{ expanded }}
      >
        <Entry
          entry={entry}
          isActive={isActive}
          expanded={expanded}
        />
      </Pressable>
    </View>
  )
}
