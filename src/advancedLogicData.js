export const advancedLogicData = [
  {
    id: 'forms-in-react',
    title: 'Forms in React',
    blocks: [
      {
        type: 'theory',
        title: 'Controlled vs Uncontrolled: The Deep Dive',
        content: `**Controlled Components**: React is the dictator.
The input's value is *always* driven by \`state\`.
*Flow*: User types 'A' -> \`onChange\` fires -> \`setState('A')\` -> Re-render -> Input displays 'A'.
*Pros*: Instant validation, conditional disabling, input masking.
*Cons*: Re-renders on every keystroke (perf hit on massive forms).

**Uncontrolled Components**: The DOM is the dictator.
The input holds its own state. React reads it only when needed (e.g., on submit) using a \`ref\`.
*Pros*: Performance (no re-renders while typing), easy integration with non-React code.
*Cons*: Harder to do instant validation.`
      },
      {
        type: 'example',
        title: 'Analogy: The Micromanager',
        content: `**Controlled**: A boss who watches every single keystroke you type and corrects it immediately. (High control, high overhead).
        
**Uncontrolled**: A boss who lets you write the whole report and only reads it when you hand it in. (Low control, low overhead).`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Controlled Input with Validation',
        code: `const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manual Validation
    if (!email.includes('@')) {
      setError('Invalid email address');
      return;
    }
    console.log('Submitted:', email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input 
        value={email} // Controlled by State
        onChange={(e) => {
          setEmail(e.target.value);
          setError(''); // Clear error on change
        }}
        className={error ? 'border-red-500' : 'border-gray-300'}
      />
      {error && <span className="text-red-500">{error}</span>}
      <button type="submit">Login</button>
    </form>
  );
};`
      },
      {
        type: 'theory',
        title: 'Industry Standard: React Hook Form',
        content: `While manual validation is good for learning, complex forms (nested fields, async validation) are hard to manage manually.
        
**React Hook Form** is the industry standard library. It uses *uncontrolled* components under the hood for performance (fewer re-renders) but provides an easy API to handle validation and submission.`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What is the main advantage of Controlled Components?",
        answer: "Controlled components allow instant validation (as the user types), conditional disabling of buttons, and enforcing input formats (e.g., credit card spacing). The state is the single source of truth, making the UI predictable.",
        tips: "Instant Feedback & Single Source of Truth."
      },
      {
        id: 2,
        question: "When would you use an Uncontrolled Component?",
        answer: "Uncontrolled components are useful for integrating with non-React libraries (like D3 or jQuery plugins) or for simple forms where you don't need instant validation and want to minimize re-renders.",
        tips: "Integration & Performance."
      },
      {
        id: 3,
        question: "How do you handle multiple inputs with one handler?",
        answer: "You can give each input a `name` attribute and use a single `onChange` handler that updates the state object dynamically: `setState(prev => ({ ...prev, [e.target.name]: e.target.value }))`.",
        tips: "Computed Property Names."
      }
    ]
  },
  {
    id: 'context-api',
    title: 'The Context API',
    blocks: [
      {
        type: 'theory',
        title: 'Dependency Injection',
        content: `**Context** is React's version of **Dependency Injection**.
        
It allows you to define data (Theme, User, Locale) at the top of your app and "inject" it into any component that needs it, without passing it through every intermediate layer.

**The Performance Cost**
Context is NOT a high-performance state management tool.
*Rule*: If the Context Value changes (by reference), **EVERY** component consuming that context will re-render.
*Optimization*: Split contexts! Don't put \`user\` and \`theme\` in the same context if they change at different rates.`
      },
      {
        type: 'example',
        title: 'Analogy: The PA System',
        content: `**Props** are like **Passing a Note** in class. You pass it to Alice, who passes it to Bob, who passes it to Charlie.
        
**Context** is like the Principal speaking on the **PA System**. Everyone in the school (App) can hear the message instantly without passing notes.`
      },
      {
        type: 'diagram',
        title: 'Prop Drilling vs Context',
        definition: `graph TD
    subgraph Prop Drilling Waterfall
    A[App] -->|Props| B[Layout]
    B -->|Props| C[Header]
    C -->|Props| D[UserInfo]
    D -->|Props| E[Avatar]
    end
    
    subgraph Context Teleport
    Ctx[Context Provider] -.->|Direct Access| Avatar[Avatar Component]
    Ctx -.->|Direct Access| Sidebar[Sidebar Component]
    end`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Theme Context Example',
        code: `import { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext();

// 2. Create Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Consume Context (Custom Hook)
export const useTheme = () => useContext(ThemeContext);

// Usage
const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "When should you NOT use Context?",
        answer: "Context should not be used for high-frequency updates (like mouse coordinates or a timer) because updating the Context triggers a re-render in ALL consuming components. For rapidly changing state, local state or libraries like Redux/Zustand (with selectors) are better.",
        tips: "Performance: High-frequency updates."
      },
      {
        id: 2,
        question: "Does Context replace Redux?",
        answer: "Not entirely. Context is a dependency injection mechanism, not a state management library. It doesn't have built-in async handling, middleware, or devtools. For complex global state with frequent updates, Redux or Zustand is preferred. Context is best for static/low-frequency global data like Theme, User, or Locale.",
        tips: "Dependency Injection vs State Management."
      },
      {
        id: 3,
        question: "What happens if you use useContext outside a Provider?",
        answer: "It returns the `defaultValue` passed to `createContext(defaultValue)`. If no default value was provided, it returns `undefined`, which often leads to crashes if you try to destructure properties from it.",
        tips: "Default Value importance."
      }
    ]
  },
  {
    id: 'portals',
    title: 'Portals',
    blocks: [
      {
        type: 'theory',
        title: 'Portals: Teleporting DOM Nodes',
        content: `**The Problem**: CSS Stacking Contexts.
If you have a Modal inside a \`div\` with \`overflow: hidden\` or \`z-index: 1\`, your Modal will be clipped or appear behind other elements, no matter how high you set its z-index.

**The Solution (Portals)**:
React Portals allow you to render a component's HTML output into a completely different part of the DOM (usually \`document.body\`), while keeping it logically connected in the React Component Tree.
*Key Feature*: Events still bubble up! A click in the Portal (at \`body\`) will bubble up to the React Parent component.`
      },
      {
        type: 'example',
        title: 'Analogy: The Projector',
        content: `Think of a **Portal** as a **Projector**.
        
The Projector (Component) sits on a table in the back of the room (Component Tree).
But the Image (DOM Output) appears on the big screen at the front of the room (document.body).
        
Even though the image is far away, if you wave your hand in front of the projector lens (Event), it affects the image.`
      },
      {
        type: 'diagram',
        title: 'Portal DOM Structure',
        definition: `graph TD
    subgraph React Tree
    App --> ModalComponent
    end
    
    subgraph Real DOM
    Body[body] --> Root[div id=root]
    Root --> AppDiv[App Div]
    AppDiv --> Button[Open Modal Button]
    
    Body --> PortalRoot[div id=portal]
    PortalRoot --> ModalDiv[Modal Content]
    end
    
    ModalComponent -.->|Renders into| ModalDiv`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Modal with Portal',
        code: `import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="overlay">
      <div className="modal-content">
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </div>,
    document.body // Target DOM node
  );
};`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "Do events bubble up through Portals?",
        answer: "Yes! Even though the portal renders HTML outside the parent DOM node, the React Event Tree remains intact. An event fired inside a Portal will still bubble up to its React parent component, allowing you to handle clicks or key presses in the parent.",
        tips: "React Tree vs DOM Tree."
      },
      {
        id: 2,
        question: "Why use a Portal for a Modal instead of just high z-index?",
        answer: "If a parent element has `overflow: hidden` or `z-index` stacking contexts, a child Modal might get clipped or appear behind other elements regardless of its own z-index. Portals avoid this by physically moving the Modal to the root of the document.",
        tips: "CSS Stacking Contexts."
      },
      {
        id: 3,
        question: "Can you use Context inside a Portal?",
        answer: "Yes. Since the Portal is still part of the React component tree, it has access to all Contexts provided by its ancestors, just like any normal child component.",
        tips: "Context flows through the React Tree."
      }
    ]
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    blocks: [
      {
        type: 'theory',
        title: 'Code Splitting',
        content: `By default, React bundles all your code into one huge JS file.
        
**Code Splitting** breaks this bundle into smaller chunks that are loaded only when needed (Lazy Loading). This speeds up the initial page load.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'React.lazy & Suspense',
        code: `import React, { Suspense } from 'react';

// Lazy load the component
const HeavyChart = React.lazy(() => import('./HeavyChart'));

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Show fallback while loading */}
      <Suspense fallback={<div>Loading Chart...</div>}>
        <HeavyChart />
      </Suspense>
    </div>
  );
};`
      },
      {
        type: 'theory',
        title: 'Referential Equality: The Root Cause',
        content: `React is fast because it compares objects by reference (shallow comparison).
        
**The Problem**: In JavaScript, \`{}\` is not equal to \`{}\`.
Every time a parent component re-renders, it creates **new** functions and objects.
If you pass these "new" props to a child, the child thinks the data changed and re-renders too.

**The Solution**:
1.  **React.memo**: Tells the child: "Only re-render if props actually changed".
2.  **useCallback**: Tells the parent: "Keep this function stable (same address in memory) between renders".
3.  **useMemo**: Tells the parent: "Keep this object/array stable".`
      },
      {
        type: 'example',
        title: 'Analogy: The ID Card',
        content: `**React.memo** is a **Security Guard** at a club.
        
You try to enter. The guard checks your ID.
If your ID is exactly the same as last time (Referential Equality), he waves you through immediately (No Re-render).
        
If you changed your shirt (New Object Reference), even if it's the same style, the guard stops you to check everything again (Re-render).`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'The "Broken Memo" Trap',
        code: `// ❌ BAD: 'handleClick' is a NEW function every render
// <Child /> will re-render even if wrapped in React.memo!
const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => console.log('Clicked');

  return <Child onClick={handleClick} />;
};

// ✅ GOOD: 'handleClick' is stable
const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => console.log('Clicked'), []);

  return <Child onClick={handleClick} />;
};`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'useMemo & useCallback',
        code: `const ExpensiveList = ({ items, onItemClick }) => {
  console.log('List Rendered');
  return <ul>...</ul>;
};
// Prevent re-render if props are same
const MemoizedList = React.memo(ExpensiveList);

const Parent = () => {
  const [count, setCount] = useState(0);
  const [items] = useState(['A', 'B', 'C']);

  // 1. Expensive Calculation
  const total = useMemo(() => {
    return items.reduce((acc, item) => expensiveMath(acc, item), 0);
  }, [items]);

  // 2. Stable Function Reference
  // Without useCallback, this function is new every render,
  // breaking React.memo on the child.
  const handleClick = useCallback((item) => {
    console.log('Clicked', item);
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <MemoizedList items={items} onItemClick={handleClick} />
    </div>
  );
};`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What is the difference between useMemo and useCallback?",
        answer: "`useMemo` caches the *result* of a function (a value). `useCallback` caches the *function itself*. `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.",
        tips: "Value vs Function."
      },
      {
        id: 2,
        question: "Why not memoize everything?",
        answer: "Memoization has a cost (memory to store previous values, CPU to compare dependencies). If a component is cheap to render, the overhead of checking props might be higher than just re-rendering it. Only optimize when you have a performance problem or expensive sub-trees.",
        tips: "Premature Optimization."
      },
      {
        id: 3,
        question: "How does React.lazy improve performance?",
        answer: "It reduces the initial bundle size (Time to Interactive). Instead of downloading 5MB of JS at once, the user downloads 1MB, and the other 4MB are fetched in small chunks only when the user navigates to those specific routes.",
        tips: "Bundle Size & TTI."
      }
    ]
  }
];
