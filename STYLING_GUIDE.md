# Styling Guide for SkillSwapHub

## 📋 Overview

This project uses a **hybrid CSS architecture** combining:
- **Global CSS** for shared styles and common components
- **Page-Specific CSS** for unique page layouts and components
- **Tailwind CSS** with `@apply` directive for consistent utility usage

---

## 🏗️ Architecture

### File Structure
```
frontend/src/styles/
├── global.css           # Shared styles (buttons, cards, utilities)
├── browse.css          # Browse page specific styles
├── dashboard.css       # Dashboard page specific styles
└── [page-name].css     # Other page-specific styles
```

---

## 📖 Usage Pattern

### In React Components

Every React page component should import **both** the global CSS and its page-specific CSS:

```jsx
import React from 'react';
import '../styles/global.css';      // ✅ Always import global styles
import '../styles/browse.css';      // ✅ Import page-specific styles

const BrowsePage = () => {
  return (
    <div className="browse-container">
      <h1 className="page-title">Browse</h1>
      <button className="btn-primary">Click Me</button>
    </div>
  );
};
```

---

## 🎨 Global CSS (`global.css`)

### What Belongs Here?
- **Base resets** and body styles
- **Custom scrollbar** styling
- **Utility classes**: `.glass`, `.gradient-primary`, `.text-gradient`
- **Common components** used across multiple pages:
  - Buttons: `.btn-primary`, `.btn-secondary`, `.btn-outline`
  - Inputs: `.input-field`
  - Cards: `.card`
  - Badges: `.badge-common`, `.badge-rare`, `.badge-epic`, `.badge-legendary`

### Example Classes

#### Buttons
```css
.btn-primary {
  @apply px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition;
}
```

#### Cards
```css
.card {
  @apply bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300;
}
```

#### Utilities
```css
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

---

## 📄 Page-Specific CSS

### What Belongs Here?
- **Layout containers** specific to a page
- **Custom components** used only on that page
- **Page-specific variations** of common patterns

### Naming Convention
Use a prefix that matches the page name:

#### Browse Page (`browse.css`)
```css
.browse-container { }
.browse-filter-card { }
.user-card { }          /* Used only in browse */
.user-grid { }          /* Used only in browse */
```

#### Dashboard Page (`dashboard.css`)
```css
.dashboard-container { }
.dashboard-nav { }
.dashboard-stat-card { }
.dashboard-activity-list { }
```

---

## 🔧 Creating New Page Styles

### Step 1: Create CSS File
Create a new file: `src/styles/[page-name].css`

```css
/* [Page Name] Page Specific Styles */

.[page-name]-container {
  @apply flex-1 px-12 py-8;
}

.[page-name]-header {
  @apply text-3xl font-bold text-gray-900 mb-6;
}

/* Add more page-specific classes */
```

### Step 2: Import in Component
```jsx
import '../styles/global.css';
import '../styles/[page-name].css';
```

### Step 3: Use Classes
```jsx
<div className="[page-name]-container">
  <h1 className="[page-name]-header">Title</h1>
  <button className="btn-primary">Shared Button</button>
</div>
```

---

## ✅ Best Practices

### DO:
✅ Import `global.css` in **every** page component  
✅ Create page-specific CSS for unique layouts  
✅ Use semantic class names (`.user-card`, not `.card1`)  
✅ Use `@apply` with Tailwind utilities for consistency  
✅ Keep common components (buttons, inputs) in `global.css`  

### DON'T:
❌ Use inline Tailwind classes (`className="flex px-4 py-2 bg-blue-600"`)  
❌ Duplicate common styles in page-specific files  
❌ Put page-specific styles in `global.css`  
❌ Mix inline styles with CSS classes  

---

## 🎯 Example: Complete Page Setup

### 1. Create Page Component
**File**: `src/pages/ProfilePage.jsx`
```jsx
import React from 'react';
import '../styles/global.css';
import '../styles/profile.css';

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="page-title">My Profile</h1>
      </div>
      
      <div className="card">
        <h2>About Me</h2>
        <p>Bio content...</p>
      </div>
      
      <button className="btn-primary">Save Changes</button>
    </div>
  );
};

export default ProfilePage;
```

### 2. Create Page Styles
**File**: `src/styles/profile.css`
```css
/* Profile Page Specific Styles */

.profile-container {
  @apply flex-1 ml-80 px-12 py-8 bg-gray-50;
}

.profile-header {
  @apply mb-8 flex items-center justify-between;
}

.page-title {
  @apply text-3xl font-bold text-gray-900;
}

/* Page-specific variations */
.profile-avatar {
  @apply w-32 h-32 rounded-full border-4 border-white shadow-lg;
}

.profile-stats-grid {
  @apply grid grid-cols-4 gap-6 mb-8;
}
```

---

## 🔍 Troubleshooting

### "@apply unknown at rule" Lint Errors
These are **false positives** from the CSS linter. Tailwind correctly processes `@apply` at build time. You can:
- Ignore these warnings (they won't affect functionality)
- Install Tailwind CSS IntelliSense extension for VS Code

### Styles Not Applying
1. Check if both `global.css` and page-specific CSS are imported
2. Verify class names match exactly (case-sensitive)
3. Check browser console for CSS loading errors
4. Clear browser cache and restart dev server

### Class Name Conflicts
- Use page-specific prefixes (`.browse-*`, `.dashboard-*`)
- Avoid generic names like `.container`, `.header`
- Check `global.css` for existing class names before creating new ones

---

## 📚 Reference

### Current Page-Specific CSS Files
- ✅ `browse.css` - Browse/listings page
- ✅ `dashboard.css` - Dashboard/analytics page
- ⏳ `profile.css` - User profile page (to be created)
- ⏳ `matches.css` - Matches page (to be created)
- ⏳ `resources.css` - Resources page (to be created)

### Global Components Available
- `.btn-primary`, `.btn-secondary`, `.btn-outline`
- `.input-field`
- `.card`
- `.badge-common`, `.badge-rare`, `.badge-epic`, `.badge-legendary`
- `.glass`, `.gradient-primary`, `.gradient-secondary`, `.text-gradient`

---

## 🎉 Summary

1. **Global CSS** = Shared styles used everywhere
2. **Page CSS** = Unique styles for each page
3. **Import both** in every component
4. **Use classes**, not inline Tailwind
5. **Prefix page-specific** classes with page name

Happy styling! 🚀
