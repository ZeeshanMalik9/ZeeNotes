import { coreConceptsData } from './coreConceptsData';
import { intermediateConceptsData } from './intermediateConceptsData';
import { advancedRoutingData } from './advancedRoutingData';
import { advancedLogicData } from './advancedLogicData';
import { expertInternalsData } from './expertInternalsData';

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
    }
];
