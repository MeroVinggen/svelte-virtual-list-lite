# Changelog

## v1.2.0

### Added
- `alwaysRerender` prop (default `true`): re-renders on every `items` update, including same-ref arrays mutated in place and re-set (e.g. `store.set(sameArr)`). Also makes `onRender` and `rendered()` fire on each update.
- `overrideResetScroll(value)` / `restoreResetScroll()`: skip the scroll-to-top reset for a single update without toggling `resetScrollOnItemsChange`.

### Fixed
- Items added or removed in a same-ref array were not rendered when the length changed.
- `triggerUpdate()` now re-renders even when the item count is unchanged.
- Toggling `resetScrollOnItemsChange` no longer re-runs the items sync effect.

### Changed
- Version bump no longer happens implicitly on every `items` change; it is controlled by `alwaysRerender`.
- README updated with new props, methods and a scroll-preserving example.
  
## v1.1.0
- Added `triggerUpdate()` method for manual re-render after in-place `items` mutation
- Added `onRender` callback prop, fired after data-driven re-renders (scroll excluded)
- Added `rendered()` - awaitable promise resolving after the next data-driven re-render
- Fixed scroll clamping in `scrollToIndex` (internal scrollTop could desync from actual DOM scroll on small lists)
