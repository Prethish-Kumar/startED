# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**startED-app** is an Expo React Native cross-platform mobile application (iOS, Android, Web) built with TypeScript. It uses Expo Router v6 for file-based routing.

## Development Commands

```bash
# Start development server
npm start

# Platform-specific development
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser

# Linting
npm run lint
```

## Architecture

### File-Based Routing
The app uses Expo Router's file-based routing system. Screens are defined in the `app/` directory:
- `app/_layout.tsx` - Root layout with splash screen logic
- `app/index.tsx` - Home screen

### Splash Screen
The root layout (`app/_layout.tsx`) implements a custom splash screen with a 2-second delay before hiding. Key implementation details:
- `SplashScreen.preventAutoHideAsync()` is called at module level
- A 2-second timeout runs in a useEffect before setting `isReady` to true
- `SplashScreen.hide()` is called when `isReady` becomes true
- Returns `null` while loading, `<Stack />` when ready

### Configuration Files

**app.json** - Main Expo configuration:
- New Architecture enabled (`newArchEnabled: true`)
- Experiments: typed routes and React Compiler enabled
- Custom splash screen configuration with light/dark mode backgrounds
- Portrait orientation locked
- Deep linking scheme: `startedapp://`

**tsconfig.json** - TypeScript configuration:
- Strict mode enabled
- Path alias: `@/*` maps to project root

### Project State

This is a minimal Expo project template that has been cleaned up. The original starter components, hooks, and constants have been removed, leaving a bare foundation for custom development.

### Dependencies Note

The package.json references `scripts/reset-project.js` which has been deleted. Do not use `npm run reset-project` as it will fail.

## Key Technologies

- **Expo SDK 54** - Core framework
- **Expo Router 6** - File-based routing (Stack navigation)
- **React 19.1.0** - UI library
- **React Native 0.81.5** - Mobile framework
- **TypeScript 5.9** - Type safety
