# Restaurant POS Frontend

This is the frontend application for the Restaurant POS (Point of Sale) and Back Office System, built with React and Vite.

## 🚀 Quick Start

1.  **Install Dependencies**
    ```bash
    cd ros/frontend
    pnpm install
    ```

2.  **Configure Environment**
    Create a `.env` file based on `.env.example` and fill in your Supabase credentials.
    ```bash
    cp .env.example .env
    # Edit .env with your keys
    ```

3.  **Run Development Server**
    ```bash
    pnpm run dev
    ```

4.  **Build for Production**
    ```bash
    pnpm run build
    ```

## 📦 Project Structure

-   `src/`: Main source code
    -   `components/`: Reusable React components (Dashboard, POS, Inventory, etc.)
    -   `App.jsx`: Main application layout and routing logic
    -   `App.css`: Global styles (including Tailwind directives)
-   `public/`: Static assets
-   `index.html`: Main HTML file
-   `vite.config.js`: Vite configuration
-   `tailwind.config.js`: Tailwind CSS configuration
-   `.env.example`: Example environment variables
