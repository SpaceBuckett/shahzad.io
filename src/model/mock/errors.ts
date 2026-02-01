/**
 * Mock messages for terminal errors. Replace with API later.
 * Terminal-native, graceful. No sarcasm, no memes.
 */

export function getUnknownCommandMessage(input: string): string {
  if (input === '') {
    return 'command not found. Type help for options.'
  }
  return `${input}: command not found. Type help for options.`
}
