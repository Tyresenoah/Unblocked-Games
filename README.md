# Unblocked Games Hub 🎮

A sleek, modern, and responsive unblocked games portal built with React and Tailwind CSS.

## 🚀 Deployment to GitHub Pages

To host this website on GitHub Pages, you need to build the project first and then deploy the `dist` folder.

### Option 1: Automatic Deployment (Recommended)

1.  **Install the gh-pages package:**
    ```bash
    npm install gh-pages --save-dev
    ```
2.  **Add deployment scripts to `package.json`:**
    ```json
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```
3.  **Run the deploy command:**
    ```bash
    npm run deploy
    ```

### Option 2: Manual Deployment

1.  **Build the project:**
    ```bash
    npm run build
    ```
2.  **Upload the contents of the `dist` folder** to your GitHub repository's `gh-pages` branch or a specific folder (like `docs`) and configure GitHub Pages to serve from there.

## 🛠 Features

- **Search & Filter:** Find games by title or category.
- **Immersive Player:** Play games in a dedicated iframe view.
- **Responsive:** Works on mobile, tablet, and desktop.
- **JSON-based Library:** Easily add new games by editing `src/data/games.json`.

## 📝 Adding New Games

To add a new game, simply edit `src/data/games.json` and add a new entry:

```json
{
  "id": "game-id",
  "title": "Game Title",
  "description": "Short description of the game.",
  "category": "Category Name",
  "thumbnail": "URL to thumbnail image",
  "iframeUrl": "URL to the game's iframe source"
}
```
