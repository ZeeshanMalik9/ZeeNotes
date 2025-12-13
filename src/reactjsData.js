
export const coreConceptsData = [
  {
    id: 'react-components',
    title: 'React Components',
    blocks: [
      {
        type: 'theory',
        title: 'Functional Components: The Modern Standard',
        content: `**What are they?**
At their core, Functional Components are just JavaScript functions that accept an argument (props) and return a description of the UI (JSX).`
      },
      {
        type: 'table',
        title: 'Comparison: Functional vs Class',
        headers: ['Feature', 'Functional Component', 'Class Component'],
        rows: [
          ['**Syntax**', 'Simple Function', 'Class extends React.Component'],
          ['**State**', '`useState` Hook', '`this.state`'],
          ['**Lifecycle**', '`useEffect` Hook', '`componentDidMount`, etc.'],
          ['**`this`**', 'Not used', 'Required (Confusing)'],
          ['**Performance**', 'Better (Tree-shaking)', 'Heavier Bundle']
        ]
      },
      {
        type: 'theory',
        title: 'Deep Dive: Element vs. Component',
        content: `**Deep Dive: Element vs. Component**
*   **Component**: The factory/blueprint (e.g., the function \`UserProfile\`).
*   **Element**: The object returned by the component (e.g., \`{ type: 'div', props: { ... } }\`).
*   **Instance**: React internals handle instances. For functional components, there is no "instance" like in classes (no \`this\`), just a function invocation.`
      },
      {
        type: 'example',
        title: 'Analogy: The Chef and the Recipe',
        content: `Think of a **Component** as a **Recipe** (instructions on how to make a dish).
        
Think of an **Element** as the **Dish** itself (the result of following the recipe).
        
When you use \`<UserProfile />\`, you are telling React (the Chef) to "go cook this recipe". React reads the instructions (executes the function) and serves the dish (renders the UI).`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Under the Hood: React.createElement',
        code: `// What you write (JSX):
const element = <h1 className="greeting">Hello, world!</h1>;

// What Babel compiles it to (approximate):
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);

// What the browser actually sees (The Virtual DOM Object):
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Component Structure Best Practices',
        code: `// src/components/UserProfile/UserProfile.jsx

// 1. Imports
import React from 'react';
import PropTypes from 'prop-types'; // Optional: for type checking
import './UserProfile.css'; // Component-specific styles

// 2. Component Definition
// Use PascalCase for component names
const UserProfile = ({ username, role }) => {
  // Logic goes here (hooks, derived state)
  const isAdmin = role === 'admin';

  // 3. Return JSX
  return (
    <div className="user-profile">
      <h2 className="text-xl font-bold">{username}</h2>
      {isAdmin && <span className="badge">Admin</span>}
    </div>
  );
};

// 4. Prop Types (Best Practice for JS projects)
UserProfile.propTypes = {
  username: PropTypes.string.isRequired,
  role: PropTypes.string,
};

// 5. Default Export
export default UserProfile;`
      },
      {
        type: 'table',
        title: 'Default vs Named Exports',
        headers: ['Feature', 'Default Export', 'Named Export'],
        rows: [
          ['**Syntax**', '`export default Card;`', '`export const Card = ...`'],
          ['**Import**', '`import Card from \'./Card\'`', '`import { Card } from \'./Card\'`'],
          ['**Naming**', 'Any name allowed', 'Must match exact name'],
          ['**Quantity**', '1 per file', 'Many per file'],
          ['**Refactoring**', 'Harder (Names vary)', 'Easier (Auto-rename works)']
        ]
      },
      {
        type: 'theory',
        title: 'Industry Tip',
        content: `*Industry Tip*: Many teams prefer Named Exports for components to enforce consistent naming across the codebase, aiding refactoring and auto-imports.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Export/Import Examples',
        code: `// Named Export (Preferred by some teams)
export const Button = () => <button>Click</button>;
import { Button } from './Button';

// Default Export
const Card = () => <div>Card</div>;
export default Card;
import CardComponent from './Card'; // Can rename freely`
      },
      {
        type: 'diagram',
        title: 'Component Tree Structure',
        definition: `graph TD
    App[App Component] --> Header[Header]
    App --> Main[Main Content]
    App --> Footer[Footer]
    Main --> Sidebar[Sidebar]
    Main --> Feed[Feed]
    Feed --> Post[Post Item]
    Feed --> Post[Post Item]
    Post --> LikeBtn[Like Button]
    Post --> CommentSection[Comments]`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "Why do component names have to start with a capital letter in React?",
        answer: "React treats components starting with lowercase letters as DOM tags (like <div> or <span>). For example, <div /> represents an HTML div tag, but <Welcome /> represents a component and requires Welcome to be in scope. Capitalization tells Babel/React to handle it as a custom component instance.",
        tips: "Mention 'JSX transpilation' and distinguishing between 'HTML tags' and 'React Components'."
      },
      {
        id: 2,
        question: "What is the difference between a Functional Component and a Class Component?",
        answer: "Functional components are plain JS functions that accept props and return JSX. They use Hooks (like useState) for state and side effects. Class components are ES6 classes extending React.Component and use a `render` method and `this.state`/lifecycle methods. Functional components are now the standard due to simpler syntax and better performance optimizations.",
        tips: "Focus on 'Hooks' vs 'Lifecycle methods' and 'Simplicity'."
      },
      {
        id: 3,
        question: "When would you use a Named Export over a Default Export?",
        answer: "Named exports are useful when exporting multiple values from a module (like utility functions) or to enforce consistent naming when importing components. Default exports are convenient for the main component of a file, but can lead to inconsistent naming if different files import it with different names.",
        tips: "Discuss 'Tree-shaking' (named exports are better for it) and 'Refactoring safety'."
      }
    ]
  },
  {
    id: 'jsx-fragments',
    title: 'JSX & Fragments',
    blocks: [
      {
        type: 'theory',
        title: 'JSX: JavaScript XML',
        content: `**What is it?**
JSX is a syntax extension for JavaScript that looks like HTML. It is **not** valid JavaScript and browsers cannot understand it directly.

**The Transpilation Process**
Tools like **Babel** transform JSX into standard \`React.createElement()\` calls. This is why you used to need \`import React from 'react'\` in every file (though modern runtimes handle this automatically).

**Security: XSS Protection**
By default, React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent XSS (Cross-site-scripting) attacks.

**Why One Parent?**
A function can only return **one** value. \`React.createElement\` creates **one** object. If you have two sibling divs, you are trying to return two objects, which is invalid JS syntax unless wrapped in an array or a parent object (Fragment).`
      },
      {
        type: 'example',
        title: 'Analogy: The Translator',
        content: `Imagine JSX is **Slang**. It's expressive and easy for locals (developers) to speak.
        
The Browser is a **Formal Official** who only speaks standard English (JavaScript).
        
**Babel** is the **Translator** who listens to your Slang (JSX) and instantly translates it into Formal English (React.createElement) so the Official can understand and act on it.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'The Problem & Solution',
        code: `// ❌ ERROR: Adjacent JSX elements must be wrapped
return (
  <h1>Title</h1>
  <p>Description</p>
);

// ✅ OPTION 1: Extra DOM Node (div)
return (
  <div>
    <h1>Title</h1>
    <p>Description</p>
  </div>
);

// ✅ OPTION 2: Fragment (No extra DOM node)
return (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);`
      },
      {
        type: 'theory',
        title: 'JSX vs HTML',
        content: `JSX is closer to JavaScript than HTML.
        
1.  **camelCase**: HTML attributes like \`onclick\` become \`onClick\`, \`tabindex\` becomes \`tabIndex\`.
2.  **className**: \`class\` is a reserved keyword in JS, so we use \`className\`.
3.  **JavaScript Expressions**: You can embed any JS expression inside \`{ }\` (e.g., \`{user.name}\`).`
      },
      {
        type: 'diagram',
        title: 'JSX Compilation',
        definition: `graph LR
    A[JSX Code] -->|Babel Transpiler| B[React.createElement Calls]
    B -->|React Execution| C[Virtual DOM Object]
    C -->|Reconciliation| D[Real DOM]`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "Can browsers read JSX directly?",
        answer: "No, browsers only understand standard JavaScript objects. JSX is syntactic sugar that must be transpiled (usually by Babel) into `React.createElement()` calls before the browser can execute it.",
        tips: "The keyword is 'Transpilation' or 'Compilation'."
      },
      {
        id: 2,
        question: "Why is `class` used as `className` in JSX?",
        answer: "`class` is a reserved keyword in JavaScript (used for defining classes). Since JSX is an extension of JavaScript, using `class` would cause a syntax error or ambiguity. React uses `className` to correspond to the HTML class attribute.",
        tips: "Simple JS syntax rule."
      },
      {
        id: 3,
        question: "What is the difference between <React.Fragment> and <>...</>?",
        answer: "`<>...</>` is the shorthand syntax for Fragments. It works exactly the same as `<React.Fragment>`, with one exception: you cannot pass keys to the shorthand syntax. If you are mapping over a list and need a Fragment as the top-level element, you must use `<React.Fragment key={id}>`.",
        tips: "The 'key' prop is the critical difference."
      }
    ]
  },
  {
    id: 'props-children',
    title: 'Props & Children',
    blocks: [
      {
        type: 'theory',
        title: 'Props: The Data Flow',
        content: `**What are Props?**
"Props" (short for properties) are the mechanism for passing data from a parent component down to a child. They are the "arguments" to the component function.

**Immutability Rule**
Props are **Read-Only**. A component must never modify its own props. This is a strict rule in React to ensure **Unidirectional Data Flow**. If a child could change its props, it would affect the parent's output, leading to unpredictable data states and "spaghetti code".

**Composition vs Inheritance**
React favors composition. Instead of extending classes to add functionality, we wrap components or pass components as props (like \`children\`). This is more flexible and avoids the "Gorilla/Banana" problem of inheritance.`
      },
      {
        type: 'example',
        title: 'Analogy: The Sealed Letter',
        content: `Think of **Props** as a **Sealed Letter** sent from a Boss (Parent) to an Employee (Child).
        
The Employee can read the instructions in the letter to do their job, but they **cannot rewrite the letter**. If they need different instructions, they must ask the Boss to send a *new* letter (re-render with new props).`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Destructuring Props',
        code: `// Parent Component
const App = () => {
  const user = { name: 'Alice', age: 25 };
  return <ProfileCard name={user.name} age={user.age} isActive={true} />;
};

// Child Component (with Destructuring)
// Instead of props.name, we unpack it directly
const ProfileCard = ({ name, age, isActive }) => {
  return (
    <div className={isActive ? 'active-card' : 'card'}>
      <h3>{name}</h3>
      <p>Age: {age}</p>
    </div>
  );
};`
      },
      {
        type: 'theory',
        title: 'The `children` Prop',
        content: `\`children\` is a special prop that allows components to pass elements *inside* other components, just like HTML tags.
        
This is powerful for creating "Layout" or "Wrapper" components (like Cards, Modals, or Buttons) that don't need to know their content ahead of time.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Children Prop Example',
        code: `// Reusable Card Wrapper
const Card = ({ children, title }) => {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div className="card-content">
        {children} {/* Renders whatever is passed inside <Card>...</Card> */}
      </div>
    </div>
  );
};

// Usage
const Dashboard = () => (
  <Card title="User Stats">
    <p>Views: 100</p>
    <button>Refresh</button>
  </Card>
);`
      },
      {
        type: 'diagram',
        title: 'Props Flow (Unidirectional)',
        definition: `graph TD
    Parent[Parent Component] -->|Passes Props| ChildA[Child A]
    Parent -->|Passes Props| ChildB[Child B]
    ChildA -.->|Cannot pass props up| Parent
    ChildB -.->|Cannot modify props| ChildB`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "Can a child component modify its own props?",
        answer: "No. Props are read-only (immutable) from the perspective of the child component. They are owned by the parent. If a child needs to change data, the parent must pass down a state-updating function (callback) as a prop.",
        tips: "Use the phrase 'Unidirectional Data Flow' or 'One-way binding'."
      },
      {
        id: 2,
        question: "What is Prop Drilling and how do you avoid it?",
        answer: "Prop Drilling occurs when you pass data through several layers of components just to get it to a deeply nested child. It makes code hard to maintain. You can avoid it by using Component Composition (passing components as children) or using React Context / State Management libraries.",
        tips: "Mention 'Context API' as the primary solution."
      },
      {
        id: 3,
        question: "What happens if you don't destructure props?",
        answer: "Nothing breaks, but you have to access everything via `props.propertyName` (e.g., `props.user.name`). Destructuring makes the code cleaner and clearly declares what data the component expects immediately in the function signature.",
        tips: "It's a readability and style preference, not a functional requirement."
      }
    ]
  },
  {
    id: 'state-usestate',
    title: 'State (useState)',
    blocks: [
      {
        type: 'theory',
        title: 'State: The Memory',
        content: `**What is State?**
State is data that changes over time *within* a component. It is private and fully controlled by the component.

**How useState Works Internally**
When you call \`useState\`, React reserves a "slot" in memory for that component instance. It returns an array with two items: the current value in that slot, and a function to update it.
React preserves this state between re-renders. It identifies which state belongs to which \`useState\` call based on the **call order** (which is why Hooks cannot be conditional).

**Batching**
React groups multiple state updates into a single re-render for performance. This is called **Automatic Batching**.
Example: calling \`setCount(c => c + 1)\` three times in a row will only trigger **one** re-render, not three.`
      },
      {
        type: 'example',
        title: 'Analogy: The Whiteboard',
        content: `Think of a Component as a **Professor** giving a lecture.
        
**Props** are the **Textbook** provided by the university. The professor reads from it but cannot change what's printed in the book.
        
**State** is the **Whiteboard**. The professor can write on it, erase it, and update it throughout the lecture. The students (UI) see whatever is currently on the whiteboard.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Lazy Initialization & Functional Updates',
        code: `const HeavyComponent = () => {
  // 🐢 BAD: Runs 'expensiveCalculation()' on EVERY render
  // const [data, setData] = useState(expensiveCalculation());

  // 🚀 GOOD: Lazy Initialization. Runs only on MOUNT.
  const [data, setData] = useState(() => expensiveCalculation());

  const handleClick = () => {
    // 🐢 BAD: Depends on 'data' from the current closure (might be stale)
    // setData(data + 1);

    // 🚀 GOOD: Functional Update. Receives the latest pending state.
    setData(prevData => prevData + 1);
  };
};`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'The useState Hook',
        code: `import { useState } from 'react';

const Counter = () => {
  // 1. Initialize state
  // count: current value
  // setCount: function to update value
  const [count, setCount] = useState(0);

  const increment = () => {
    // 2. Update state
    // NEVER modify count directly (count++)
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Add +1</button>
    </div>
  );
};`
      },
      {
        type: 'theory',
        title: 'Why Immutability?',
        content: `You should never modify state directly (e.g., \`user.name = 'Bob'\`). React relies on comparing the old state object reference to the new one to decide if it should re-render.
        
If you mutate the object directly, the reference stays the same, and React won't know the data changed.`
      },
      {
        type: 'example',
        title: 'Real World Analogy',
        content: `**Props** are like the ingredients given to a chef (component) to cook a dish. The chef cannot change the ingredients they were given.
        
**State** is the condition of the dish while cooking (chopped, boiling, seasoned). The chef controls this internally and it changes over time.`
      },
      {
        type: 'diagram',
        title: 'State Update Cycle',
        definition: `graph TD
    A[Initial Render] --> B[Component Displayed]
    B --> C{User Interaction}
    C -->|onClick| D[Call setState]
    D --> E[React Schedules Update]
    E --> F[Re-render Component]
    F --> G[Update DOM with new State]`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "Why is setState (or the updater function) asynchronous?",
        answer: "React batches state updates for performance. If you call setState multiple times in a single event loop, React may group them into a single re-render to avoid unnecessary layout thrashing. Therefore, reading the state immediately after setting it might return the old value.",
        tips: "Keywords: 'Batching' and 'Performance'."
      },
      {
        id: 2,
        question: "What is the difference between passing a value vs a function to setState?",
        answer: "Passing a value (`setCount(count + 1)`) uses the value from the current render scope, which might be stale in closures. Passing a function (`setCount(prev => prev + 1)`) guarantees you are working with the most up-to-date state value. Always use the functional update when the new state depends on the old state.",
        tips: "Crucial for counters or toggles."
      },
      {
        id: 3,
        question: "Can you use hooks inside loops or conditions?",
        answer: "No. Hooks must be called at the top level of the component function. They cannot be conditional. React relies on the order of hook calls to track state between renders. If the order changes (due to an `if`), React's internal state tracking breaks.",
        tips: "This is the 'Rules of Hooks'."
      }
    ]
  },
  {
    id: 'props-vs-state',
    title: 'Props vs. State',
    blocks: [
      {
        type: 'theory',
        title: 'Architectural Decisions: Props vs State',
        content: `Choosing between Props and State is the most common architectural decision in React.

**The Golden Rule**: "Lift State Up".
If two components need to share data, that data should not be in either of their states. It should be in the state of their closest common ancestor, passed down as props.

**When to use State?**
*   Input forms (controlled components).
*   UI state (isModalOpen, activeTab).
*   Server data fetched by this specific component.

**When to use Props?**
*   Passing configuration to a child.
*   Passing data to be displayed.
*   Passing event handlers (callbacks) to allow children to communicate up.`
      },
      {
        type: 'example',
        title: 'Analogy: The Water Tank',
        content: `Think of **State** as a **Water Tank** on the roof of a building (Parent Component).
        
Think of **Props** as the **Pipes** carrying water down to the apartments (Child Components).
        
The apartments cannot generate water; they only receive it through the pipes. If an apartment needs more water, they must call the building manager (via a callback prop) to adjust the valve at the tank.`
      },
      {
        type: 'diagram',
        title: 'Visualizing the Difference',
        definition: `graph TD
    subgraph Parent Component
    P_State[Parent State]
    end
    
    P_State -->|Passed as Props| Child[Child Component]
    
    subgraph Child Component
    C_Props[Props Read Only]
    C_State[Internal State Mutable]
    end
    
    C_Props -.->|Derived| UI
    C_State -.->|Controls| UI`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Interaction Example',
        code: `const Parent = () => {
  const [color, setColor] = useState('blue'); // Parent State

  return (
    // Passing State down as Props
    <ChildDisplay selectedColor={color} />
  );
};

const ChildDisplay = ({ selectedColor }) => {
  // Receives 'blue' as a Prop. Cannot change it.
  return <div style={{ color: selectedColor }}>I am {selectedColor}</div>;
};`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "If a parent's state changes, does the child re-render?",
        answer: "Yes. By default, when a parent component re-renders (due to state change), all its child components also re-render, regardless of whether their props changed. This can be optimized using `React.memo`.",
        tips: "Distinguish between 'default behavior' and 'optimized behavior'."
      },
      {
        id: 2,
        question: "Can you change props?",
        answer: "No, props are immutable. If you need to 'change' a prop, the parent must change the value it passes down, or you should copy the prop into a local state (though copying props to state is often an anti-pattern).",
        tips: "Be firm: Props are read-only."
      },
      {
        id: 3,
        question: "Where should state live?",
        answer: "State should live in the highest common ancestor of the components that need it. If multiple siblings need the same data, lift the state up to their parent.",
        tips: "The concept is 'Lifting State Up'."
      }
    ]
  },
  {
    id: 'event-handling',
    title: 'Event Handling',
    blocks: [
      {
        type: 'theory',
        title: 'Synthetic Events: Under the Hood',
        content: `**What are they?**
React implements its own event system called **Synthetic Events**. It wraps the browser's native event system to ensure cross-browser compatibility.

**Event Delegation**
React does **not** attach event listeners to every single DOM node (like \`<button>\`). Instead, it attaches **one** single event listener to the root of your app (Event Delegation).
When you click a button, the event bubbles up to the root. React catches it, looks up the component tree to find your \`onClick\` handler, and executes it. This is a massive performance optimization for large lists.

**Pooling (Legacy Note)**
Prior to React 17, events were "pooled" (reused) for performance, meaning you couldn't access the event object asynchronously. This was removed in React 17+, so you can now safely use \`e.target\` in async functions.`
      },
      {
        type: 'example',
        title: 'Analogy: The Receptionist',
        content: `Imagine a large office building (The DOM).
        
**Native Events**: Every employee (DOM Node) has their own personal mailbox. The mailman has to stop at every desk.
        
**React Event Delegation**: There is one **Receptionist** (React Root) at the front desk. All mail comes to her. She looks at the envelope, sees who it's for, and calls that specific employee to come get it. This is much more efficient than the mailman walking to 1000 desks.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Handling Events',
        code: `import { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');

  // Event Handler Function
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent full page reload
    console.log('Submitting:', email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        // Inline handler for simple updates
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button type="submit">Login</button>
    </form>
  );
};`
      },
      {
        type: 'theory',
        title: 'Passing Arguments',
        content: `Sometimes you need to pass extra data to an event handler (like an ID in a list).
        
You cannot call the function directly \`onClick={deleteItem(id)}\` because that executes it immediately on render. You must wrap it in an arrow function.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Passing Arguments Example',
        code: `const List = ({ items }) => {
  const handleDelete = (id) => {
    console.log('Deleting item:', id);
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          {/* ✅ Correct: Arrow function wrapper */}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
          
          {/* ❌ Wrong: Calls immediately on render */}
          {/* <button onClick={handleDelete(item.id)}>Delete</button> */}
        </li>
      ))}
    </ul>
  );
};`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What is a Synthetic Event in React?",
        answer: "A Synthetic Event is a cross-browser wrapper around the browser's native event. It has the same interface as the native event (stopPropagation, preventDefault) but works identically across all browsers. React pools these events for performance.",
        tips: "Mention 'Cross-browser compatibility'."
      },
      {
        id: 2,
        question: "Why do we need `e.preventDefault()` on form submissions?",
        answer: "The default behavior of an HTML form is to make a network request and reload the page. In a Single Page Application (SPA) like React, we want to handle the data submission via JavaScript (AJAX/Fetch) without refreshing the page, so we prevent the default browser action.",
        tips: "SPA vs Multi-page app behavior."
      },
      {
        id: 3,
        question: "Why is `onClick={handleClick()}` wrong?",
        answer: "This executes the function `handleClick` immediately when the component renders, rather than waiting for the click event. The return value of the function (usually undefined) is then assigned to the handler. You should pass the function reference `onClick={handleClick}` or an arrow function `onClick={() => handleClick()}`.",
        tips: "Execution time: Render vs Interaction."
      }
    ]
  },
  {
    id: 'conditional-rendering',
    title: 'Conditional Rendering',
    blocks: [
      {
        type: 'theory',
        title: 'Conditional Rendering Patterns',
        content: `React embraces JavaScript's dynamic nature. There are no special template directives like \`v-if\`. You use standard JS control flow.

**1. Logical AND (&&) - The Guard**
Used when you want to render something *only if* a condition is true.
*Caveat*: If the left side is \`0\`, React renders \`0\`. Always force boolean: \`!!count && <Component />\`.

**2. Ternary (? :) - The Switch**
Used for "If This, Then That, Else The Other". Perfect for toggling between two states (e.g., Edit/View mode).

**3. Early Return - The Bouncer**
Used to stop rendering entirely if a critical condition isn't met (e.g., Loading state, Missing permissions). This keeps the main component logic clean and unnested.`
      },
      {
        type: 'example',
        title: 'Analogy: The Nightclub Bouncer',
        content: `**Early Return** is like a **Bouncer** at a club.
        
\`if (!isOver21) return "Go Home";\`
        
If you aren't 21, the interaction ends right there. You don't get to see the inside of the club (the rest of the component code). The Bouncer stops you at the door.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Advanced Conditional Patterns',
        code: `const StatusMessage = ({ status, errorMessage }) => {
  // Pattern: Object Mapping (Cleaner than many if/else)
  const statusConfig = {
    info: { color: 'blue', icon: 'ℹ️' },
    success: { color: 'green', icon: '✅' },
    warning: { color: 'orange', icon: '⚠️' },
    error: { color: 'red', icon: '❌' },
  };

  const config = statusConfig[status] || statusConfig.info;

  return (
    <div style={{ color: config.color }}>
      {config.icon} {status === 'error' ? errorMessage : 'Operation Complete'}
    </div>
  );
};`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Conditional Patterns',
        code: `const UserDashboard = ({ user, isLoading }) => {
  // 1. Early Return
  if (isLoading) {
    return <div className="spinner">Loading...</div>;
  }

  // 2. Logical AND (Short-circuit)
  // Renders nothing if user is null
  if (!user) return null;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      
      {/* 3. Ternary Operator */}
      {user.isPremium ? (
        <PremiumBadge />
      ) : (
        <button>Upgrade to Premium</button>
      )}

      {/* Logical AND for optional UI */}
      {user.hasNotifications && <NotificationBell />}
    </div>
  );
};`
      },
      {
        type: 'theory',
        title: 'Gotchas with &&',
        content: `Be careful when using \`&&\` with numbers.
        
JavaScript treats \`0\` as falsy.
\`count && <h1>{count}</h1>\`
        
If count is 0, React will render the number \`0\` instead of nothing.
**Fix**: \`count > 0 && <h1>{count}</h1>\` or \`!!count && ...\``
      },
      {
        type: 'diagram',
        title: 'Logic Flow',
        definition: `graph TD
    Start --> Check{Is Loading?}
    Check -->|Yes| RenderLoader[Return Loader]
    Check -->|No| CheckUser{Has User?}
    CheckUser -->|No| RenderLogin[Return Login]
    CheckUser -->|Yes| RenderDash[Render Dashboard]
    RenderDash --> CheckPrem{Is Premium?}
    CheckPrem -->|Yes| ShowBadge[Show Gold Badge]
    CheckPrem -->|No| ShowUpsell[Show Upgrade Button]`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What is the danger of using `&&` with numbers in React?",
        answer: "If the condition evaluates to `0` (which is falsy in JS), React will render the number `0` in the UI instead of rendering nothing. This is a common bug. It's safer to check `length > 0` or cast to boolean with `!!variable`.",
        tips: "Specific example: `array.length && ...` prints 0 if empty."
      },
      {
        id: 2,
        question: "How do you hide a component but keep it in the DOM?",
        answer: "Conditional rendering removes the element from the DOM entirely. To hide it but keep it in the DOM (e.g., for SEO or preserving state), you should use CSS: `style={{ display: 'none' }}` or a class like `hidden`.",
        tips: "DOM removal vs CSS visibility."
      },
      {
        id: 3,
        question: "Can you use if-else statements inside JSX?",
        answer: "No, you cannot use statements (like if-else, for loops) inside JSX curly braces, only expressions. You must use ternary operators or logical &&. If you need complex logic, calculate the value in a variable before the return statement.",
        tips: "Distinction between 'Statement' and 'Expression'."
      }
    ]
  }
];

export const intermediateConceptsData = [
  {
    id: 'lists-and-keys',
    title: 'Lists & Keys',
    blocks: [
      {
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

export const advancedRoutingData = [
  {
    id: 'react-router-setup',
    title: 'React Router Setup',
    blocks: [
      {
        type: 'theory',
        title: 'Modern Routing (v6.4+)',
        content: `**Traditional Web (SSR)**: Click a link -> Browser requests new HTML from server -> Screen goes white -> New page loads.
        
**Client-Side Routing (CSR)**: Click a link -> JavaScript intercepts the click -> Updates the URL bar -> Swaps the DOM content instantly.
        
**How it works**: It uses the browser's **History API** (\`pushState\`, \`replaceState\`) to change the URL without triggering a page reload. React Router observes these URL changes and renders the matching component tree.`
      },
      {
        type: 'example',
        title: 'Analogy: The Hotel Hallway',
        content: `**Server-Side Routing** is like moving to a **Different Hotel**. You have to pack your bags, check out, travel, and check in again. (Full Reload).
        
**Client-Side Routing** is like walking down the **Hallway** to a different room in the *same* hotel. You just open a different door. The hotel (Application State) stays the same.`
      },
      {
        type: 'theory',
        title: 'Modern Data Routers (v6.4+)',
        content: `The new \`createBrowserRouter\` API is not just about syntax. It enables **Data APIs**.
        
**The "Waterfall" Problem**: In older versions, a component had to render *first* before it could start fetching data (useEffect). If you had nested components, the child waited for the parent to finish fetching/rendering before it could start its own fetch.
        
**The Solution (Loaders)**: Data Routers allow you to define a \`loader\` function for each route. React Router fetches the data *in parallel* with loading the code, before the component even renders.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'App.jsx Setup',
        code: `import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// 1. Define Layout
const RootLayout = () => (
  <div>
    <Navbar />
    <main>
      {/* Outlet renders the child route's element */}
      <Outlet />
    </main>
    <Footer />
  </div>
);

// 2. Define Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />, // Handles 404s and crashes
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'products', element: <Products /> },
    ],
  },
]);

// 3. Provide Router
const App = () => <RouterProvider router={router} />;`
      },
      {
        type: 'diagram',
        title: 'The Outlet Concept',
        definition: `graph TD
    subgraph Browser Window
    Nav[Navbar Fixed]
    Out[Outlet Dynamic Area]
    Foot[Footer Fixed]
    end
    
    URL1["/"] -->|Renders| Home[Home Component]
    URL2["/about"] -->|Renders| About[About Component]
    
    Home --> Out
    About --> Out`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What is the difference between Client-Side Routing and Server-Side Routing?",
        answer: "Server-Side Routing causes a full page reload. The browser sends a request to the server, and the server sends back a completely new HTML document. Client-Side Routing (React Router) intercepts the URL change and updates the DOM using JavaScript without a page reload, resulting in a faster, app-like experience.",
        tips: "Keywords: 'Full Page Reload' vs 'DOM Update'."
      },
      {
        id: 2,
        question: "What is the purpose of the <Outlet> component?",
        answer: "The `<Outlet>` component is a placeholder used in parent route elements (layouts) to render their child route elements. It allows you to create shared UI (like Navbars and Sidebars) that persists while the content inside the Outlet changes based on the URL.",
        tips: "Think of it as a 'Window' for child content."
      },
      {
        id: 3,
        question: "Why use createBrowserRouter instead of BrowserRouter?",
        answer: "`createBrowserRouter` enables the new Data APIs (Loaders, Actions, Fetchers) introduced in v6.4. These APIs allow you to decouple data fetching from rendering, preventing 'waterfalls' and improving performance. `BrowserRouter` is legacy-compatible but doesn't support these features.",
        tips: "Mention 'Data APIs' and 'Loaders'."
      }
    ]
  },
  {
    id: 'navigation-components',
    title: 'Navigation Components',
    blocks: [
      {
        type: 'theory',
        title: 'The Cost of an Anchor Tag',
        content: `**Why never \`<a href>\`?**
Using a standard anchor tag triggers a **Browser Navigation Event**.
1.  Browser unloads the current document (Memory wiped).
2.  Browser requests the new URL from the server.
3.  Server sends HTML.
4.  Browser parses HTML, downloads JS/CSS assets again.
5.  App bootstraps from scratch.

**The \`<Link>\` Component**
It prevents the default browser behavior and uses \`history.pushState(url)\`. The URL changes, but the JavaScript environment remains alive. No assets are re-downloaded.`
      },
      {
        type: 'example',
        title: 'Analogy: Teleportation',
        content: `**Anchor Tag**: Driving to the airport, flying to a new city, and taking a taxi to the hotel. (Expensive, slow).
        
**Link Component**: Teleporting instantly from your living room to the hotel lobby. (Instant, cheap).`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Active Styling with NavLink',
        code: `import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav>
    {/* NavLink provides an 'isActive' boolean */}
    <NavLink 
      to="/dashboard"
      className={({ isActive }) => 
        isActive ? "nav-item active" : "nav-item"
      }
    >
      Dashboard
    </NavLink>
  </nav>
);`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Programmatic Navigation',
        code: `import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginUser();
    // Redirect user after action
    navigate('/dashboard', { replace: true }); 
    // replace: true prevents going back to login via Back button
  };

  return <button onClick={handleLogin}>Log In</button>;
};`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What is the difference between <Link> and <NavLink>?",
        answer: "`<Link>` is for basic navigation. `<NavLink>` is a special version of Link that knows whether it is 'active' (matches the current URL). It's primarily used for navigation menus to apply styling (like highlighting the current tab).",
        tips: "NavLink = Link + Active State."
      },
      {
        id: 2,
        question: "When would you use { replace: true } in navigation?",
        answer: "You use `replace: true` when you want to replace the current entry in the history stack instead of adding a new one. This is common for redirects (e.g., after login or a protected route redirect) so the user doesn't get stuck in a loop when clicking the 'Back' button.",
        tips: "Think 'Login Redirects'."
      },
      {
        id: 3,
        question: "How does React Router modify the URL without reloading?",
        answer: "It uses the HTML5 History API (`window.history.pushState` and `window.history.replaceState`). This allows JavaScript to modify the browser's URL bar and history stack without triggering a network request for a new document.",
        tips: "HTML5 History API."
      }
    ]
  },
  {
    id: 'dynamic-routing',
    title: 'Dynamic Routing',
    blocks: [
      {
        type: 'theory',
        title: 'Dynamic Segments',
        content: `Routes often need to be dynamic (e.g., User Profiles, Product Details).
We use a **colon** \`:\` to define a variable segment: \`path: "/users/:userId"\`.

**Reading Params**
The \`useParams()\` hook returns an object of key/value pairs of the dynamic params from the current URL.
If the URL is \`/users/42\`, \`useParams()\` returns \`{ userId: "42" }\`.

**Key Concept: Remounting vs Updating**
If you navigate from \`/users/1\` to \`/users/2\`, React **does not** unmount the component. It re-uses the same instance. This means \`useEffect(() => {}, [])\` (mount only) will **NOT** run again. You must include the ID in the dependency array to react to the change.`
      },
      {
        type: 'example',
        title: 'Analogy: The Form Template',
        content: `Think of a **Dynamic Route** as a **Government Form** (The Component).
        
The form has a blank space for "Name" (The URL Param).
        
When the clerk (React) processes "John", they fill in "John". If "Jane" comes next, they don't throw away the form and print a new one; they just erase "John" and write "Jane" on the *same* piece of paper.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Using useParams',
        code: `// Route Definition: path: "products/:productId"

import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  // Destructure the param name defined in the route
  const { productId } = useParams();

  // Use it to fetch data
  useEffect(() => {
    fetch(\`/api/products/\${productId}\`);
  }, [productId]); // Re-fetch if ID changes

  return <h1>Viewing Product: {productId}</h1>;
};`
      },
      {
        type: 'theory',
        title: 'Solving Prop Drilling',
        content: `URL parameters are a great way to avoid Prop Drilling.
        
Instead of passing a \`selectedProductId\` down 5 levels of components, just put the ID in the URL. Any component, anywhere in the tree, can grab it using \`useParams()\`.`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What is Prop Drilling and how do URL params help?",
        answer: "Prop Drilling is passing data through many layers of components that don't need it. URL params allow deep linking and state sharing via the URL. Any component can read the URL using `useParams`, effectively making the URL a global state store for things like IDs and filters.",
        tips: "URL as Global State."
      },
      {
        id: 2,
        question: "What happens to the component if the URL param changes (e.g., user 1 to user 2)?",
        answer: "The component stays mounted, but it re-renders. The `useParams` hook will return the new ID. You must ensure your `useEffect` has the ID in its dependency array so that it reacts to the change and fetches the new data.",
        tips: "Component reuse vs Remounting."
      },
      {
        id: 3,
        question: "Can you have optional URL parameters?",
        answer: "React Router v6 doesn't support optional params directly in the path syntax (like `:id?`). You usually define two routes: one with the param and one without, pointing to the same component, or handle the logic inside the component.",
        tips: "No direct syntax support."
      }
    ]
  },
  {
    id: 'data-fetching',
    title: 'Data Fetching',
    blocks: [
      {
        type: 'theory',
        title: 'Strategies: Fetch-on-Render vs Render-as-You-Fetch',
        content: `**1. Fetch-on-Render (useEffect)**
Component mounts -> Effect runs -> Fetch starts.
*Con*: Waterfalls. Child waits for Parent.
        
**2. Fetch-then-Render (Relay/Suspense)**
Start all fetches as early as possible (e.g., in the route loader), then render.
        
**The 3 States of Async UI**
Every async flow must handle:
1.  **Pending**: Show a Skeleton or Spinner.
2.  **Success**: Show the Data.
3.  **Error**: Show a Retry button or Error Message.`
      },
      {
        type: 'example',
        title: 'Analogy: The Restaurant Order',
        content: `**Fetch-on-Render**: You sit down. Waiter comes. You order drinks. Waiter brings drinks. *Then* you order food. Waiter brings food. (Slow, sequential).
        
**Render-as-You-Fetch (Loaders)**: You pre-order on an app while walking to the restaurant. As soon as you sit down (Render), the food arrives. (Fast, parallel).`
      },
      {
        type: 'diagram',
        title: 'Fetch Lifecycle',
        definition: `graph TD
    A[Mount] --> B{Start Fetch}
    B --> C[Set Loading true]
    C --> D[Render Skeleton UI]
    D --> E{API Response?}
    E -->|Success| F[Set Data Loading false]
    E -->|Error| G[Set Error Loading false]
    F --> H[Render Content]
    G --> I[Render Error Message]`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Robust Fetch Hook',
        code: `const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController to cancel request on unmount
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/users', { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup: Cancel request if user leaves page
    return () => controller.abort();
  }, []);

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorMessage msg={error} />;

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
};`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "How do you cancel an API request if the component unmounts?",
        answer: "You use the `AbortController` API. Create a controller instance, pass its `signal` to the fetch request, and call `controller.abort()` in the `useEffect` cleanup function. This prevents 'state update on unmounted component' warnings and saves network resources.",
        tips: "AbortController is the standard way."
      },
      {
        id: 2,
        question: "Why shouldn't you make the useEffect callback async?",
        answer: "`useEffect` expects its callback to return either nothing or a cleanup function. Async functions return a Promise. If you make the callback async, React can't handle the cleanup function correctly. Instead, define an async function *inside* the effect and call it.",
        tips: "Return type mismatch."
      },
      {
        id: 3,
        question: "Where should you fetch data in a React app?",
        answer: "Traditionally, in `useEffect`. However, modern best practices (React Query, SWR, or React Router Loaders) suggest moving fetching out of components to handle caching, deduping, and background updates automatically.",
        tips: "Mention 'React Query' for bonus points."
      }
    ]
  },
  {
    id: 'async-ui-patterns',
    title: 'Asynchronous UI Patterns',
    blocks: [
      {
        type: 'theory',
        title: 'Skeleton Loading',
        content: `Skeleton screens (or shimmer effects) are perceived as faster than spinning loaders.
        
They mimic the layout of the content that is about to appear, reducing layout shift and cognitive load.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Skeleton Component',
        code: `// Simple Skeleton Pulse Animation
const Skeleton = ({ className }) => (
  <div className={\`animate-pulse bg-gray-300 rounded \${className}\`} />
);

const CardSkeleton = () => (
  <div className="border p-4 rounded shadow">
    {/* Image placeholder */}
    <Skeleton className="h-32 w-full mb-4" />
    {/* Title placeholder */}
    <Skeleton className="h-6 w-3/4 mb-2" />
    {/* Text placeholder */}
    <Skeleton className="h-4 w-1/2" />
  </div>
);`
      },
      {
        type: 'theory',
        title: 'Conditional Rendering',
        content: `Always handle the "Happy Path" (Success) last. Handle edge cases (Loading, Error, Empty Data) first with "Early Returns".
        
This keeps your main render logic clean and focused on the data.`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What is Cumulative Layout Shift (CLS) and how do Skeletons help?",
        answer: "CLS is a Core Web Vital metric that measures visual stability. If content 'pops' in and pushes other elements down, it's a bad user experience. Skeleton loaders reserve the space for the content before it loads, preventing the layout from shifting when the data arrives.",
        tips: "Core Web Vitals."
      },
      {
        id: 2,
        question: "How do you handle empty states?",
        answer: "If the API returns success but the array is empty, you should render a specific 'Empty State' component (e.g., 'No items found') instead of rendering nothing or a blank list. This provides better feedback to the user.",
        tips: "UX Best Practice."
      },
      {
        id: 3,
        question: "What is 'Race Condition' in data fetching?",
        answer: "A race condition happens when you make multiple requests (e.g., filtering a list) and they return out of order. The earlier request might resolve *after* the later one, overwriting the correct data. Cleanup functions (AbortController) or libraries like React Query solve this.",
        tips: "Out-of-order responses."
      }
    ]
  }
];

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

export const expertInternalsData = [
  {
    id: 'class-components',
    title: 'Class Components (Legacy)',
    blocks: [
      {
        type: 'theory',
        title: 'The Old Way',
        content: `**What are they?**
Before React 16.8 (Hooks), Classes were the only way to have state or lifecycle methods.
They are standard ES6 classes extending \`React.Component\`.

**The "this" Keyword Pain**
In JavaScript classes, methods are not bound by default.
If you pass \`onClick={this.handleClick}\`, \`this\` becomes \`undefined\` when the event fires.
*Fix*: You had to manually \`.bind(this)\` in the constructor, which was verbose and confusing.

**Why learn them?**
1.  **Legacy Code**: Millions of lines of production code still use classes.
2.  **Error Boundaries**: Currently, only class components can be Error Boundaries (\`componentDidCatch\`).`
      },
      {
        type: 'example',
        title: 'Analogy: Manual vs Automatic Transmission',
        content: `**Class Components** are like **Manual Transmission Cars**.
You have complete control, but you have to manually shift gears (Lifecycle Methods) and manage the clutch (this binding). It's easy to stall.
        
**Functional Components (Hooks)** are like **Automatic Transmission**.
You just press the gas (State) and go. The car handles the complex shifting logic for you.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Class Counter Example',
        code: `class Counter extends React.Component {
  constructor(props) {
    super(props);
    // 1. State initialization in constructor
    this.state = { count: 0 };

    // 2. Binding 'this' (Painful!)
    // Without this, 'this' is undefined in handleClick
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 3. Old setState syntax
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Count: {this.state.count}
      </button>
    );
  }
}`
      },
      {
        type: 'theory',
        title: 'The "this" Keyword Pain',
        content: `In JavaScript classes, methods are not bound by default. If you pass a method like \`onClick={this.handleClick}\`, the context (\`this\`) is lost when the function is actually called by the event system.
        
Developers had to manually \`.bind(this)\` in the constructor, which was verbose and confusing for beginners.`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "Why can't we use Hooks inside Class Components?",
        answer: "Hooks rely on a specific internal call order associated with a functional component's execution context. Class components work differently (instantiating an object), so the internal mechanism for tracking Hook state doesn't exist there. You must use `this.state` and lifecycle methods instead.",
        tips: "Different internal architecture."
      },
      {
        id: 2,
        question: "What is the purpose of super(props)?",
        answer: "In a derived class (one that extends another), you must call `super()` before accessing `this`. Passing `props` to `super(props)` ensures that `this.props` is initialized correctly in the constructor.",
        tips: "ES6 Class inheritance rules."
      },
      {
        id: 3,
        question: "How do you avoid manual binding in classes?",
        answer: "You can use 'Public Class Fields' syntax (Arrow Functions) for methods: `handleClick = () => { ... }`. Arrow functions lexically bind `this`, so they don't lose context.",
        tips: "Arrow functions preserve 'this'."
      }
    ]
  },
  {
    id: 'lifecycle-methods',
    title: 'Lifecycle Methods',
    blocks: [
      {
        type: 'theory',
        title: 'Lifecycle vs Effects',
        content: `Class components had specific methods that ran at specific times. Hooks combined these into \`useEffect\`.

| Class Method | When it runs | Modern Equivalent |
| :--- | :--- | :--- |
| \`componentDidMount\` | After first render | \`useEffect(..., [])\` |
| \`componentDidUpdate\` | After re-renders | \`useEffect(..., [deps])\` |
| \`componentWillUnmount\` | Before removal | \`useEffect(() => cleanup, [])\` |`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Lifecycle Example',
        code: `class UserProfile extends React.Component {
  componentDidMount() {
    console.log('Component Mounted (Born)');
    this.fetchUser();
  }

  componentDidUpdate(prevProps) {
    // Check if ID changed to avoid infinite loops
    if (this.props.userId !== prevProps.userId) {
      console.log('User ID changed, refetching...');
      this.fetchUser();
    }
  }

  componentWillUnmount() {
    console.log('Component Unmounting (Dying)');
    // Cancel requests/timers here
  }

  render() { return <div>...</div>; }
}`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What is the difference between componentDidMount and useEffect?",
        answer: "`componentDidMount` runs synchronously after the DOM is updated but before the browser paints (mostly). `useEffect` runs asynchronously after the paint. This makes `useEffect` more performant as it doesn't block the visual update.",
        tips: "Sync vs Async timing."
      },
      {
        id: 2,
        question: "Why is componentWillMount deprecated?",
        answer: "It ran before the render, but with the introduction of Async Rendering (Fiber), it could be called multiple times before a single commit, leading to bugs and memory leaks if side effects were put there.",
        tips: "Async Rendering compatibility."
      },
      {
        id: 3,
        question: "How do you replicate getDerivedStateFromProps with Hooks?",
        answer: "You usually don't need it. If you need to update state based on props, you can do it directly during rendering: `if (props.id !== state.id) setState(...)`. React will immediately re-run the function with the new state before updating the DOM.",
        tips: "State updates during render."
      }
    ]
  },
  {
    id: 'higher-order-components',
    title: 'Higher Order Components (HOCs)',
    blocks: [
      {
        type: 'theory',
        title: 'Logic Reuse Before Hooks',
        content: `An HOC is a function that takes a component and returns a new component with added features.
        
It was the primary way to share logic (like authentication, theming, or data fetching) between components before Hooks made it easier.`
      },
      {
        type: 'diagram',
        title: 'HOC Visualization',
        definition: `graph TD
    subgraph HOC Wrapper
    Logic[Shared Logic Auth Check]
    Original[Original Component]
    Logic -->|Passes Props| Original
    end
    
    Usage[App] -->|Renders| Wrapper[Wrapped Component]`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'withAuth HOC Example',
        code: `// The HOC Function
function withAuth(WrappedComponent) {
  return function(props) {
    const [isAdmin, setIsAdmin] = useState(false);

    if (!isAdmin) {
      return <div>Please Login</div>;
    }

    // Pass original props + extra data
    return <WrappedComponent {...props} isAdmin={true} />;
  };
}

// Usage
const Dashboard = (props) => <div>Welcome Admin</div>;
const ProtectedDashboard = withAuth(Dashboard);`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What are the downsides of HOCs?",
        answer: "1. **Wrapper Hell**: Multiple HOCs led to a deep component tree (`withAuth(withRouter(withTheme(Component)))`). 2. **Prop Collisions**: If two HOCs try to pass a prop with the same name, they clash. 3. **Indirection**: It's hard to see where a prop is coming from.",
        tips: "Wrapper Hell & Prop Collisions."
      },
      {
        id: 2,
        question: "How do Hooks solve HOC problems?",
        answer: "Hooks allow you to use logic inside the component without changing the component hierarchy. Instead of wrapping the component, you just call `useAuth()` inside it. No wrapper hell, no prop collisions.",
        tips: "Composition inside vs Wrapping outside."
      },
      {
        id: 3,
        question: "Can HOCs still be useful?",
        answer: "Yes, they are still useful for class components or for libraries that need to inject props transparently. However, for functional components, custom hooks are almost always preferred.",
        tips: "Legacy support."
      }
    ]
  },
  {
    id: 'react-internals',
    title: 'React Internals (Deep Dive)',
    blocks: [
      {
        type: 'theory',
        title: 'The Virtual DOM',
        content: `The Virtual DOM (VDOM) is a lightweight JavaScript object representation of the real DOM.
        
Updating the Real DOM is slow. Updating a JS object is fast. React updates the VDOM first, calculates the difference (Diffing), and then updates only the necessary parts of the Real DOM.`
      },
      {
        type: 'diagram',
        title: 'Reconciliation (Diffing)',
        definition: `graph TD
    subgraph Old VDOM Tree
    A1[div] --> B1[h1 Hello]
    A1 --> C1[p Text]
    end
    
    subgraph New VDOM Tree
    A2[div] --> B2[h1 Hello]
    A2 --> C2[p New Text]
    end
    
    Diff{Diff Algorithm}
    A1 --> Diff
    A2 --> Diff
    Diff -->|Detect Change| Update[Update ONLY p text]
    Update --> RealDOM[Real DOM]`
      },
      {
        type: 'theory',
        title: 'React Fiber: The Engine Rewrite',
        content: `**What is Fiber?**
Fiber is the complete rewrite of React's core algorithm (released in React 16).
Its main goal is **Time Slicing** (Concurrency).

**How it works**:
Old React (Stack Reconciler) would block the main thread until the entire tree was updated. If the tree was huge, the UI would freeze.
Fiber breaks the work into small units of work. It can pause work, check if the browser needs to handle a high-priority event (like a click or animation), and then resume work later.

**Two Phases**:
1.  **Render Phase (Async/Interruptible)**: React calculates changes. Can be paused/aborted.
2.  **Commit Phase (Sync/Uninterruptible)**: React applies changes to the DOM.`
      },
      {
        type: 'example',
        title: 'Analogy: The Video Game Loop',
        content: `**Old React**: A game that freezes for 2 seconds every time you open the inventory.
        
**React Fiber**: A game that loads the inventory in the background while you are still running and shooting. It prioritizes your immediate actions (Input) over background tasks (Rendering).`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Simplified React.createElement',
        code: `// What JSX compiles to:
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object"
          ? child
          : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "What is the difference between Shadow DOM and Virtual DOM?",
        answer: "**Virtual DOM** is a pattern used by libraries like React to optimize updates on top of the standard DOM. **Shadow DOM** is a browser standard (Web Components) for scoping CSS and variables so they don't leak out of a component. They are completely different concepts.",
        tips: "Optimization Pattern vs Browser Standard."
      },
      {
        id: 2,
        question: "Does the Virtual DOM make React faster than vanilla JS?",
        answer: "No. Highly optimized vanilla JS will always be faster because React adds the overhead of the VDOM and diffing. However, React is fast *enough* and makes it much easier to write maintainable applications without manually optimizing every DOM operation.",
        tips: "Maintainability vs Raw Speed."
      },
      {
        id: 3,
        question: "What is the 'Key' prop's role in Reconciliation?",
        answer: "Keys allow React to identify which items in a list have changed, moved, or been deleted. Without keys, if you insert an item at the top, React might mutate every single sibling to match the new order. With keys, it knows to just move the nodes.",
        tips: "O(n) heuristic."
      }
    ]
  },
  {
    id: 'build-your-own-react',
    title: 'Build Your Own React',
    blocks: [
      {
        type: 'theory',
        title: 'Recreating useState',
        content: `How does \`useState\` remember values between function calls? It uses **Closures**.
        
React keeps an array of state values outside your component. Each hook call accesses the next index in that array.`
      },
      {
        type: 'code',
        language: 'javascript',
        title: 'Conceptual useState Implementation',
        code: `// Simple Module Pattern to simulate React internals
const React = (function() {
  let hooks = [];
  let idx = 0;

  function useState(initVal) {
    const state = hooks[idx] || initVal;
    const _idx = idx; // Freeze index for this hook
    
    const setState = (newVal) => {
      hooks[_idx] = newVal;
    };

    idx++; // Move to next hook for next call
    return [state, setState];
  }

  function render(Component) {
    idx = 0; // Reset index for re-render
    const C = Component();
    C.render();
    return C;
  }

  return { useState, render };
})();`
      }
    ],
    interviewQuestions: [
      {
        id: 1,
        question: "Why can't you put Hooks inside loops?",
        answer: "As seen in the implementation, React relies on the *order* of hook calls to map them to the correct state index. If a loop changes the number of hooks called, the indices shift, and `useState` returns the wrong data for subsequent hooks.",
        tips: "Order dependence."
      },
      {
        id: 2,
        question: "What is a Closure?",
        answer: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In React, closures allow event handlers and effects to 'remember' the props and state from the render they were created in.",
        tips: "Function + Lexical Scope."
      },
      {
        id: 3,
        question: "How does React know which component a hook belongs to?",
        answer: "React keeps track of the 'currently rendering component' in a global variable. When a hook is called, it attaches itself to the fiber node of that active component.",
        tips: "Global 'Current' pointer."
      }
    ]
  }
];

import { javaCourse } from './javaData';

export const courses = [
  {
    id: 'react-mastery',
    title: 'React.js Mastery',
    description: 'From Zero to Hero in React.js',
    icon: 'FaReact',
    topics: [
      {
        id: 'history-imperative-declarative',
        title: 'History, Imperative vs Declarative, & Babel',
        blocks: [
          {
            type: 'theory',
            title: 'The History of React',
            content: `React was created by Jordan Walke, a software engineer at Facebook, and was first deployed on Facebook's News Feed in 2011 and later on Instagram.com in 2012. It was open-sourced at JSConf US in May 2013.

Before React, developers used libraries like jQuery or frameworks like Angular 1.x, which often led to "spaghetti code" and performance issues due to direct DOM manipulation. React introduced a revolutionary concept: a component-based architecture with a Virtual DOM.`
          },
          {
            type: 'theory',
            title: 'Imperative vs Declarative Programming',
            content: `React follows a **Declarative** paradigm, whereas traditional JavaScript (DOM manipulation) is **Imperative**.

- **Imperative**: You tell the computer *how* to do something, step by step (e.g., "Select the div, then create a p tag, then set its text, then append it").
- **Declarative**: You tell the computer *what* you want to achieve (e.g., "I want a paragraph with this text here"), and React handles the "how".`
          },
          {
            type: 'code',
            language: 'javascript',
            title: 'Imperative vs Declarative Example',
            code: `// IMPERATIVE (Vanilla JS)
const container = document.getElementById('app');
const btn = document.createElement('button');
btn.innerText = 'Click me';
btn.addEventListener('click', () => {
  btn.innerText = 'Clicked!';
});
container.appendChild(btn);

// DECLARATIVE (React)
function App() {
  const [clicked, setClicked] = useState(false);
  return (
    <button onClick={() => setClicked(true)}>
      {clicked ? 'Clicked!' : 'Click me'}
    </button>
  );
}`
          },
          {
            type: 'diagram',
            title: 'How React Updates the UI',
            definition: `graph TD
    A[State Change] --> B(Virtual DOM Re-render)
    B --> C{Diffing Algorithm}
    C -->|Changes Detected| D[Update Real DOM]
    C -->|No Changes| E[Do Nothing]`
          },
          {
            type: 'example',
            title: 'Real World Analogy',
            content: `Think of **Imperative** as a taxi driver: You give turn-by-turn directions ("Turn left, then go straight, then stop").
            
Think of **Declarative** as Uber: You just set the destination ("I want to go to the airport"), and the driver figures out the best route.`
          },
          {
            type: 'theory',
            title: 'What is Babel?',
            content: `Browsers don't understand JSX (the HTML-like syntax used in React) or the latest JavaScript features immediately. **Babel** is a JavaScript compiler that transforms modern JS (ES6+) and JSX into backward-compatible JavaScript that can run in any browser.`
          }
        ],
        interviewQuestions: [
          {
            id: 1,
            question: "What is the difference between Imperative and Declarative programming?",
            answer: "Imperative programming focuses on describing *how* a program operates (step-by-step instructions), while Declarative programming focuses on *what* the program should accomplish without specifying the control flow. React is declarative because you describe the UI state, and React handles the DOM updates.",
            tips: "Use the Taxi vs Uber analogy to make it memorable."
          },
          {
            id: 2,
            question: "Why was React created if we already had jQuery and Angular?",
            answer: "React was created to solve the problem of building large applications with data that changes over time. It introduced the Virtual DOM to improve performance by minimizing direct DOM manipulation and enforced a unidirectional data flow for better predictability.",
            tips: "Focus on 'Performance' (Virtual DOM) and 'Maintainability' (Component-based)."
          },
          {
            id: 3,
            question: "What role does Babel play in a React application?",
            answer: "Babel is a transpiler that converts JSX and modern ES6+ JavaScript into plain ES5 JavaScript that older browsers can understand. Without Babel, browsers would throw syntax errors when encountering JSX tags.",
            tips: "Mention 'Transpiling' and 'JSX compatibility'."
          }
        ]
      },
      ...coreConceptsData,
      ...intermediateConceptsData,
      ...advancedRoutingData,
      ...advancedLogicData,
      ...expertInternalsData
    ]
  },
  javaCourse
];
