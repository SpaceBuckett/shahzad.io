# React Native Employment Timeline

GitHub-branch style experience timeline with a terminal CLI look. Uses the same data shape as the web portfolio (`EmploymentEntry`).

## Usage (React Native app)

1. **Install React Native** in your project if needed:
   ```bash
   npx react-native init MyApp
   ```

2. **Copy this folder** (`src/native`) into your RN app, or add this repo as a dependency and import from it.

3. **Use the component:**
   ```tsx
   import { EmploymentTimeline } from './native' // or your path
   import { getEmployment } from './model/mock/employment' // or your API

   function ExperienceScreen() {
     const data = getEmployment() // or useState + useEffect for API
     return (
       <EmploymentTimeline
         data={data}
         order="newest-first"
         showLegend
         virtualized={data.length > 10}
         initialNumToRender={10}
       />
     )
   }
   ```

## Data structure

Each entry must match `EmploymentEntry`:

- `id`, `role`, `company`, `period`, `description`
- Optional: `startDate` (YYYY-MM), `endDate` (YYYY-MM or `'present'`), `employmentType`, `location`, `highlights[]`

Data can be static or from an API; the component is optimized for large lists via `virtualized` + `FlatList`.

## Components

| Component | Role |
|-----------|------|
| **EmploymentTimeline** | Main container: ScrollView or FlatList, expand/collapse, modal details. |
| **Timeline** | Renders ASCII tree (├─, │, └─) and a list of branches. |
| **Branch** | Single job row: ASCII prefix + Entry, press to expand, long-press for modal. |
| **Entry** | Role, company, period, optional description/highlights. |
| **Legend** | Optional legend (active = green, company = blue, tech = yellow). |

## Interactions

- **Tap a branch:** Expand/collapse description and highlights inline.
- **Long-press a branch:** Open full details in a modal.
- **Scroll:** Vertical scroll (or virtualized list for 10+ entries).

## Styling

- `EmploymentTimeline.styles.ts` uses `StyleSheet.create` and exports `colors`. Override by wrapping in a provider or passing custom styles if you extend the components.
- Terminal colors: dark background (#121212), white/light gray text, green for active role, blue for company, yellow for highlights, light gray for branch lines.

## Accessibility

- Branch rows are focusable and expose role/company/period to screen readers.
- Expand/collapse state is announced via `accessibilityState.expanded`.
- Sufficient contrast for text and focus indicators.

## Performance

- Use `virtualized={true}` and `initialNumToRender={10}` when you have more than ~10 entries to use `FlatList` and avoid rendering all rows at once.
- Data is sorted once per `data` change and memoized; active (current) job is derived from `endDate === 'present'`.

## Testing

- **Unit:** Render `EmploymentTimeline` with a small `data` array; assert branch count, expanded state, and modal open/close.
- **Overlapping periods:** Pass entries with overlapping `startDate`/`endDate`; branches should still render in order (newest-first or oldest-first) without overlap in the list.
- **Large list:** Use 15+ entries with `virtualized={true}` and confirm only a subset of items mount (e.g. via FlatList behavior).
