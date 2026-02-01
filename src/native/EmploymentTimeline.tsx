import React, { useCallback, useMemo, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
  type ListRenderItem,
} from 'react-native'
import type { EmploymentEntry } from './types.js'
import { Timeline } from './components/Timeline.js'
import { Branch } from './components/Branch.js'
import { Entry } from './components/Entry.js'
import { Legend } from './components/Legend.js'
import { EmploymentTimelineStyles } from './EmploymentTimeline.styles.js'

/** Entry is "active" (current) if endDate is present. */
function getActiveId(entries: EmploymentEntry[]): string | null {
  const current = entries.find(
    (e) => e.endDate?.toLowerCase() === 'present'
  )
  return current?.id ?? null
}

export interface EmploymentTimelineProps {
  /** Employment entries (chronological order; will be shown newest-first by default). */
  data: EmploymentEntry[]
  /** Order: newest-first (branch from current) or oldest-first. */
  order?: 'newest-first' | 'oldest-first'
  /** Show legend at bottom. */
  showLegend?: boolean
  /** Use FlatList for virtualization when true (recommended for 10+ entries). */
  virtualized?: boolean
  /** Initial number of items when virtualized (rest load on scroll). */
  initialNumToRender?: number
}

export function EmploymentTimeline({
  data,
  order = 'newest-first',
  showLegend = true,
  virtualized = false,
  initialNumToRender = 10,
}: EmploymentTimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState(-1)
  const [modalEntry, setModalEntry] = useState<EmploymentEntry | null>(null)

  const sorted = useMemo(() => {
    const withDates = data.filter((e) => e.startDate != null)
    return [...withDates].sort((a, b) => {
      const ma = parseMonth(a.startDate)
      const mb = parseMonth(b.startDate)
      return order === 'newest-first' ? mb - ma : ma - mb
    })
  }, [data, order])

  const activeId = useMemo(() => getActiveId(sorted), [sorted])

  const handleBranchPress = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? -1 : index))
  }, [])

  const handleBranchLongPress = useCallback((entry: EmploymentEntry) => {
    setModalEntry(entry)
  }, [])

  const closeModal = useCallback(() => {
    setModalEntry(null)
  }, [])

  if (virtualized && sorted.length > initialNumToRender) {
    const getAsciiPrefix = (index: number, total: number) => {
      if (total === 1) return '└─ '
      if (index === 0) return '├─ '
      if (index === total - 1) return '│  └─ '
      return '│  ├─ '
    }
    const renderItem: ListRenderItem<EmploymentEntry> = ({ item, index }) => (
      <Branch
        entry={item}
        asciiPrefix={getAsciiPrefix(index, sorted.length)}
        isActive={activeId === item.id}
        expanded={expandedIndex === index}
        onPress={() => handleBranchPress(index)}
        onLongPress={() => setModalEntry(item)}
      />
    )
    return (
      <View style={EmploymentTimelineStyles.container}>
        <FlatList
          data={sorted}
          keyExtractor={(item) => item.id}
          style={EmploymentTimelineStyles.list}
          contentContainerStyle={EmploymentTimelineStyles.listContent}
          initialNumToRender={initialNumToRender}
          renderItem={renderItem}
          ListFooterComponent={showLegend ? <Legend /> : null}
        />
        <DetailModal entry={modalEntry} onClose={closeModal} />
      </View>
    )
  }

  return (
    <View style={EmploymentTimelineStyles.container}>
      <ScrollView
        style={EmploymentTimelineStyles.list}
        contentContainerStyle={EmploymentTimelineStyles.listContent}
        showsVerticalScrollIndicator
        accessibilityLabel="Experience timeline"
      >
        <Timeline
          entries={sorted}
          expandedIndex={expandedIndex}
          onBranchPress={handleBranchPress}
          onBranchLongPress={(entry) => setModalEntry(entry)}
          activeId={activeId}
        />
        {showLegend && <Legend />}
      </ScrollView>
      <DetailModal entry={modalEntry} onClose={closeModal} />
    </View>
  )
}

function parseMonth(s: string | undefined): number {
  if (!s || s.toLowerCase() === 'present') return 999912
  const [y, m] = s.split('-').map(Number)
  if (Number.isNaN(y) || Number.isNaN(m)) return 0
  return y * 100 + m
}

interface DetailModalProps {
  entry: EmploymentEntry | null
  onClose: () => void
}

function DetailModal({ entry, onClose }: DetailModalProps) {
  if (!entry) return null
  return (
    <Modal
      visible={!!entry}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={EmploymentTimelineStyles.modalOverlay} onPress={onClose}>
        <Pressable
          style={EmploymentTimelineStyles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          <Pressable style={EmploymentTimelineStyles.modalClose} onPress={onClose}>
            <Text style={EmploymentTimelineStyles.modalCloseText}>Close</Text>
          </Pressable>
          <ScrollView style={EmploymentTimelineStyles.modalScroll}>
            <Entry entry={entry} isActive={entry.endDate?.toLowerCase() === 'present'} expanded />
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
