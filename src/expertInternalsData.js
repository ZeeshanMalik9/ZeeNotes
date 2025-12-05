export const expertInternalsData = [
  {
    id: 'class-components',
    title: 'Class Components (Legacy)',
    blocks: [
      {
        type: 'theory',
        title: 'The Old Way',
        type: 'theory',
        title: 'Class Components: The Legacy Era',
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
