# Changelog

## v1.1.0
- Added `triggerUpdate()` method for manual re-render after in-place `items` mutation
- Added `onRender` callback prop, fired after data-driven re-renders (scroll excluded)
- Added `rendered()` - awaitable promise resolving after the next data-driven re-render
- Fixed scroll clamping in `scrollToIndex` (internal scrollTop could desync from actual DOM scroll on small lists)
