/**
 * Terminal-style styles for EmploymentTimeline (React Native).
 * Dark theme: white/light gray text, green for active, blue for company/role, yellow for tech.
 */

import { StyleSheet } from 'react-native'

export const colors = {
  background: '#121212',
  text: '#e8e8e8',
  textDim: '#b0b0b0',
  branchLine: '#808080',
  active: '#7cfc00',
  company: '#5eb8ff',
  highlight: '#ffeb3b',
  border: '#333333',
  modalOverlay: 'rgba(0,0,0,0.6)',
}

export const EmploymentTimelineStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  list: {
    flexGrow: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  asciiRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    minHeight: 44,
  },
  ascii: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.branchLine,
    width: 28,
    marginRight: 8,
  },
  branch: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 10,
  },
  branchActive: {
    borderColor: colors.active,
  },
  branchPressed: {
    opacity: 0.9,
  },
  role: {
    fontFamily: 'monospace',
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  roleActive: {
    color: colors.active,
  },
  company: {
    fontFamily: 'monospace',
    fontSize: 15,
    color: colors.company,
    marginBottom: 2,
  },
  period: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: colors.textDim,
    marginBottom: 4,
  },
  description: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: colors.text,
    lineHeight: 20,
    marginTop: 6,
  },
  highlight: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: colors.highlight,
    lineHeight: 18,
    marginTop: 2,
    paddingLeft: 12,
  },
  expandedSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: colors.textDim,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    maxWidth: 400,
    width: '100%',
    maxHeight: '80%',
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalClose: {
    alignSelf: 'flex-end',
    padding: 4,
    marginBottom: 8,
  },
  modalCloseText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.company,
  },
})
