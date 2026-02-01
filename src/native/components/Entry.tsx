import React from 'react'
import { View, Text } from 'react-native'
import type { EmploymentEntry } from '../types.js'
import { formatPeriod } from '../utils/formatPeriod.js'
import { EmploymentTimelineStyles } from '../EmploymentTimeline.styles.js'

export interface EntryProps {
  entry: EmploymentEntry
  /** Active (current) position → green role */
  isActive?: boolean
  /** Show full description and highlights */
  expanded?: boolean
}

export function Entry({ entry, isActive = false, expanded = false }: EntryProps) {
  const periodStr = formatPeriod(entry.startDate, entry.endDate)
  const locationLine = [entry.employmentType, entry.location].filter(Boolean).join(' · ')

  return (
    <View>
      <Text
        style={[
          EmploymentTimelineStyles.role,
          isActive && EmploymentTimelineStyles.roleActive,
        ]}
        numberOfLines={2}
      >
        {entry.role}
      </Text>
      <Text style={EmploymentTimelineStyles.company} numberOfLines={1}>
        {entry.company}
      </Text>
      <Text style={EmploymentTimelineStyles.period}>
        {periodStr}
        {locationLine ? ` · ${locationLine}` : ''}
      </Text>
      {expanded && (
        <View style={EmploymentTimelineStyles.expandedSection}>
          {entry.description ? (
            <Text style={EmploymentTimelineStyles.description}>
              {entry.description}
            </Text>
          ) : null}
          {entry.highlights?.map((h, i) => (
            <Text key={i} style={EmploymentTimelineStyles.highlight}>
              ▸ {h}
            </Text>
          ))}
        </View>
      )}
    </View>
  )
}
