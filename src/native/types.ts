/**
 * Employment entry shape for React Native EmploymentTimeline.
 * Matches src/model types so the same mock/API data can be used.
 */

export interface EmploymentEntry {
  id: string
  role: string
  company: string
  period: string
  description: string
  employmentType?: string
  location?: string
  highlights?: string[]
  startDate?: string
  endDate?: string
}
