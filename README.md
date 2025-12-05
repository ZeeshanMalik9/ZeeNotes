# Zee Notes 🚀

**Zee Notes** is a modern, interactive web development learning platform designed to make mastering complex concepts like React.js engaging and effective. It features a sleek UI, real-time progress tracking, interactive code blocks, and a gamified learning experience.

## ✨ Key Features

- **Interactive Learning**:
  - **Code Blocks**: Syntax-highlighted code snippets for easy reading.
  - **Diagrams**: Mermaid.js integration for visualizing concepts.
  - **Interview Prep**: Dedicated section with accordion-style Q&A and tips.
- **Progress Tracking**:
  - **Local Persistence**: Your progress (completed topics, interview questions) is saved automatically to your browser's local storage.
  - **Visual Indicators**: Green checkmarks and progress bars show your journey.
  - **Gamification**: "Congratulations" confetti popup upon course completion.
- **Mobile Optimized**:
  - **Responsive Design**: Fully functional on all screen sizes.
  - **Mobile Navigation**: Smooth drawer menu and floating sidebar for easy access to topics.
- **Real-time Analytics**:
  - **Live Users**: See how many others are learning with you (requires Firebase config).
  - **Total Visits**: Track community growth.
- **Modern UI/UX**:
  - **Dark/Light Mode**: Toggle between themes.
  - **Animations**: Smooth page transitions and element reveals using Framer Motion.
  - **Glassmorphism**: Premium aesthetic with blurred backgrounds and gradients.

## 🛠️ Tech Stack & Libraries

This project is built with a robust stack of modern web technologies. Here's what we used and why:

### Core Framework

- **[React](https://react.dev/) (v18)**: The library for web and native user interfaces. Used for its component-based architecture and efficient state management.
- **[Vite](https://vitejs.dev/)**: Next Generation Frontend Tooling. Used for lightning-fast development server and optimized builds.

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework. Used for rapid UI development and consistent design systems.
- **[Framer Motion](https://www.framer.com/motion/)**: A production-ready motion library for React. Used for:
  - Page transition animations.
  - Mobile drawer slide-ins.
  - The revolving "Loading Screen" animation.
  - Interactive card tilts on the home page.
- **[React Icons](https://react-icons.github.io/react-icons/)**: Include popular icons in your React projects easily. Used for UI elements like the hamburger menu, checkmarks, and social logos.
- **[Lucide React](https://lucide.dev/)**: Beautiful & consistent icon toolkit. Used for specific UI components.

### Navigation & Routing

- **[React Router DOM](https://reactrouter.com/)**: Declarative routing for React. Used to handle navigation between Home, Topic Pages, and Interview Prep without page reloads (SPA).

### Functionality & Logic

- **[React Confetti](https://github.com/alampros/react-confetti)**: Confetti for React. Used to create the celebration effect when a user finishes a course.
- **[React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)**: Syntax highlighting component for React. Used to display code snippets beautifully.
- **[Mermaid](https://mermaid.js.org/)**: Generation of diagram and flowchart from text in a similar manner as markdown. Used to render dynamic diagrams for technical concepts.
- **[React Use](https://github.com/streamich/react-use)**: Collection of essential React Hooks. Used for utility hooks like `useWindowSize` (for confetti).
- **[Firebase](https://firebase.google.com/)**: Google's mobile platform. Used for the Real-time Database to track live user presence and total visits.

## 🚀 Getting Started

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/zee-notes.git
    cd zee-notes
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## 📁 Project Structure

- `src/components`: Reusable UI components (Navbar, Footer, Layout, etc.).
- `src/pages`: Main page views (Home, TopicPage, InterviewPrep).
- `src/hooks`: Custom hooks (useCourseProgress, usePresence).
- `src/data.js`: Course content and curriculum data.
- `src/lib`: Configuration files (Firebase).

## 🤝 Contact

Connect with the creator:

- **LinkedIn**: [Zeeshan Malik](https://www.linkedin.com/in/zeeshanmalik9/)
- **Email**: [zeeshan.m9990@gmail.com](mailto:zeeshan.m9990@gmail.com)

---

Made with ❤️ by **Zee Notes Team**
