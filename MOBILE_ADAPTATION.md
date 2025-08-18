# Mobile Adaptation Support

This document describes the mobile adaptation features implemented for the xtools application.

## Changes Made

### 1. Main App Layout (_app.tsx)
- Changed from fixed width (1180px) to responsive width: `{ xs: '100%', md: '1180px' }`
- Added responsive padding: `px: { xs: 1, md: 0 }`
- Changed layout direction from fixed 'row' to responsive: `direction={{ xs: 'column', md: 'row' }}`
- Hide sidebar on mobile devices: `{!isMobile && <SideBar />}`
- Added mobile navigation component for home page: `{isMobile && path === '/home' && <MobileNavigation />}`

### 2. Header Component (layouts/Header/index.tsx)
- Added mobile detection using `useMobileView()` hook
- Responsive header layout with flexWrap: `flexWrap: { xs: 'wrap', md: 'nowrap' }`
- Shortened title on mobile: "百川工具箱" vs "百川在线工具箱"
- Responsive search bar:
  - Full-width search on desktop (381px)
  - Flexible search bar on mobile that takes remaining space
  - Hide "工具不够？提个需求" link on mobile to save space

### 3. MainContent Component (components/MainContent/index.tsx)
- Responsive padding: `px: { xs: 2, md: '50px' }`
- Responsive border radius: `borderRadius: { xs: 0, md: '8px' }`
- Conditional box shadow: remove shadow on mobile for cleaner look

### 4. Mobile Navigation Component (components/MobileNavigation/index.tsx)
- NEW: Floating menu button positioned at top-right
- Side drawer navigation for accessing tool categories on mobile
- Categories displayed with icons and labels
- Automatically closes when category is selected
- Only shows on home page and mobile devices

### 5. Home Page (pages/home.tsx)
- Responsive padding: `p: { xs: 2, md: 3 }`
- Responsive border radius: `borderRadius: { xs: 0, md: 2 }`
- Conditional box shadow: remove on mobile

### 6. Diff Page (pages/diff.tsx)
- Responsive input layout: `direction={{ xs: 'column', md: 'row' }}`
- Force unified diff view on mobile: `splitView={isMobile ? false : !!+alignment}`

## Responsive Breakpoints

The application uses Material-UI's default breakpoints:
- xs: 0px and up (mobile)
- sm: 600px and up 
- md: 900px and up (desktop)

## Mobile Features

1. **Navigation**: Floating menu button provides access to tool categories
2. **Search**: Full-width search bar for easy tool discovery
3. **Layout**: Stacked layout instead of side-by-side for better mobile viewing
4. **Content**: Reduced padding and margins for optimal mobile space usage
5. **Typography**: Shorter titles where appropriate to fit mobile screens

## Testing

To test the mobile adaptation:
1. Open the application in a browser
2. Use browser dev tools to simulate mobile devices
3. Verify responsive behavior at different screen sizes
4. Test navigation using the mobile menu on small screens
5. Check that all tools remain functional on mobile devices