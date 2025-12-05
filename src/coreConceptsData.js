export const coreConceptsData = [
  {
    id: 'react-components',
    title: 'React Components',
    blocks: [
      {
        type: 'theory',
        title: 'Functional Components: The Modern Standard',
        content: `**What are they?**
At their core, Functional Components are just JavaScript functions that accept an argument (props) and return a description of the UI (JSX).

**Why Functional over Class?**
1.  **Mental Model**: It's easier to reason about "data in, UI out" with functions than managing \`this\` binding and lifecycle methods in classes.
2.  **Hooks**: Introduced in React 16.8, Hooks allowed functions to have state and side effects, making classes largely obsolete for new code.
3.  **Tree Shaking**: Functional components are easier for bundlers to minify and optimize.

**Deep Dive: Element vs. Component**
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
        type: 'theory',
        title: 'Default vs Named Exports',
        content: `**Default Export**: You can have only one default export per file. When importing, you can name it whatever you want.
        
**Named Export**: You can have multiple named exports per file. When importing, you must use the exact name inside curly braces \`{ }\`.
        
*Industry Tip*: Many teams prefer Named Exports for components to enforce consistent naming across the codebase, aiding refactoring and auto-imports.`
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
