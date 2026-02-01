/**
 * Mock data: CV download. Replace with API later.
 * Graceful fallback if file missing.
 */

export const CV_FILENAME = 'shahzad_ahmad_cv.pdf'

/** Path to CV in public/. Used for download link. */
export function getCvDownloadPath(): string {
  return `/${CV_FILENAME}`
}
