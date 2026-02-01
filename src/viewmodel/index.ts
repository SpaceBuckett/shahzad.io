/**
 * ViewModel layer public API.
 */

export {
  parseCommand,
  getSuggestions,
  getNextAutocomplete,
  getSingleSuggestion,
} from './commandEngine.js'
export type { ParsedCommand } from './commandEngine.js'
export { useTerminalVM } from './useTerminalVM.js'
export type {
  TerminalVMState,
  TerminalVMHandlers,
  OutputLine,
} from './useTerminalVM.js'
export { useEasterEgg } from './useEasterEgg.js'
