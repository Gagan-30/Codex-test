# Oaxaca ARMS - Waiter Console

A modern React-based restaurant management application for waiters to manage menu items, pricing, and availability in real-time.

![Oaxaca ARMS Waiter Console](https://github.com/user-attachments/assets/9b23550f-b0e9-4ec8-8c21-352c12522357)

## Features

- **Menu Management**: Add, edit, and organize menu items
- **Real-time Updates**: Changes reflect instantly in the interface
- **Availability Toggle**: Mark items as available or unavailable
- **Price Management**: Update pricing in GBP currency
- **Category Organization**: Group items by categories (Tacos, Sides, Bowls, etc.)
- **Item Reordering**: Use arrow buttons to reorder menu items
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Bootstrap 5** - CSS framework for styling

## Prerequisites

Before running the site, make sure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Gagan-30/Codex-test.git
cd Codex-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The site will automatically open in your default browser at `http://localhost:3000/`.

If it doesn't open automatically, you can manually navigate to:
```
http://localhost:3000/
```

## Available Scripts

- `npm run dev` - Start the development server (with hot reload)
- `npm run build` - Build the production-ready application
- `npm run preview` - Preview the production build locally

## Project Structure

```
Codex-test/
├── src/
│   ├── App.tsx                    # Main application component
│   ├── index.tsx                  # Application entry point
│   ├── styles.css                 # Custom styles
│   └── components/
│       └── WaiterMenuPage.tsx    # Menu management page component
├── index.html                     # HTML template
├── package.json                   # Project dependencies
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── README.md                      # This file
```

## Usage

### Adding a New Menu Item

1. Fill in the "Item name" field (e.g., "Spicy shrimp taco")
2. Enter the "Price (GBP)" (e.g., "9.50")
3. Specify the "Category" (e.g., "Tacos")
4. Check/uncheck "Available on menu" as needed
5. Click "Add item"

### Editing an Item

1. Click the "Edit" button on any menu item
2. Modify the fields in the form
3. Click "Save changes"

### Managing Availability

Click the "Available"/"Unavailable" button on any item to toggle its availability status.

### Reordering Items

Use the ↑ and ↓ arrow buttons to move items up or down in the list.

## Browser Compatibility

The application works best on modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development

The application uses:
- **Vite** for fast development and hot module replacement
- **TypeScript** for type checking
- **React Hot Reload** for instant updates during development

## Production Build

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist/` directory, ready for deployment.

To preview the production build locally:

```bash
npm run preview
```

## Troubleshooting

### Port already in use
If port 3000 is already in use, Vite will automatically try the next available port (3001, 3002, etc.).

### Dependencies not installing
Try clearing the npm cache:
```bash
npm cache clean --force
npm install
```

### Build errors
Make sure you have the correct Node.js version:
```bash
node --version  # Should be v16 or higher
```

## License

This project is open source and available for educational purposes.

## Contributing

Feel free to open issues or submit pull requests for improvements.
