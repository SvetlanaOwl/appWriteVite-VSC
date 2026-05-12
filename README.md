# Install vite
npm create vite@latest
# Start project in development
npm run dev
# Install Tailwind
npm install -D tailwindcss postcss autoprefixer
# Create Tailwind config files:
# tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {},
  },
  darkMode: "class",
};
# postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
# Add tailwind to style.css 
@import "tailwindcss";
# import in main.js
import "./style.css";
# If error related to postcss reinstall postcss
npm install -D @tailwindcss/postcss
# Install appwrite node package
npm install node-appwrite