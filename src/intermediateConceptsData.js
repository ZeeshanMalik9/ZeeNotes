export const intermediateConceptsData = [
  {
    id: 'lists-and-keys',
    title: 'Lists & Keys',
    blocks: [
      {
        type: 'theory',
        title: 'Rendering Lists',
        type: 'theory',
        title: 'Rendering Lists',
        content: `In React, we use the JavaScript \`.map()\` method to transform an array of data into an array of JSX elements.
        
We often use \`.filter()\` before mapping if we only want to display a subset of items.

**Why .map()?**
Unlike \`for\` loops, \`.map()\` returns a new array. React can take this array of elements and render them directly. This fits perfectly with React's declarative nature—you describe *what* the list should look like based on the data.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Rendering a Todo List',
        code: `const TodoList = ({ todos }) => {
  // 1. Filter completed items (optional)
  const activeTodos = todos.filter(todo => !todo.isCompleted);

  return (
    <ul>
      {/* 2. Map over data to create UI */}
      {activeTodos.map((todo) => (
        // 3. ALWAYS provide a unique 'key' prop
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
};`
      },
      {
        type: 'theory',
        title: 'Deep Dive: Reconciliation & Keys',
        content: `**The Problem**: When React renders a list, it needs to know which items changed, were added, or removed.
        
**The Solution (Keys)**: Keys act as a stable identity for a component across renders.
        
**Why Index is Dangerous**:
If you use the index \`key={index}\`, you are telling React: "The item at position 0 is always the same component".
If you reverse the list, the item at position 0 has different data, but React sees the *same key*. It reuses the old component instance (and its local state!).
*Result*: You type in input #1, reverse the list, and the text stays in input #1 even though the data moved to the bottom.`
      },
      {
        type: 'example',
        title: 'Analogy: Assigned Seating vs "Take a Number"',
        content: `**Keys** are like **Assigned Seating** at a wedding.
        "Uncle Bob sits at Table 5". No matter where everyone else moves, Uncle Bob is always at Table 5.
        
**Index as Key** is like **"Seat #1, Seat #2"**.
If Uncle Bob leaves and Aunt Mary takes his chair, the waiter (React) thinks Aunt Mary *is* Uncle Bob because she's in Seat #1. He might give her Bob's drink (State).`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'The "Index as Key" Bug',
        code: `// ❌ BAD: Using Index
// If you delete 'Item A', 'Item B' takes index 0.
// React thinks 'Item B' IS 'Item A' and keeps A's state (e.g., input text).
{items.map((item, index) => (
  <li key={index}>
    <input defaultValue={item.text} />
  </li>
))}

// ✅ GOOD: Using ID
// React knows 'Item B' is 'Item B' regardless of position.
{items.map((item) => (
  <li key={item.id}>
    <input defaultValue={item.text} />
  </li>
))}`
      },
      {
        type: 'diagram',
        title: 'Reconciliation with Keys',
        definition: `graph TD
    subgraph Previous Render
    A1[Key 1 Buy Milk]
    A2[Key 2 Walk Dog]
    end
    
    subgraph New Render Item Added
    B3[Key 3 Read Book]
    B1[Key 1 Buy Milk]
    B2[Key 2 Walk Dog]
    end
    
    A1 -->|Match Key| B1
    A2 -->|Match Key| B2
    B3 -->|New Key| New[Create New Node]`
      },
      {
        type: 'theory',
        title: 'Danger of Index as Key',
        content: `**Never use the array index as a key** if the list can change order or items can be deleted.
        
If you delete item 1, item 2 becomes index 1. React sees the key "1" is still there and assumes it's the same component, reusing its state. This leads to bugs where the wrong item gets deleted or input text stays behind.`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "Why is using the array index as a key considered an anti-pattern?",
        answer: "Using the index as a key tells React that the identity of the component corresponds to its position in the list. If the list is reordered or items are inserted/removed, the index changes, causing React to mix up component state (like input values) or unnecessarily re-render components. It should only be used if the list is static and will never change.",
        tips: "Mention 'Component Identity' and 'State persistence issues'."
      },
      {
        id: 2,
        question: "What is the purpose of the 'key' prop?",
        answer: "The key prop allows React to uniquely identify elements in a list across renders. It helps the reconciliation algorithm determine which items were added, removed, or re-ordered, ensuring efficient updates and preserving component state.",
        tips: "Keywords: 'Reconciliation', 'Identity', 'Performance'."
      },
      {
        id: 3,
        question: "Can keys be duplicated?",
        answer: "Keys must be unique among siblings (items in the same array). They do not need to be globally unique in the entire application. If duplicates exist, React will throw a warning and may render incorrectly.",
        tips: "Scope of uniqueness is 'Siblings'."
      }
    ]
  },
  {
    id: 'styling-in-react',
    title: 'Styling in React',
    blocks: [
      {
        type: 'theory',
        title: 'Approaches to Styling',
        content: `There are three main ways to style React applications:
        
1.  **Inline Styles**: Quick but limited.
2.  **CSS Modules**: Scoped CSS files (avoids class name collisions).
3.  **Utility-First (Tailwind CSS)**: The modern industry standard for rapid development.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Comparison of Approaches',
        code: `// 1. Inline Styles (Avoid for complex styling)
// Pros: Dynamic values. Cons: No pseudo-classes (:hover), verbose.
const BtnInline = () => (
  <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}>
    Click Me
  </button>
);

// 2. CSS Modules (Standard CSS with scoping)
// import styles from './Button.module.css';
// .btn { background: blue; } -> compiles to .Button_btn__1a2b3
const BtnModule = () => (
  <button className={styles.btn}>
    Click Me
  </button>
);

// 3. Tailwind CSS (Modern Standard)
// Pros: Fast, consistent design system, no context switching.
const BtnTailwind = () => (
  <button className="bg-blue-500 text-white p-2 hover:bg-blue-600 rounded">
    Click Me
  </button>
);`
      },
      {
        type: 'theory',
        title: 'The Evolution of React Styling',
        content: `**1. Global CSS (The Old Way)**
Standard \`.css\` files imported in \`index.js\`.
*Problem*: Global namespace pollution. A class named \`.card\` in one component clashes with \`.card\` in another.

**2. CSS Modules (The Scoped Way)**
Files like \`Button.module.css\`. React transforms class names into unique hashes (e.g., \`_btn_1y45k\`).
*Benefit*: Solves scoping. *Drawback*: Separate files, context switching.

**3. CSS-in-JS (The Dynamic Way)**
Libraries like **Styled Components** or **Emotion**. You write CSS inside JS files.
*Benefit*: Dynamic styles based on props. *Drawback*: Runtime performance cost, larger bundle size.

**4. Utility-First (The Modern Way - Tailwind)**
Pre-defined utility classes.
*Benefit*: Extremely fast development, consistent design system, zero runtime overhead (compiled to static CSS).`
      },
      {
        type: 'example',
        title: 'Analogy: Tailoring a Suit',
        content: `**Global CSS**: Buying a "One Size Fits All" suit. It might fit, but if you adjust the sleeve for one person, it changes for everyone.
        
**CSS Modules**: Buying a custom-fitted suit for each person. Perfect fit, but takes time to measure and cut each one.
        
**Tailwind**: Lego blocks. You have a bin of pre-made perfect pieces (sleeves, collars). You just snap them together to build any suit instantly.`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What are the limitations of inline styles in React?",
        answer: "Inline styles cannot support pseudo-classes (like `:hover`, `:focus`), pseudo-elements (`::before`), or media queries directly. They also clutter the JSX and have lower performance compared to class-based styling.",
        tips: "Focus on 'Pseudo-selectors' and 'Media Queries'."
      },
      {
        id: 2,
        question: "What problem do CSS Modules solve?",
        answer: "CSS Modules solve the problem of global scope pollution in CSS. By scoping class names locally to the component (generating unique hashes), they prevent styles from one component accidentally affecting another.",
        tips: "Keyword: 'Global Scope Pollution'."
      },
      {
        id: 3,
        question: "How do you conditionally apply classes?",
        answer: "You can use template literals: \`className={\`btn \${isActive ? 'active' : ''}\`}\` or use a utility library like `clsx` or `classnames` for cleaner syntax.",
        tips: "Template literals are the native JS way."
      }
    ]
  },
  {
    id: 'use-effect-hook',
    title: 'The useEffect Hook',
    blocks: [
      {
        type: 'theory',
        title: 'Mental Model: Synchronization, not Lifecycle',
        content: `**Forget "Mount/Update/Unmount"**.
Instead, think: **"Synchronize with External System"**.
        
\`useEffect\` tells React: "After you render the UI, make the outside world (DOM, Network, Subscriptions) match this state."

**Dependency Array Equality**
React compares dependencies using \`Object.is\`.
*   Primitives (strings, numbers) compare by value.
*   Objects/Arrays compare by **reference**.
*   *Trap*: If you pass a new object \`{}\` or array \`[]\` as a dependency every render, the effect runs **every time**.`
      },
      {
        type: 'example',
        title: 'Analogy: The USB Drive',
        content: `**Mounting**: You plug in a USB drive (Effect runs).
        
**Updating**: You change a file on the drive. To do this safely, you might need to eject and re-plug (Cleanup runs, then Effect runs).
        
**Unmounting**: You pull the USB drive out. You MUST eject it first (Cleanup runs) to prevent data corruption (Memory Leaks).`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'The setInterval Trap',
        code: `const Timer = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // ❌ BAD: Closure Stale State
    // 'count' is captured as 0 forever inside this interval
    const id = setInterval(() => {
      console.log(count); // Always 0
      setCount(count + 1); // Always sets to 1
    }, 1000);

    return () => clearInterval(id);
  }, []); // Empty deps means effect never re-runs to get new 'count'

  // ✅ GOOD: Functional Update
  useEffect(() => {
    const id = setInterval(() => {
      setCount(prev => prev + 1); // Always gets latest state
    }, 1000);
    return () => clearInterval(id);
  }, []);
};`
      },
      {
        type: 'diagram',
        title: 'Effect Lifecycle',
        definition: `graph TD
    A[Component Mounts] --> B[Run Effect]
    B --> C{Deps Changed?}
    C -->|Yes| D[Run Cleanup Old]
    D --> E[Run Effect New]
    C -->|No| F[Do Nothing]
    E --> G[Component Unmounts]
    G --> H[Run Cleanup Final]`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Dependency Array Rules',
        code: `import { useEffect, useState } from 'react';

const Timer = () => {
  const [count, setCount] = useState(0);

  // Case 1: No Dependency Array
  // Runs on EVERY render (Dangerous!)
  useEffect(() => {
    console.log('Rendered');
  });

  // Case 2: Empty Array []
  // Runs ONLY on Mount (Born)
  useEffect(() => {
    console.log('Mounted');
  }, []);

  // Case 3: With Dependencies [count]
  // Runs on Mount + When 'count' changes
  useEffect(() => {
    console.log('Count changed to:', count);
  }, [count]);

  return <button onClick={() => setCount(c => c + 1)}>+</button>;
};`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Cleanup Function',
        code: `const WindowTracker = () => {
  useEffect(() => {
    const handleResize = () => console.log(window.innerWidth);
    
    // 1. Setup
    window.addEventListener('resize', handleResize);

    // 2. Cleanup (Return a function)
    // React calls this before the component unmounts
    // OR before re-running the effect.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty deps = run once

  return <div>Resize the window</div>;
};`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What happens if you omit the dependency array in useEffect?",
        answer: "The effect will run after *every single render*. This can lead to performance issues or infinite loops if the effect updates state, which triggers a re-render, which triggers the effect again.",
        tips: "Mention 'Infinite Loops' and 'Performance'."
      },
      {
        id: 2,
        question: "When does the cleanup function run?",
        answer: "The cleanup function runs in two scenarios: 1) Before the component unmounts (is removed from the DOM). 2) Before the effect re-runs due to a dependency change (to clean up the previous effect).",
        tips: "It cleans up the *previous* execution."
      },
      {
        id: 3,
        question: "Why can't useEffect be async?",
        answer: "You cannot make the callback function async (e.g., `useEffect(async () => ...`) because async functions return a Promise, but useEffect expects either nothing or a cleanup function. To use async, define an async function *inside* the effect and call it.",
        tips: "Return value of useEffect must be a function or undefined."
      }
    ]
  },
  {
    id: 'use-ref-hook',
    title: 'The useRef Hook',
    blocks: [
      {
        type: 'theory',
        title: 'useRef: The Escape Hatch',
        content: `**What is it?**
\`useRef\` is like a "secret pocket" in your component. You can put things in it and take them out, and **React doesn't know or care**.

**Reference Equality**
The object returned by \`useRef\` is stable. It is the *exact same object* reference on every render.
\`ref1 === ref2\` is always true.

**When to use it?**
1.  **DOM Access**: Focusing inputs, scrolling to elements, measuring size.
2.  **Mutable Values**: Storing IDs (timers), previous props, or tracking "isMounted" status.
3.  **Optimization**: Avoiding re-renders for data that doesn't affect the UI.`
      },
      {
        type: 'example',
        title: 'Analogy: The Sticky Note',
        content: `**useState** is like a **Digital Billboard**. When you change the text, the whole sign flashes and updates for everyone to see (Re-render).
        
**useRef** is like a **Sticky Note** on the back of the billboard. You can write on it, cross things out, and read it, but **nobody looking at the billboard sees it change**.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Accessing DOM (Focus Input)',
        code: `const InputFocus = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    // Access the DOM node directly
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Me</button>
    </>
  );
};`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Mutable Variable (No Re-render)',
        code: `const RenderCounter = () => {
  const countRef = useRef(0);
  const [dummy, setDummy] = useState(0);

  const handleClick = () => {
    countRef.current++; // Mutating ref doesn't trigger render
    console.log('Clicks:', countRef.current);
  };

  return (
    <div>
      <p>Component doesn't see updates: {countRef.current}</p>
      <button onClick={handleClick}>Click (Log only)</button>
      <button onClick={() => setDummy(d => d + 1)}>Force Render</button>
    </div>
  );
};`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What is the difference between useRef and useState?",
        answer: "Updating `useState` triggers a re-render and updates the UI. Updating `useRef` does NOT trigger a re-render. Refs are synchronous and mutable, while State is asynchronous (batched) and immutable.",
        tips: "Re-render is the key difference."
      },
      {
        id: 2,
        question: "When should you use useRef instead of useState?",
        answer: "Use `useRef` when you need to store a value that doesn't affect the visual output (like a timer ID, previous prop value, or DOM reference). If the user needs to see the change, use `useState`.",
        tips: "Visual output vs Internal logic."
      },
      {
        id: 3,
        question: "Why is ref.current mutable?",
        answer: "Because it's just a plain JavaScript object that React preserves between renders. React doesn't track changes to it, which is why modifying it doesn't trigger reconciliation.",
        tips: "It's an 'escape hatch' from React's data flow."
      }
    ]
  },
  {
    id: 'custom-hooks',
    title: 'Custom Hooks',
    blocks: [
      {
        type: 'theory',
        title: 'Extracting Logic',
        content: `Custom Hooks allow you to extract component logic into reusable functions.
        
A custom hook is just a JavaScript function whose name starts with "use" and that may call other Hooks.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Example: useWindowSize',
        code: `// hooks/useWindowSize.js
import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [size, setSize] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Usage in Component
const App = () => {
  const { width } = useWindowSize();
  return <p>Window width: {width}px</p>;
};`
      },
      {
        type: 'theory',
        title: 'Rules of Custom Hooks',
        content: `1.  **Naming**: Must start with "use" (e.g., \`useAuth\`). This tells React to check for Hook violations.
2.  **Composition**: They can use other hooks (useState, useEffect).
3.  **Isolation**: Two components using the same hook do *not* share state. Each gets its own independent state instance.`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "Do custom hooks share state between components?",
        answer: "No. Custom hooks are a mechanism to reuse *stateful logic*, not state itself. Every time you call a custom hook, all state and effects inside it are fully isolated to that specific component instance.",
        tips: "Reuse Logic vs Reuse State."
      },
      {
        id: 2,
        question: "Why must custom hooks start with 'use'?",
        answer: "It's a convention that allows React's linter plugin to automatically enforce the Rules of Hooks (e.g., ensuring hooks aren't called inside loops or conditions). Without the 'use' prefix, React wouldn't know it's a hook.",
        tips: "Linting and Rules enforcement."
      },
      {
        id: 3,
        question: "Can you use Hooks inside loops?",
        answer: "No, never. Hooks must be called in the exact same order on every render. Loops or conditions can change the order or number of calls, breaking React's internal state tracking.",
        tips: "Top Level Only."
      }
    ]
  }
];
