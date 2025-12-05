export const advancedRoutingData = [
  {
    id: 'react-router-setup',
    title: 'React Router Setup',
    blocks: [
      {
        type: 'theory',
        title: 'Modern Routing (v6.4+)',
        type: 'theory',
        title: 'Client-Side Routing: The Illusion',
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
