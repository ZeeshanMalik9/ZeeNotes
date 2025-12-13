/* Gravity Courses - Java Masterclass Data 
   Contains: Basics, OOP, Collections (Merged), Advanced, Functional, Expert
*/

// ==========================================
// MODULE 1: JAVA BASICS & INTERNALS
// ==========================================
export const javaBasicsData = [
    {
        id: 'java-ecosystem',
        title: 'The Java Ecosystem: Internals',
        blocks: [
            {
                type: 'theory',
                title: 'The "Write Once, Run Anywhere" Architecture',
                content: `Java's architecture is built around three core components that work together to ensure platform independence:

1. **JDK (Java Development Kit)**:
   * **Role**: The toolbox for developers.
   * **Contains**: The Compiler (\`javac\`), the JRE, and tools like \`javadoc\` (documentation), \`jdb\` (debugger), and \`jar\` (archiver).
   * **Analogy**: The Chef's Kitchen (Ingredients + Tools + Stove).

2. **JRE (Java Runtime Environment)**:
   * **Role**: The environment required to *run* the app.
   * **Contains**: The JVM, core libraries (\`java.lang\`, \`java.util\`), and supporting files.
   * **Analogy**: The Customer's Table (Plate + Cutlery).

3. **JVM (Java Virtual Machine)**:
   * **Role**: The engine that executes the code.
   * **Function**: It acts as a translator. It takes the "universal" Bytecode and translates it into the specific "dialect" of the underlying hardware (Windows x64, Linux ARM, macOS M1).`
            },
            {
                type: 'example',
                title: 'Analogy: The Kitchen',
                content: `Think of Java as a **Restaurant Kitchen**:
                
*   **JDK**: The **Fully Stocked Kitchen**. It has stoves, knives, ingredients, and the Chef (Compiler).
*   **JRE**: The **Customer Area**. It has tables and cutlery (Libraries) where the food is served/run, but you can't cook there.
*   **JVM**: The **Head Chef**. He takes the written recipe (Bytecode) and actually cooks the food (Machine Code) for the specific customer.`
            },
            {
                type: 'diagram',
                title: 'Detailed Compilation Flow',
                definition: `graph TD
    A["Source Code (.java)"] -->|javac Compiler| B["Bytecode (.class)"]
    B -->|Classloader| C{"JVM Runtime"}
    C -->|Interpreter| D["Line-by-Line Execution"]
    C -->|JIT Compiler| E["Optimized Machine Code"]
    E --> F["OS / Hardware CPU"]
    D --> F`
            },
            {
                type: 'theory',
                title: 'Deep Dive: Bytecode & JIT Compilation',
                content: `**Bytecode**:
When you run \`javac Main.java\`, you get \`Main.class\`. This file contains **Bytecode**, which is a compact, optimized set of instructions for the JVM. It is **not** machine code (0s and 1s understood by the CPU). This is why \`.class\` files are cross-platform.

**JIT (Just-In-Time) Compiler**:
The JVM originally only "interpreted" bytecode line-by-line (which was slow). Modern JVMs use JIT.
1. **Interpretation**: Starts executing fast, but runs slowly.
2. **Profiling**: The JVM watches to see which methods are called often ("Hot Spots").
3. **Compilation**: The JIT compiles those "Hot Spots" into native machine code *while the program is running*.
4. **Optimization**: It can even re-compile code if assumptions change! This allows Java to rival C++ in long-running server applications.`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "Why is Java both compiled and interpreted?",
                answer: "Java is compiled (by javac) into Bytecode, which is an intermediate binary format. This Bytecode is then interpreted (or JIT-compiled) by the JVM at runtime. This hybrid approach allows for platform independence (via Bytecode) while maintaining high performance (via JIT compilation).",
                tips: "Hybrid nature is key."
            },
            {
                id: 2,
                question: "What is the difference between JDK, JRE, and JVM?",
                answer: "JDK = JRE + Development Tools (javac). JRE = JVM + Library Classes. JVM = The runtime engine that executes Bytecode.",
                tips: "Remember the hierarchy."
            }
        ]
    },
    {
        id: 'java-anatomy',
        title: 'Anatomy of a Java Program',
        blocks: [
            {
                type: 'code',
                language: 'java',
                title: 'The Entry Point Dissected',
                code: `public class ApplicationUtils {
    
    // The Master Key: Standard Entry Point
    public static void main(String[] args) {
        System.out.println("Application Started");
        
        // args contains command line parameters
        if (args.length > 0) {
            System.out.println("Argument 1: " + args[0]);
        }
    }
}`
            },
            {
                type: 'theory',
                title: 'Deconstructing `public static void main`',
                content: `Every keyword serves a specific architectural purpose:

1. **public**: Access Modifier. The JVM (which is technically an "external" caller) needs permission to access this method to verify and execute it.
2. **static**: Memory Modifier. The method belongs to the *class* itself, not an instance. The JVM calls this *before* it has created any objects of your class. Conceptually, it asks the class to start itself.
3. **void**: Return Type. The main method does not return a value to the OS. (Program status is handled via \`System.exit(int status)\`).
4. **main**: The Identifier. The JVM is hardcoded to look for a method with this exact name and signature.
5. **String[] args**: Parameter. An array of Strings passed from the command line (e.g., \`java MyApp --debug --port=8080\`).`
            },
            {
                type: 'theory',
                title: 'Class & File Naming Conventions',
                content: `**The File Name Rule**:
In Java, if a class is declared \`public\`, the file **must** have the exact same name as the class, plus the \`.java\` extension.
* Class: \`public class UserContext\`
* File: \`UserContext.java\`

**PascalCase**: Classes should always use PascalCase (Capitalize every word).
**camelCase**: Methods and variables should use camelCase (lower first word, capital others).`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "Can main() be private?",
                answer: "No. If you make main private, the code will compile successfully (as it's valid Java), but the JVM will fail to run it, throwing a 'Main method not found' identifier error because it cannot access the method to start the entry point.",
                tips: "Distinguish Compile-time vs Runtime."
            },
            {
                id: 2,
                question: "What happens if you remove 'static' from main?",
                answer: "The code compiles, but at runtime, the JVM throws an error. The JVM does not know how to create an instance of your class to call the method (constructor arguments? dependency injection?). It expects a static entry point."
            }
        ]
    },
    {
        id: 'java-variables-memory',
        title: 'Variables, Types & Memory Management',
        blocks: [
            {
                type: 'theory',
                title: 'Primitive Data Types',
                content: `Java has 8 Primitive types. They hold the **value** itself.`
            },
            {
                type: 'table',
                title: 'The 8 Primitive Pillars',
                headers: ['Type', 'Size', 'Range / Note'],
                rows: [
                    ['**byte**', '8-bit', '-128 to 127 (Very small, rarely used)'],
                    ['**short**', '16-bit', '-32,768 to 32,767'],
                    ['**int**', '32-bit', '-2^31 to 2^31-1 (Default for integers)'],
                    ['**long**', '64-bit', '-2^63 to 2^63-1 (Use \'L\' suffix: `9000L`)'],
                    ['**float**', '32-bit', '~6-7 decimal digits (Use \'f\' suffix: `3.14f`)'],
                    ['**double**', '64-bit', '~15 decimal digits (Default for decimals)'],
                    ['**char**', '16-bit', '0 to 65,535 (Unsigned Unicode character)'],
                    ['**boolean**', 'Varies', '`true` or `false` (Size is JVM dependent)']
                ]
            },
            {
                type: 'theory',
                title: 'Type Casting & Autoboxing',
                content: `**Type Casting & Promotion**:
1. **Widening (Implicit)**: Converting smaller to larger (e.g., \`int\` -> \`double\`). Safe, done automatically.
   * \`int myInt = 9; double myDouble = myInt;\` // 9.0
2. **Narrowing (Explicit)**: Converting larger to smaller (e.g., \`double\` -> \`int\`). RISKY, data loss possible. You must force it.
   * \`double myPi = 3.14; int myInt = (int) myPi;\` // 3 (0.14 lost)

**Autoboxing & Unboxing**:
* **Autoboxing**: Automatic conversion of primitive to Wrapper (e.g., \`int\` to \`Integer\`).
* **Unboxing**: Automatic conversion of Wrapper to primitive.
* *Note*: Convenient but has a performance cost.`
            },
            {
                type: 'diagram',
                title: 'Stack vs Heap: The Memory Model',
                definition: `graph TD
    subgraph Stack ["Stack Memory (Per Thread)"]
    A["Frame: main()"]
    B["int age = 25"]
    C["String name = @Ref1"]
    D["Person p = @Ref2"]
    end
    
    subgraph Heap ["Heap Memory (Global)"]
    E["Object: 'Alice'"]:::heap
    F["Object: Person { id: 1 }"]:::heap
    end
    
    C --> E
    D --> F
    
    classDef heap fill:#f9f,stroke:#333,stroke-width:2px;`
            },
            {
                type: 'theory',
                title: 'Reference Types & Memory',
                content: `**Reference Types** (Interfaces, Classes, Arrays) do not store data directly in the variable.
1. **The Reference**: stored on the **Stack**. Think of it as a remote control.
2. **The Object**: stored on the **Heap**. Think of it as the TV.

**Consequences**:
* \`int a = 5; int b = a;\`: Copies the value 5. Changing \`b\` does not affect \`a\`.
* \`Person p1 = new Person(); Person p2 = p1;\`: Copies the *remote control*. Both now point to the *same TV*. Changing \`p2.name\` WILL change \`p1.name\`.

**Analogy: Stack vs Heap**:
* **Stack (Short Term)**: Like a **Sticky Note** on your desk. Fast, small, throws away when task is done.
* **Heap (Long Term)**: Like a **Warehouse**. Huge, stores everything, but takes time to find things (unless you have the address/reference).`
            },
            {
                type: 'theory',
                title: 'Why isn\'t Java 100% Object-Oriented?',
                content: `Because of **Primitives**.
In a pure OOP language (like Ruby or Smalltalk), everything is an object. \`1.plus(2)\`.
In Java, \`int i = 5\` is not an object. It has no methods. It is a raw memory value. This was a design choice for **Performance** (objects have memory overhead) but breaks pure OOP principles.`
            },
            {
                type: 'example',
                title: 'Analogy: Sticky Note vs Warehouse',
                content: `**Stack Memory** is like a **Sticky Note**.
*   It's on your desk (fast access).
*   It's small (limited space).
*   When you finish the task, you crumple it up and throw it away immediately (Memory cleared).
                
**Heap Memory** is like a **Warehouse**.
*   It's huge (lots of space).
*   You can store large furniture (Objects) there.
*   To find anything, you need its address (Reference) written on your Sticky Note.`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "What is the size of an int vs an Integer?",
                answer: "A primitive `int` takes exactly 32 bits (4 bytes) of stack memory. An `Integer` is an object wrapper. It has a significantly larger footprint (header + payload + padding/alignment) on the Heap (approx 16-24 bytes) plus the 32-bit reference on the Stack.",
                tips: "Overhead of Objects."
            },
            {
                id: 2,
                question: "Does Java allow pointer arithmetic?",
                answer: "No. While Java uses pointers (references) under the hood to access objects, it does not allow explicit pointer arithmetic (like `ptr++` in C++) for security reasons. This prevents direct memory access and buffer overflow attacks.",
                tips: "Security & Safety."
            },
            {
                id: 3,
                question: "Is Java Pass-by-Value or Pass-by-Reference?",
                answer: "Java is **ALWAYS Pass-by-Value**. For primitives, it copies the actual value (e.g., 5). For objects, it copies the **Reference Address** (the remote control), NOT the object itself. This is why you can change the *contents* of an object passed to a method, but you cannot swap the original object for a new one.",
                tips: "Copying the remote."
            }
        ]
    },
    {
        id: 'java-operators-math',
        title: 'Operators & The Math Class',
        blocks: [
            {
                type: 'theory',
                title: 'Arithmetic "Gotchas"',
                content: `**Integer Division**:
\`5 / 2\` is \`2\`, NOT \`2.5\`.
Because both operands are integers, the result is truncated to an integer.
*Fix*: Cast one to double: \`(double) 5 / 2\` gives \`2.5\`.

**Post vs Pre-Increment**:
* \`x++\` (Post): Use, then increment.
* \`++x\` (Pre): Increment, then use.`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Bitwise Deep Dive',
                code: `int a = 60; /* 60 = 0011 1100 */
int b = 13; /* 13 = 0000 1101 */
int c = 0;

c = a & b;       /* 12 = 0000 1100 (AND - both 1) */
c = a | b;       /* 61 = 0011 1101 (OR - either 1) */
c = a ^ b;       /* 49 = 0011 0001 (XOR - different) */
c = ~a;          /* -61 = 1100 0011 (NOT - invert all) */

// Shift Operators
c = a << 2;     /* 240 = 1111 0000 (Left Shift - Multiply by 2^n) */
c = a >> 2;     /* 15 = 1111 (Signed Right Shift - Div by 2^n) */
c = a >>> 2;    /* 15 = 0000 1111 (Unsigned Right Shift - Zero Fill) */`
            },
            {
                type: 'code',
                language: 'java',
                title: 'The Math Class Essentials',
                code: `// Absolute Value
int gap = Math.abs(-10); // 10

// Max / Min
int best = Math.max(10, 20); // 20
int worst = Math.min(10, 20); // 10

// Power & Root
double square = Math.pow(5, 2); // 25.0
double root = Math.sqrt(25); // 5.0

// Random
// Returns double between 0.0 and 1.0 (exclusive)
double chance = Math.random(); 
// Dice Roll (1-6)
int dice = (int)(Math.random() * 6) + 1;`
            },
            {
                type: 'theory',
                title: 'BigInteger & BigDecimal',
                content: `**Why Double Fails for Money**:
Floating point numbers follow IEEE 754, which cannot precisely represent base-10 fractions (like 0.1).
\`0.1 + 0.2\` results in \`0.30000000000000004\`.

**BigDecimal**:
Always use \`BigDecimal\` for financial calculations.
*Best Practice*: Initialize with String: \`new BigDecimal("0.1")\`. (Initializing with double \`new BigDecimal(0.1)\` preserves the inaccuracy).`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "Why should you prefer BigDecimal(String) constructor?",
                answer: "Because the `double` constructor (e.g., `new BigDecimal(0.1)`) passes the exact floating-point representation of 0.1 used by the computer, which is slightly different from 0.1 (something like 0.100000001). The String constructor parses the exact characters '0.1' into a precise decimal.",
                tips: "Precision loss source."
            }
        ]
    },
    {
        id: 'java-control-flow-modern',
        title: 'Modern Control Flow',
        blocks: [
            {
                type: 'code',
                language: 'java',
                title: 'Loops Overview',
                code: `// 1. Classic For Loop (Index based)
for (int i = 0; i < 5; i++) { ... }

// 2. Enhanced For-Each (Read-Only access)
// Best for generic iteration over arrays/collections
String[] names = {"Leo", "Mike"};
for (String name : names) {
    System.out.println(name);
}

// 3. While (Check then Run)
while (condition) { ... }

// 4. Do-While (Run then Check - Guaranteed 1 run)
do {
    // executes at least once
} while (condition);`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Enhanced Switch (Java 14+)',
                code: `// The "Old" Way (Statement)
switch (day) {
    case "MONDAY":
        System.out.println("Start");
        break; // Dangerous fall-through risk
}

// The "New" Way (Expression)
// 1. Returns a value
// 2. Uses '->' arrow (No fall-through)
// 3. Uses 'yield' for complex blocks
String result = switch (day) {
    case "MONDAY", "FRIDAY" -> "Work"; 
    case "TUESDAY" -> "Prepare";
    case "SUNDAY" -> {
        System.out.println("Relaxing");
        yield "Weekend";
    }
    default -> "Unknown";
};`
            },
            {
                type: 'theory',
                title: 'Variable Type Inference (var)',
                content: `Introduced in Java 10. The compiler "guesses" the type based on the assignment.
        
**Rules**:
1. Must imply type immediately (\`var x = "Hello"\`).
2. Cannot contain null (\`var x = null\` ❌).
3. **Local Scope Only**: No fields, no method parameters.
4. Why use it? Reduces verbosity for complex generic types like \`Map<String, List<Transaction>>\`.

**Analogy: Traffic Control**:
*   **If/Else**: A Stop Sign. Check condition, then go.
*   **Switch**: A Roundabout. Take the exit that matches your destination.
*   **Loops**: A Race Track. You go around until the flag drops.`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "What is the 'break' vs 'continue' statement?",
                answer: "`break` immediately terminates the loop completely. `continue` skips the current iteration and jumps to the next cycle of the loop.",
                tips: "Loop control."
            },
            {
                id: 2,
                question: "When should you use 'do-while'?",
                answer: "When you need the loop body to execute **at least once** regardless of the condition, such as displaying a menu to a user where they must make a selection at least once before quitting.",
                tips: "Guaranteed execution."
            }
        ]
    }
];

// ==========================================
// MODULE 2: OBJECT-ORIENTED PROGRAMMING (OOP)
// ==========================================
export const javaOOPData = [
    {
        id: 'java-classes-objects',
        title: 'Classes, Objects & Memory Model',
        blocks: [
            {
                type: 'theory',
                title: 'The Blueprint vs. The Reality',
                content: `**The Class (Blueprint)**: A template that defines structure, loaded in the **Method Area** (Metaspace). Logic (methods) and field definitions live here.

**The Object (Reality)**: An actual instance created via \`new\`. It lives in the **Heap**. It holds specific data (state).`
            },
            {
                type: 'example',
                title: 'Analogy: Blueprints vs Houses',
                content: `**Class (Blueprint)**: The Architect's drawing. It shows where the walls and windows go. You cannot live in the drawing. There is only ONE drawing.
                
**Object (House)**: The actual building made from the drawing. You can build 50 identical houses (Objects) from one blueprint. Each house has its own address and families living inside (State).`
            },
            {
                type: 'diagram',
                title: 'Reference Variable vs Object',
                definition: `graph LR
    subgraph StackMem [Stack Memory]
    A[User u1]
    end
    
    subgraph HeapMem [Heap Memory]
    B[Object: User name: John]:::heap
    end
    
    A -->|Pointer 0x123| B
    
    classDef heap fill:#f9f,stroke:#333;`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Creating an Object',
                code: `// 1. Declaration: "Space for a remote control" (Stack)
User user; 

// 2. Instantiation: "Build the TV" (Heap)
new User();

// 3. Initialization: "Link remote to TV"
user = new User();`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "Where does a Reference Variable live?",
                answer: "Local reference variables live on the Stack. Instance reference variables (fields inside a class) live on the Heap inside the object they belong to.",
                tips: "Context matters."
            },
            {
                id: 2,
                question: "Explain the 4 Pillars of OOP?",
                answer: "**Encapsulation**: Protecting data (private fields + getters). **Inheritance**: Code reusability (is-a relationship). **Polymorphism**: One interface, multiple forms (Overriding/Overloading). **Abstraction**: Hiding complexity (Abstract Class/Interface).",
                tips: "E-I-P-A acronym."
            }
        ]
    },
    {
        id: 'java-constructors',
        title: 'Constructors & The `this` Keyword',
        blocks: [
            {
                type: 'theory',
                title: 'Constructors: The Initialization Hook',
                content: `A Constructor is a special block of code called **immediately** when an object is created. Use it to set initial states.

**Types of Constructors**:

1. **Default Constructor (Implicit)**:
   * **Provided by**: The Java Compiler (javac).
   * **When**: ONLY if you write **ZERO** constructors in your class.
   * **Behavior**: Initializes numeric types to 0, booleans to false, and objects to null.

2. **No-Args Constructor (Explicit)**:
   * **Provided by**: You (The Developer).
   * **Syntax**: \`public User() { ... }\`
   * **Use Case**: Setting manual default values (e.g., \`this.status = "ACTIVE"\`) or initializing empty lists.

3. **Parameterized Constructor**:
   * **Provided by**: You.
   * **Syntax**: \`public User(String name, int age) { ... }\`
   * **Use Case**: Forcing the caller to provide essential data at the moment of creation. You cannot create a User without a name.`
            },
            {
                type: 'example',
                title: 'Analogy: Setting up a Phone',
                content: `A **Constructor** is like the **Setup Wizard** when you buy a new phone.
                
*   You open the box (new Object).
*   You CANNOT use the phone yet.
*   The Setup Wizard runs immediately: "Select Language", "Connect to WiFi" (Constructor Logic).
*   Only after setup is complete is the phone ready for use.`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Constructor Chaining & this()',
                code: `class BankAccount {
    String owner;
    double balance;

    // 1. Parameterized Constructor
    public BankAccount(String owner, double balance) {
        // 'this' refers to the CURRENT object being created
        this.owner = owner; 
        this.balance = balance;
    }

    // 2. Constructor Chaining (Overloaded)
    // Calls the main constructor with a default value
    public BankAccount(String owner) {
        this(owner, 0.0); // Must be the FIRST line
    }
}`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "What is the difference between this and this()?",
                answer: "`this` is a reference to the current object instance. `this()` is a constructor call to another constructor within the same class (used for chaining).",
                tips: "Reference vs Call."
            }
        ]
    },
    {
        id: 'java-static',
        title: 'The static Keyword',
        blocks: [
            {
                type: 'theory',
                title: 'Class Level vs Instance Level',
                content: `**Instance (Non-Static)**: Belongs to the **Object**. Each object has its own copy. (e.g., \`user.name\`).
        
**Static**: Belongs to the **Class**. Shared by ALL objects. There is only one copy in memory. (e.g., \`Math.PI\`, \`Company.CEO\`).`
            },
            {
                type: 'example',
                title: 'Analogy: The Notice Board',
                content: `Imagine an Apartment Building.
                
*   **Instance Variable**: Your personal diary inside your flat. Only you can write in it. Every flat has a different diary.
*   **Static Variable**: The Notice Board in the lobby. There is only ONE board. If the Manager posts "No Water Today", everyone sees the *same* message.`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Static Context',
                code: `class Counter {
    static int count = 0; // Shared memory
    int id; // Per-object memory

    public Counter() {
        count++; // Increment the global counter
        this.id = count;
    }
    
    public static void printCount() {
        // System.out.println(id); // ERROR! Static cannot touch non-static
        System.out.println(count); // OK
    }
}`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "Why can't a static method access non-static variables?",
                answer: "Because static methods belong to the class and can run *without* any object instance existing. Non-static variables (instance variables) only exist *inside* an object. You cannot access 'my object's data' if the object doesn't exist yet.",
                tips: "Lifecycle mismatch."
            },
            {
                id: 2,
                question: "Can you override a static method?",
                answer: "No. You can define a static method with the same signature in the child class, but this is called **Method Hiding**, not overriding. The parent's method is hidden, not replaced. Which one gets called depends on the Class Reference type at compile time, not the runtime object.",
                tips: "Hiding vs Overriding."
            }
        ]
    },
    {
        id: 'java-encapsulation',
        title: 'Encapsulation & Access Modifiers',
        blocks: [
            {
                type: 'theory',
                title: 'Data Hiding & Protection',
                content: `Encapsulation means wrapping data (fields) and methods together and hiding implementation details.
        
**Access Modifiers (The Security Gates):**
1. **private**: Only within the same CLASS. (Use for fields).
2. **default** (no keyword): Only within the same PACKAGE.
3. **protected**: Same package + Subclasses (even if outside package).
4. **public**: Accessible everywhere.`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Modern Encapsulation: Java Records (Java 16+)',
                code: `// The Old Way (Boilerplate)
class User {
    private final String name;
    public User(String name) { this.name = name; }
    public String getName() { return name; }
    // + hashCode, equals, toString...
}

// The New Way (Record)
// Automatically generates:
// 1. Private final fields
// 2. Public constructor
// 3. Getters (name(), not getName())
// 4. equals(), hashCode(), toString()
public record User(String name, int age) {}`
            },
            {
                type: 'theory',
                title: 'Real-World Analogy: The Capsule',
                content: `Think of a **Medical Capsule**:
1. **Medicine (Data)**: Useful but dangerous if touched directly.
2. **Shell (Methods/Getters/Setters)**: Protects the medicine and controls how it is consumed.
        
In Java, we hide the data (private fields) and only allow access through controlled methods (public getters/setters). This allows us to add validation logic later (e.g., \`setAge(int age)\` can check if age > 0).`
            },
            {
                type: 'example',
                title: 'Analogy: The Car Hood',
                content: `You don't drive a car by manually injecting fuel into the cylinders.
                
*   **Encapsulation**: The engine is sealed under the hood (Private).
*   **Interface**: You use the Pedals and Steering Wheel (Public Methods).
*   **Protection**: Moving the steering wheel is safe. Touching the engine block while running burns your hand.`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Immutability Pattern',
                code: `// How to create an Immutable Class (like String)
public final class ImmutableUser {
    private final String name;
    
    public ImmutableUser(String name) {
        this.name = name;
    }
    
    public String getName() {
        return name;
    }
    // No Setters provided! State cannot change after creation.
}`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "What is the difference between private, protected, public, and default?",
                answer: "**private**: Visible only within the class. **default** (package-private): Visible within the same package. **protected**: Visible within package + subclasses outside package. **public**: Visible everywhere.",
                tips: "Scope increases: private -> default -> protected -> public"
            },
            {
                id: 2,
                question: "What is a POJO?",
                answer: "Plain Old Java Object. It is an ordinary object that is not bound by any special restriction (not implementing EJB/specific interfaces). Usually has private fields, public getters/setters, and a no-arg constructor.",
                tips: "Simple data carrier."
            },
            {
                id: 3,
                question: "Why should fields be private?",
                answer: "To maintain **Encapsulation**. It gives the class control over its own state. The class can enforce invariants (e.g., non-negative age) in setters. It also loosens coupling; you can change the internal representation without breaking external code.",
                tips: "Control & Flexibility."
            }
        ]
    },
    {
        id: 'java-inheritance',
        title: 'Inheritance & Object Hierarchy',
        blocks: [
            {
                type: 'theory',
                title: 'The "IS-A" Relationship',
                content: `Inheritance allows a child class to acquire the properties (fields) and behavior (methods) of a parent class.

**Types of Inheritance**:
1. **Single Inheritance**: Class B extends A. (Simple Parent-Child).
2. **Multilevel Inheritance**: Class C extends B, B extends A. (Grandparent -> Parent -> Child).
3. **Hierarchical Inheritance**: Class B extends A, Class C extends A. (One Parent, Multiple Children).

**What is NOT Supported?**:
* **Multiple Inheritance (Classes)**: Java does **NOT** support one class extending two classes (e.g., \`class C extends A, B\`).
* **Reason**: The **Diamond Problem**. If A and B both have a method \`run()\`, which one does C inherit? To avoid this ambiguity, Java forbids it.
* *Note*: You CAN implement multiple Interfaces.`
            },
            {
                type: 'example',
                title: 'Analogy: Genetic Traits',
                content: `**Inheritance** is like **DNA**.
                
*   **Parent**: The Father. Has "Blue Eyes" (Method).
*   **Child**: The Son. Automatically has "Blue Eyes" (Inherited).
*   **Overriding**: The Son dyes his hair red. He *changes* the behavior he inherited.
*   **super()**: Asking Dad for money. You use the Parent's resources.`
            },
            {
                type: 'diagram',
                title: 'Inheritance Tree',
                definition: `graph TD
    A["Object (The God Class)"]
    B["Animal"]
    C["Dog"]
    D["Cat"]
    
    B -->|extends| A
    C -->|extends| B
    D -->|extends| B`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Super & Overriding',
                code: `class Dog extends Animal {
        @Override
        public void makeSound() {
            super.makeSound(); // Call Parent logic first
            System.out.println("Bark!");
        }
    }`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "What is the Diamond Problem?",
                answer: "It occurs in languages with Multiple Inheritance (like C++) when a class inherits from two classes that both define the same method. Java avoids this by only allowing single class inheritance. Interface multiple inheritance is safe because interfaces have no state (fields) and default methods have specific resolution rules.",
                tips: "Ambiguity resolution."
            }
        ]
    },
    {
        id: 'java-polymorphism',
        title: 'Deep Dive: Polymorphism & Binding',
        blocks: [
            {
                type: 'theory',
                title: '1. Compile-time Polymorphism (Static Binding)',
                content: `**What is it?**
When the compiler determines *which* method to call **before** the program runs. This happens with **Method Overloading**.

**Why "Static"?**
Because the decision is "fixed" (static) at compile time.

**How it works**:
The compiler looks at the **Reference Type** and the **Arguments** passed.
\`void add(int a)\` vs \`void add(double a)\`.
If you pass \`10\`, the compiler *knows* to link the call to the \`int\` version. No runtime check is needed.`
            },
            {
                type: 'theory',
                title: '2. Runtime Polymorphism (Dynamic Binding)',
                content: `**What is it?**
When the JVM determines which method to call **while** the program is running. This happens with **Method Overriding**.

**The Magic of "Dynamic Dispatch"**:
1. **Code**: \`Animal a = new Dog(); a.makeSound();\`
2. **Compiler**: Checks if \`Animal\` has a \`makeSound()\` method. Yes? Great, valid code.
3. **Runtime (JVM)**: The JVM sees the actual object in the Heap is a **Dog**. It ignores the Reference Type (Animal) and calls **Dog's** \`makeSound()\`.

**Key Rule**: Methods are called based on the **Actual Object**, not the Reference Variable.

    
**Analogy**:
*   **Reference**: A generic "JVC Remote" (Parent).
*   **Object**: You can point it at a TV, a DVD Player, or a Sound System (Children).
*   **Action**: Pressing "Power" (Method) allows each device to react differently (TV turns on screen, Sound System plays beep). You don't need a different remote for each.`
            },
            {
                type: 'example',
                title: 'Analogy: The Universal Remote',
                content: `**Polymorphism** is like a **Universal Remote**.
                
*   **Reference**: The generic remote in your hand.
*   **Object**: You point it at a TV, then a Stereo, then a Projector.
*   **Action**: You press the "Power" button (Method).
*   **Result**: The TV lights up, the Stereo beeps, the Projector fans spin. The *same action* produces *different styles of behavior* depending on what you pointed at.`
            },
            {
                type: 'diagram',
                title: 'Memory View: Dynamic Dispatch',
                definition: `graph LR
    subgraph Stack
    Ref["Animal a"]
    end
    
    subgraph Heap
    Obj["Dog Object"]:::heap
    VTable["Dog's Method Table"]
    end
    
    Ref -->|Points to| Obj
    Obj -.->|Looks up| VTable
    VTable -->|Executes| Code["Dog.makeSound()"]
    
    classDef heap fill:#f9f,stroke:#333;`
            },
            {
                type: 'code',
                language: 'java',
                title: 'The Specifics: Upcasting',
                code: `Animal a = new Dog(); // Upcasting

// 1. Methods Follow the Object (Runtime)
a.makeSound(); // Prints "Bark" (Dog's version)

// 2. Variables Follow the Reference (Compile-time)
// WARNING: Variables are NOT polymorphic!
System.out.println(a.name); // Prints "Animal Name"

// 3. Static Methods Follow the Reference
// Static methods cannot be overridden, only "hidden".
a.sleep(); // Runs Animal.sleep(), NOT Dog.sleep()`
            },
            {
                type: 'theory',
                title: 'Why Variables are Static Bound?',
                content: `This is a common interview trap. **Polymorphism applies ONLY to instance methods.**

* **Instance Variables**: Resolved by Compiler (Reference Type).
* **Static Methods**: Resolved by Compiler (Reference Type).
* **Private Methods**: Resolved by Compiler (Reference Type - cannot be overridden).
* **Instance Methods**: Resolved by JVM (Object Type).

*Why?* Because fields are just memory definitions using offsets. Changing that at runtime is dangerous and slow. Methods are behavior, so swapping them is useful.`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "What is Dynamic Method Dispatch?",
                answer: "It is the mechanism by which Java resolves a call to an overridden method at runtime. The JVM ignores the reference type and looks up the actual object's method table (vtable) to execute the child class's implementation.",
                tips: "Mechanism of Overriding."
            },
            {
                id: 2,
                question: "Does Polymorphism apply to Instance Variables?",
                answer: "No. Instance variables are resolved at Compile-time based on the Reference Type. If both Parent and Child have a variable 'int x', 'Parent p = new Child(); System.out.println(p.x);' will print the Parent's value. This is known as **Variable Hiding**.",
                tips: "Variables != Methods."
            },
            {
                id: 3,
                question: "Can you override a private method?",
                answer: "No. Private methods are not visible to child classes, so they cannot be overridden. If you define a method with the same name in the child, it is a completely new, unrelated method. Binding is static (compile-time).",
                tips: "Visibility blocks inheritance."
            }
        ]
    },
    {
        id: 'java-abstraction',
        title: 'Abstraction: Interfaces vs Abstract Class',
        blocks: [
            {
                type: 'theory',
                title: 'The Contract',
                content: `**Abstract Class**: A partial blueprint. Can have shared state (fields) and mixed methods (abstract + concrete). Use when classes are closely related (sharing code).
            
**Interface**: A pure contract. No state (fields are static final). All methods are public abstract (historically). Use for capabilities (e.g., \`Runnable\`, \`Serializable\`).`
            },
            {
                type: 'example',
                title: 'Analogy: The Power Socket',
                content: `A **Power Socket** is an **Interface**.
                
*   **Contract**: It guarantees "If you have 2 pins, I will give you electricity."
*   **Implementation**: It doesn't care if you plug in a TV, a Toaster, or a Laptop (Classes). As long as they "implement" the 2-pin plug, they work.
*   This decouples the energy source from the appliance.`
            },
            {
                type: 'table',
                title: 'Comparison: Abstract Class vs Interface',
                headers: ['Feature', 'Abstract Class', 'Interface'],
                rows: [
                    ['**Methods**', 'Abstract + Concrete', 'Abstract + Default + Static'],
                    ['**State**', 'Can have non-final fields', 'All fields are `public static final`'],
                    ['**Constructor**', 'Yes (for subclasses)', 'No'],
                    ['**Inheritance**', 'Single (`extends`)', 'Multiple (`implements`)'],
                    ['**Purpose**', '"Is-A" (Related classes)', '"Can-Do" (Capabilities)']
                ]
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "Can an abstract class have a constructor?",
                answer: "Yes. Even though you cannot instantiate an abstract class directly (\`new Abstract()\`), it needs a constructor to initialize its own fields when a subclass is created. The subclass constructor calls \`super()\`.",
                tips: "Initialization chain."
            },
            {
                id: 2,
                question: "What is a Functional Interface?",
                answer: "An interface with exactly **one abstract method**. Examples: \`Runnable\`, \`Callable\`, \`Comparator\`. They are the basis for **Lambda Expressions** in Java 8.",
                tips: "Single Abstract Method (SAM)."
            }
        ]
    },
    {
        id: 'java-advanced-oop',
        title: 'Advanced OOP: final & Object Methods',
        blocks: [
            {
                type: 'theory',
                title: 'The `final` Keyword',
                content: `1. **final variable**: Value cannot change (Constant).
2. **final method**: Cannot be overridden by subclass.
3. **final class**: Cannot be inherited (e.g., \`String\`, \`System\`).`
            },
            {
                type: 'code',
                language: 'java',
                title: 'The Object Contract',
                code: `public class User {
    // 1. toString (for debugging)
    @Override
    public String toString() { return "User(" + name + ")"; }
    
    // 2. equals (logic equality)
    @Override
    public boolean equals(Object o) { ... }
    
    // 3. hashCode (for HashMaps)
    @Override
    public int hashCode() { ... }
}`
            },
            {
                type: 'code',
                language: 'java',
                title: 'The equals() and hashCode() Contract',
                code: `// If you override equals, you MUST override hashCode.
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    User user = (User) o;
    return id == user.id;
}

@Override
public int hashCode() {
    return Objects.hash(id); // Consistent with equals
}

// Why?
// If a.equals(b) is true, then a.hashCode() MUST equal b.hashCode().
// Violating this breaks HashSets and HashMaps.`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "What is the difference between final, finally, and finalize?",
                answer: "**final**: Keyword for constants/immutability (var, method, class). **finally**: Block in try-catch to execute cleanup code (guaranteed execution). **finalize**: Deprecated method called by Garbage Collector before object destruction (Do not use).",
                tips: "Keyword vs Block vs Method."
            },
            {
                id: 2,
                question: "Why is String immutable/final in Java?",
                answer: "Security (caching hashcodes, database URLs), Thread Safety (shared freely), and String Pool efficiency. Making it final prevents subclasses from breaking these guarantees.",
                tips: "Security & Pooling."
            }
        ]
    }
];

// ==========================================
// MODULE 3: COLLECTIONS & DATA STRUCTURES (CONSOLIDATED)
// ==========================================
export const javaCollectionsData = [
    {
        id: 'java-strings',
        title: 'Strings: The Special Class',
        blocks: [
            {
                type: 'theory',
                title: 'Immutability & String Pool',
                content: `**String Immutability**: Once a String object is created, it cannot be changed. If you modify it (e.g., \`s + " World"\`), a **NEW** object is created.

                content: \`** String Immutability**: Once a String object is created, it cannot be changed.If you modify it(e.g., \`s + " World"\`), a **NEW** object is created.`
            },
            {
                type: 'table',
                title: 'Comparison: String vs StringBuilder vs StringBuffer',
                headers: ['Feature', 'String', 'StringBuilder', 'StringBuffer'],
                rows: [
                    ['**Mutability**', 'Immutable (Cannot change)', 'Mutable (Can change)', 'Mutable (Can change)'],
                    ['**Thread Safety**', 'Safe (Thread-safe)', 'Not Safe (Fast)', 'Safe (Synchronized)'],
                    ['**Performance**', 'Slow (concatenation)', 'Fast', 'Slower than Builder'],
                    ['**Usage**', 'Constants, Keys, URLs', 'Loop concatenation', 'Legacy multithreading']
                ]
            },
            {
                type: 'theory',
                title: 'The String Constant Pool (SCP)',
                content: `A special area in the Heap memory.
- \`String s1 = "Hello";\` -> Checks SCP. If "Hello" exists, returns reference. If not, creates it.
- \`String s2 = "Hello";\` -> Returns SAME reference as s1.
- \`String s3 = new String("Hello");\` -> Forces a **NEW** object in the standard Heap (outside SCP), even if "Hello" is in SCP.`
            },
            {
                type: 'example',
                title: 'Analogy: The Tattoo',
                content: `**String** is like a **Tattoo**.
*   Once it's on your skin, you can't change it.
*   To "change" it (add a word), you essentially have to cover it up and draw a whole NEW tattoo.

**StringBuilder** is like a **Whiteboard**.
*   You can erase, scribble, and add text freely without buying a new board every time.`
            },
            {
                type: 'diagram',
                title: 'Memory: SCP vs Heap',
                definition: `graph TD
    subgraph Stack
    s1["s1"]
    s2["s2"]
    s3["s3"]
    end

    subgraph Heap
        subgraph SCP["String Constant Pool"]
        H1["'Hello' (Ref: 0x1)"]
        end
    
    H2["'Hello' (Ref: 0x2)"]:::heap
    end

    s1 --> H1
    s2 --> H1
    s3 --> H2

    classDef heap fill:#f96,stroke:#333;`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Performance: String vs StringBuilder',
                code: `// BAD: Creates 1000 objects in Heap!
String s = "";
for (int i = 0; i < 1000; i++) {
    s += i; // A new String is created EVERY iteration
}

// GOOD: Modifies the same object (Internal char[])
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i); // Fast & Efficient
}
String result = sb.toString();`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "Difference between String, StringBuilder, and StringBuffer?",
                answer: "**String**: Immutable. Slow for concatenation. **StringBuilder**: Mutable, Fast, Not Thread-Safe. **StringBuffer**: Mutable, Thread-Safe (Synchronized), Slower than Builder.",
                tips: "Immutable vs Mutable vs Thread-Safe."
            },
            {
                id: 2,
                question: "What is the difference between '==' and '.equals()'?",
                answer: "**==** is an operator that compares **object references** (memory addresses). It returns true only if both point to the exact same object. **.equals()** is a method that (in String and Wrappers) compares the **actual content** (values). Always use .equals() for strings.",
                tips: "Reference comparison vs Value comparison."
            }
        ]
    },
    {
        id: 'java-collections-hierarchy',
        title: 'The Collections Framework Hierarchy',
        blocks: [
            {
                type: 'diagram',
                title: 'Hierarchy Overview',
                definition: `graph TD
    Iterable --> Collection
    Collection --> List
    Collection --> Set
    Collection --> Queue
    
    List --> ArrayList
    List --> LinkedList
    
    Set --> HashSet
    Set --> TreeSet
    
    Queue --> PriorityQueue
    Queue --> Deque
    Deque --> ArrayDeque
    
    Map["Map (Separate Interface)"] --> HashMap
    Map --> TreeMap`
            },
            {
                type: 'theory',
                title: 'Root Interfaces',
                content: `**Iterable**: The root. Allows an object to be used in a "for-each" loop.
**Collection**: The main container interface (add, remove, size).
**Map**: Not a Collection! Keeps Key-Value pairs.`
            },
            {
                type: 'example',
                title: 'Analogy: Organizing Your Stuff',
                content: `*   **List**: A **Playlist**. Order matters (Song 1, then Song 2). Duplicates allowed (Play the same song twice).
*   **Set**: A **Bag of Marbles**. Order doesn't matter. No duplicates (Two identical red marbles are just "Red Marble").
*   **Map**: A **Dictionary**. You look up a word (Key) to find its definition (Value). Keys must be unique.`
            }
        ]
    },
    {
        id: 'java-list-interface',
        title: 'Lists: ArrayList vs LinkedList',
        blocks: [
            {
                type: 'theory',
                title: 'ArrayList vs LinkedList Internals',
                content: `**Comparison: ArrayList vs LinkedList**`
            },
            {
                type: 'table',
                title: 'Comparison: ArrayList vs LinkedList',
                headers: ['Feature', 'ArrayList', 'LinkedList'],
                rows: [
                    ['**Internal Data**', 'Dynamic Array', 'Doubly Linked List (Nodes)'],
                    ['**Get(index)**', '**O(1)** (Fast - Jump to memory)', '**O(N)** (Slow - Walk the chain)'],
                    ['**Add/Remove (End)**', 'O(1)', 'O(1)'],
                    ['**Add/Remove (Middle)**', 'O(N) (Slow - Shift elements)', '**O(1)** (Fast - Change pointers)'],
                    ['**Memory**', 'Low (Compact)', 'High (Stores pointers)']
                ]
            },
            {
                type: 'theory',
                title: 'Usage Rule',
                content: `**Usage Rule**: Default to \`ArrayList\`. Use \`LinkedList\` ONLY if you add/remove from the *start/middle* frequently.`
            },
            {
                type: 'example',
                title: 'Analogy: Bookshelf vs Treasure Hunt',
                content: `**ArrayList** is like a **Bookshelf**.
*   You can grab the 5th book instantly (Index 4).
*   But to insert a book in the middle, you have to scoot EVERY other book over.

**LinkedList** is like a **Treasure Hunt**.
*   Clue 1 leads to Clue 2. You can't skip to Clue 5 without visiting 1-4.
*   But adding a new clue is easy: just change where the previous clue points.`
            },
            {
                type: 'diagram',
                title: 'ArrayList Resizing',
                definition: `graph LR
    subgraph Old["Old Array (Size 4)"]
    A[10] --> B[20] --> C[30] --> D[40]
    end

    subgraph New["New Array (Size 6 - 50% growth)"]
    A2[10] --> B2[20] --> C2[30] --> D2[40] --> E2[null] --> F2[null]
    end

    Old -.->|Copy Data| New`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "When should you use LinkedList over ArrayList?",
                answer: "Rarely. Modern CPU compilers optimize contiguous arrays (ArrayList) much better due to cache locality. Use LinkedList ONLY if you are frequently adding/removing items from the **middle** of the list and don't need random access.",
                tips: "Cache Locality wins."
            }
        ]
    },
    {
        id: 'java-set-queue',
        title: 'Sets, Queues & Deques',
        blocks: [
            {
                type: 'theory',
                title: 'The Set Interface (Unique Items)',
                content: `**HashSet**:
* Backed by a HashMap (Values are a dummy object).
* Unordered.
* O(1) access.

**TreeSet**:
* Backed by a TreeMap (Red-Black Tree).
* **Sorted** (Natural order or Comparator).
* O(log n) access.`
            },
            {
                type: 'theory',
                title: 'Queue & Deque',
                content: `**PriorityQueue**:
* Orders elements by priority (Min-Heap by default).
* Not FIFO.

**ArrayDeque**:
* "Double Ended Queue".
* Faster than Stack and LinkedList.
* Can assume roles of both Stack (LIFO) and Queue (FIFO).`
            }
        ]
    },
    {
        id: 'java-map-deep-dive',
        title: 'Map Interface: HashMap Internals',
        blocks: [
            {
                type: 'theory',
                title: 'How HashMap Works (Internals)',
                content: `A HashMap stores data in an **Array of Nodes** (called Buckets).
                
**Analogy - The School Lockers**:
Imagine a hallway with 16 lockers (Buckets).
1. **Hashing (The Logic)**: You get a student ID (Key). You do some math (\`id % 16\`) to decide which locker to open.
2. **Storing**: You open locker #5.
3. **Collision**: If locker #5 is already full, you don't overwrite it! You hang a bag (Linked List) inside the locker and put your item there.`
            },
            {
                type: 'table',
                title: 'Comparison: Map Implementations',
                headers: ['Feature', 'HashMap', 'LinkedHashMap', 'TreeMap'],
                rows: [
                    ['**Order**', 'Random (No guarantee)', 'Insertion Order', 'Sorted (Key Order)'],
                    ['**Speed**', '**O(1)** (Fastest)', 'O(1) (Slightly slower)', '**O(log N)** (Slowest)'],
                    ['**Null Key**', '1 Allowed', '1 Allowed', '**NOT Allowed**'],
                    ['**Data Structure**', 'Array + List/Tree', 'HashMap + Doubly Linked List', 'Red-Black Tree']
                ]
            },
            {
                type: 'theory',
                title: 'The Put Operation(Key, Value)',
                content: `1. ** Hash **: Calculate \`key.hashCode()\`.
2. **Index**: Convert hash to index (\`hash % n\`).
3. **Collision Check**:
   - If bucket is empty -> Save Node.
   - If bucket has node -> **Collision!** Check \`equals()\`.
     - If true -> Overwrite value.
     - If false -> Append to Linked List (or Red-Black Tree if list > 8).`
            },
            {
                type: 'diagram',
                title: 'HashMap Structure & Collision',
                definition: `graph TD
    HashFunction -->|Index 5| Bucket5
    HashFunction -->|Index 8| Bucket8
    
    subgraph Bucket5 ["Bucket 5 (Treeified)"]
    Root((Node A)) --> Left((Node B))
    Root --> Right((Node C))
    end
    
    subgraph Bucket8 ["Bucket 8 (Linked List)"]
    Start[Node X] --> Next[Node Y]
    end`
            },
            {
                type: 'table',
                title: 'Big O Complexity Cheatsheet',
                headers: ['Collection', 'Get (Access)', 'Add (End)', 'Remove (Middle)', 'Contains'],
                rows: [
                    ['**ArrayList**', 'O(1)', 'O(1)', 'O(N)', 'O(N)'],
                    ['**LinkedList**', 'O(N)', 'O(1)', 'O(1)', 'O(N)'],
                    ['**HashSet**', 'O(1)', 'O(1)', 'O(1)', 'O(1)'],
                    ['**HashMap**', 'O(1)', 'O(1)', 'O(1)', 'O(1)'],
                    ['**TreeSet**', 'O(log N)', 'O(log N)', 'O(log N)', 'O(log N)']
                ]
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "What happens if two different keys have the same hashCode?",
                answer: "A **Collision** occurs. They are stored in the same bucket using a Linked List (or balanced Tree). \`equals()\` is used to distinguish them during retrieval.",
                tips: "Collision Handling."
            },
            {
                id: 2,
                question: "What is the difference between Fail-Fast and Fail-Safe iterators?",
                answer: "**Fail-Fast** (ArrayList, HashMap): Throws \`ConcurrentModificationException\` if you modify the collection structure while iterating. **Fail-Safe** (ConcurrentHashMap): Works on a clone/snapshot, allows modification but might not show latest data.",
                tips: "Concurrent Exceptions."
            },
            {
                id: 3,
                question: "How do you make a Collection Read-Only?",
                answer: "You can wrap it using `Collections.unmodifiableList(originalList)`. Any attempt to modify (add/remove) this wrapper list will throw an `UnsupportedOperationException`. Ideally, use `List.of()` in modern Java for immutable lists.",
                tips: "Unmodifiable Wrapper."
            }
        ]
    }
];

// ==========================================
// MODULE 4: ADVANCED FEATURES
// ==========================================
export const javaAdvancedData = [
    {
        id: 'java-generics',
        title: 'Generics: Type Safety',
        blocks: [
            {
                type: 'theory',
                title: 'Why Generics?',
                content: `**The Problem**: Before Generics (Java 1.4), Collections held raw \`Object\` types. You had to cast manually, leading to \`ClassCastException\` at runtime.
                
**The Solution**: Generics (Java 5) shift safety checks from Runtime to **Compile Time**.
- **Syntactic Sugar**: \`List<String>\`.
- **Compile Time**: Checks ensure you only add Strings.
- **Runtime**: Type Erasure removes generic info (JVM sees clear \`List\`).

**Analogy: Labelled Boxes**:
*   **Pre-Generics**: A plain cardboard box. You throw in a book, a cat, and a pizza. When you reach in, you don't know what you'll get. You might get bitten (Runtime Error).
*   **Generics**: A box with a permanent label "BOOKS ONLY". The packer (Compiler) stops you from putting in a cat. When you reach in, you are 100% sure you get a book.`
            },
            {
                type: 'example',
                title: 'Analogy: Labelled Boxes',
                content: `Think of **Generics** as **Colour-Coded Moving Boxes**.
                
*   **Without Generics**: Black garbage bags. You put stuff in. You forget what's inside. You reach in for a pillow and grab a cactus (ClassCastException).
*   **With Generics**: A clear plastic box labelled "KITCHEN UTENSILS". The moving company (Compiler) won't let you pack a pillow in it. When you unpack, you are 100% safe.`
            },
            {
                type: 'diagram',
                title: 'The Generic Box',
                definition: `graph LR
    subgraph CompileTime
    Box["Box<Integer>"] 
    check{Check Type}
    Input1["100"] -- OK --> Box
    Input2["'Hello'"] -- Error! --> check
    end
    
    subgraph Runtime
    Erasure["Box (Raw Object)"]
    end
    
    Box -.->|Type Erasure| Erasure`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Generic Syntax & Wildcards',
                code: `// 1. Generic Class
public class Box<T> {
    private T content;
    public void set(T t) { this.content = t; }
    public T get() { return content; }
}

// 2. Wildcards (?)
// Unbounded: Accept List of ANYTHING
public void print(List<?> list) { ... }

// Upper Bound: Accept List of Numbers (Integer, Double)
public void sum(List<? extends Number> list) { ... }

// Lower Bound: Accept List of Integer or its Supertypes (Number, Object)
public void add(List<? super Integer> list) { ... }`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "What is Type Erasure?",
                answer: "Generics exist ONLY at compile time to enforce type safety. During compilation, the Java compiler 'erases' generic types (replacing T with Object or the Bound) so that the runtime JVM sees only raw code. This ensures backward compatibility with older Java versions.",
                tips: "Compile-time sugar."
            }
        ]
    },
    {
        id: 'java-enums',
        title: 'Enums: Type-Safe Constants',
        blocks: [
            {
                type: 'theory',
                title: 'Enums are Classes',
                content: `In Java, an Enum is more than just a list of constants. It is a full-blown **Class** that can have:
1.  **Fields** (e.g., \`public final int severity\`).
2.  **Constructors** (Private by default).
3.  **Methods** (Abstract or Concrete).

**Singleton Pattern**:
A single-element Enum (e.g., \`enum Singleton { INSTANCE; }\`) is the simplest and safest way to implement a Thread-Safe Singleton.`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Enum with Method & Field',
                code: `enum Planet {
    MERCURY (3.303e+23, 2.4397e6),
    EARTH   (5.976e+24, 6.37814e6);

    private final double mass;   // Field
    private final double radius; // Field

    // Constructor (Must be private)
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    // Method
    public double surfaceGravity() {
        return G * mass / (radius * radius);
    }
}`
            }
        ]
    },
    {
        id: 'java-exceptions',
        title: 'Exception Handling & Robustness',
        blocks: [
            {
                type: 'diagram',
                title: 'The Throwable Hierarchy',
                definition: `graph TD
    A["Throwable"] --> B["Error"]
    A --> C["Exception"]
    
    B --> B1["OutOfMemoryError"]
    B --> B2["StackOverflowError"]
    
    C --> C1["RuntimeException (Unchecked)"]
    C --> C2["IOException (Checked)"]
    C --> C3["SQLException (Checked)"]
    
    C1 --> D1["NullPointerException"]
    C1 --> D2["IndexOutOfBoundsException"]
    
    classDef err fill:#ffcccc;
    classDef check fill:#ffffcc;
    classDef uncheck fill:#ccffcc;
    
    class B,B1,B2 err;
    class C2,C3 check;
    class C1,D1,D2 uncheck;`
            },
            {
                type: 'theory',
                title: 'Checked vs Unchecked',
                content: `1.  **Error** (Red): Serious JVM problems (e.g., StackOverflow). App cannot recover.
2.  **Checked Exception** (Yellow): External failures (File not found, Network down). Compiler *forces* you to \`try-catch\` or \`throws\`.
3.  **Unchecked Exception** (Green): Programmer logic errors (NullPointer, bad index). Compiler does *not* force handling.

**Analogy: The Seatbelt**:
*   **Unchecked (Speeding)**: You *shouldn't* do it, but the car won't stop you. If you crash, it's your fault.
*   **Checked (Engine Failure)**: The car knows this might happen. It forces you to have a plan (Pull over / Call tow truck) *before* you start driving.`
            },
            {
                type: 'example',
                title: 'Analogy: The Seatbelt',
                content: `**Exceptions** are like **Car Safety Features**.
                
*   **Unchecked Exception (Runtime)**: Bringing a cup of hot coffee into the car without a lid. The car manufacturer didn't stop you, but if you spill it (Crash), it's your fault.
*   **Checked Exception**: The **Seatbelt Alarm**. The car is screaming at you (Compiler Error) to buckle up *before* you can even drive. You are forced to handle the safety logic.`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Try-with-Resources (Modern Standard)',
                code: `// OLD (Before Java 7)
FileReader fr = null;
try {
    fr = new FileReader("file.txt");
    // ... use fr
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (fr != null) try { fr.close(); } catch (IOException e) {} 
}

// NEW (Try-with-Resources) - Implementation of AutoCloseable
try (FileReader fr = new FileReader("file.txt")) {
    // ... use fr
} catch (IOException e) {
    // fr is AUTOMATICALLY closed here, even if it fails
    e.printStackTrace();
}`
            },
            {
                type: 'theory',
                title: 'Creating Custom Exceptions',
                content: `Sometimes standard Java exceptions aren't specific enough. You can create your own.
                
**Analysis Steps**:
1.  **Inheritance**:
    *   Extend **RuntimeException** if you want it to be **Unchecked** (e.g., \`InvalidAgeException\`). This is preferred in modern Spring development.
    *   Extend **Exception** if you want it to be **Checked** (forcing the user to handle it).
2.  **Constructors**: Always provide at least two constructors:
    *   One that takes a message string.
    *   One that takes the message + the original "cause" exception (for chaining).`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Custom Exception Example',
                code: `// 1. Define the Exception
public class InsufficientFundsException extends RuntimeException {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

// 2. Usage
public void withdraw(double amount) {
    if (amount > balance) {
        throw new InsufficientFundsException("Need " + amount + " but have " + balance);
    }
    balance -= amount;
}`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "Does 'finally' execute if System.exit(0) is called?",
                answer: "No. `System.exit(0)` terminates the JVM immediately. The `finally` block will NOT execute.",
                tips: "JVM shutdown."
            },
            {
                id: 2,
                question: "Difference between throw and throws?",
                answer: "**throw**: Used inside a method to actually throw an exception object. **throws**: Used in the method signature to declare that this method *might* throw specific Checked Exceptions.",
                tips: "Action vs Declaration."
            }
        ]
    },
    {
        id: 'java-serialization',
        title: 'Serialization & I/O',
        blocks: [
            {
                type: 'theory',
                title: 'Saving State: Serialization',
                content: `**Serialization**: converting an object into a byte stream (file/network).
**Deserialization**: reconstructing the object from bytes.

**Keywords**:
1.  \`implements Serializable\`: Marker interface (no methods). Required.
2.  \`transient\`: Excludes a field from serialization (Good for passwords).
3.  \`serialVersionUID\`: Unique ID to verify sender/receiver class compatibility.

**Analogy: Freeze-Dried Food**:
*   **Serialization**: Taking a fresh meal (Object), removing water/state (Dehydrating), and packing it into a pouch (Byte Stream).
*   **Transmission**: Sending the pouch across the world.
*   **Deserialization**: Adding water to bring the meal back to its original state.`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Modern I/O (NIO.2)',
                code: `// Avoid BufferedReader for simple tasks
import java.nio.file.*;

Path path = Paths.get("data.txt");

// Reading
String content = Files.readString(path);

// Writing
Files.writeString(path, "Hello Java NIO", StandardOpenOption.CREATE);`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "Why use the transient keyword?",
                answer: "To prevent sensitive data (like passwords) or non-serializable fields (like file streams) from being saved during serialization. When deserialized, transient fields get default values (null, 0).",
                tips: "Security & Optimization."
            }
        ]
    }
];

// ==========================================
// MODULE 5: FUNCTIONAL PROGRAMMING
// ==========================================
export const javaFunctionalData = [
    {
        id: 'java-lambdas',
        title: 'Lambda Expressions & Functional Interfaces',
        blocks: [
            {
                type: 'theory',
                title: 'The Shift: Imperative vs Declarative',
                content: `**Imperative (Old)**: Telling the computer *HOW* to do things step-by-step (Loops, mutable states).
**Declarative (New)**: Telling the computer *WHAT* matches criteria (Streams, Functions).

**Lambda Syntax**:
\`(parameters) -> { body }\`
* No name.
* No return type (inferred).
* No parameter types (inferred).

**Analogy: The Note vs The Worker**:
*   **OOP (Worker)**: You hire a plumber (Object) to fix the sink. He comes with his own tools and name.
*   **Functional (Note)**: You just write a sticky note "Fix the sink" (Lambda) and stick it on the wall. Anyone can grab it and do it. It's just behavior, no identity.`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Lambda Evolution',
                code: `// 1. anonymous inner class (Old)
Runnable r1 = new Runnable() {
    @Override
    public void run() { System.out.println("Hello"); }
};

// 2. Lambda Expression (New)
Runnable r2 = () -> System.out.println("Hello");

// 3. Method Reference (Cleanest)
// Use when the lambda just calls an existing method
Consumer<String> printer = System.out::println;`
            },
            {
                type: 'theory',
                title: 'The Big 4 Functional Interfaces',
                content: `Found in \`java.util.function\`:
1.  **Predicate<T>**: \`T -> boolean\`. Checks a condition. (e.g., \`s -> s.isEmpty()\`).
2.  **Function<T, R>**: \`T -> R\`. Transforms input to output. (e.g., \`s -> s.length()\`).
3.  **Consumer<T>**: \`T -> void\`. Takes input, returns nothing. (e.g., \`System.out::println\`).
4.  **Supplier<T>**: \`() -> T\`. Generates output, takes nothing. (e.g., \`() -> new User()\`).`
            }
        ]
    },
    {
        id: 'java-streams',
        title: 'The Stream API: Processing Pipelines',
        blocks: [
            {
                type: 'diagram',
                title: 'The Stream Factory Line',
                definition: `graph LR
    Source["List: [1, 2, 3, 4]"]
    Step1["Filter (x % 2 == 0)"]
    Step2["Map (x * 10)"]
    Term["Collect (ToList)"]
    
    Source -->|Stream| Step1
    Step1 -->|2, 4| Step2
    Step2 -->|20, 40| Term
    Term --> Result["[20, 40]"]`
            },
            {
                type: 'theory',
                title: 'Lazy Evaluation',
                content: `**Key Concept**: Intermediate operations (filter, map) are **LAZY**.
They do NOT execute until a **Terminal Operation** (collect, count, forEach) is called.`
            },
            {
                type: 'example',
                title: 'Analogy: The Assembly Line',
                content: `Think of a **Car Factory Assembly Line**.
                
1.  **Instruction**: "Paint it Red" (Stream Operation).
2.  **Instruction**: "Add Spoiler" (Stream Operation).
3.  **Result**: Nothing happens to the car chassis YET.
4.  **Terminal Op**: "START BELT".
                
Only when you hit the button do the cars move down the line and get painted. If you never hit start (Terminal Op), the paintbots just sit there.`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Old Loop vs New Stream',
                code: `List<User> users = repo.findAll();

// 1. OLD: External Iteration
List<String> names = new ArrayList<>();
for (User u : users) {
    if (u.getAge() > 18) {
        names.add(u.getName());
    }
}

// 2. NEW: Internal Iteration (Stream)
List<String> names = users.stream()
    .filter(u -> u.getAge() > 18)  // Predicate
    .map(User::getName)            // Function
    .sorted()                      // Comparator
    .collect(Collectors.toList()); // Terminal`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "difference between map() and flatMap()?",
                answer: "**map()**: One-to-One transformation. Input List<String> -> Output List<Integer>. **flatMap()**: One-to-Many. Takes a function that returns a Stream, and *flattens* the nested streams into a single stream. Used for `List<List<String>>` -> `List<String>`.",
                tips: "Flattening structure."
            },
            {
                id: 2,
                question: "Can you reuse a Stream?",
                answer: "No. A Stream is like an Iterator. Once a terminal operation is called, the stream is closed/consumed. Reusing it throws `IllegalStateException`. You must create a new stream from the source.",
                tips: "Single-use Pipe."
            }
        ]
    },
    {
        id: 'java-optional',
        title: 'Optional: Killing NullPointerExceptions',
        blocks: [
            {
                type: 'diagram',
                title: 'The Optional Box',
                definition: `graph TD
    subgraph EmptyBox [Optional.empty]
        E[Empty]
    end
    
    subgraph FullBox [Optional.of Data]
        D[Data]
    end
    
    UserCall[User] -->|getProfile| Check{Return Type?}
    Check -->|Safe| E
    Check -->|Safe| D
    
    style E fill:#ffcccc
    style D fill:#ccffcc`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Correct Optional Usage',
                code: `// BAD (Anti-Pattern): Just like null check
if (opt.isPresent()) {
    return opt.get();
}

// GOOD: Functional Style
return opt.orElse("Default");

// GOOD: Throw explicit error
return opt.orElseThrow(() -> new UserNotFoundException());

// GOOD: Transform if present
return opt.map(String::toUpperCase)
          .orElse("NONE");`
            }
        ]
    },
    {
        id: 'java-date-time',
        title: 'Modern Date & Time (Java 8)',
        blocks: [
            {
                type: 'theory',
                title: 'Why java.util.Date was replaced',
                content: `1.  **Mutable**: \`date.setYear(2025)\` changes the object everywhere. (Thread-unsafe).
2.  **Confusing**: Months started at 0 (Jan = 0). Years started from 1900.
3.  **The Fix**: \`java.time\` package (Immutable, Clear, Thread-Safe).`
            },
            {
                type: 'code',
                language: 'java',
                title: 'LocalDate & LocalDateTime',
                code: `// Just Date
LocalDate today = LocalDate.now();
LocalDate nextWeek = today.plusWeeks(1);

// Date + Time
LocalDateTime meeting = LocalDateTime.of(2025, Month.DECEMBER, 25, 10, 0);

// Duration (Machine time)
long minutes = Duration.between(start, end).toMinutes();

// Formatting
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy");
String s = today.format(fmt);`
            },
            {
                type: 'example',
                title: 'Analogy: The Courier Box',
                content: `**Optional** is like a **Delivery Box**.
                
*   Before Optional: You assume every delivery has an item. You reach in blindly -> *Bite from a Spider* (NullPointerException).
*   With Optional: The box label says "May contain Item or Null". You are forced to check (\`isPresent()\`) or have a backup plan (\`orElse("Gift Card")\`) before opening it.`
            }
        ]
    }
];

// ==========================================
// MODULE 6: EXPERT (CONCURRENCY & JVM)
// ==========================================
export const javaExpertData = [
    {
        id: 'java-multithreading',
        title: 'Multithreading: The Lifecycle',
        blocks: [
            {
                type: 'theory',
                title: 'Threads vs Processes',
                content: `**Process**: Represents an application. Has its own memory space.
**Thread**: "Lightweight Process". Shared memory (Heap), but own Stack.

**Lifecycle**:
1.  **New**: Created (\`new Thread()\`), not started.
2.  **Runnable**: Ready to run, waiting for CPU time.
3.  **Running**: Executing code.
4.  **Blocked/Waiting**: Waiting for a lock or I/O.
5.  **Terminated**: Execution finished.`
            },
            {
                type: 'example',
                title: 'Analogy: The Kitchen',
                content: `Think of a **Busy Restaurant**.
                
*   **Process**: The Restaurant Building itself (Has the kitchen, tables, cash register).
*   **Thread**: The **Chefs**. You can have 10 chefs (Threads) in 1 Kitchen (Process).
*   **Heap**: The **Fridge**. All chefs share the same ingredients. If Chef A takes the last egg, Chef B can't use it (Race Condition).
*   **Stack**: The **Cutting Board**. Each chef has their own private space for chopping. Chef A can't see what's on Chef B's board.`
            },
            {
                type: 'diagram',
                title: 'Thread Lifecycle',
                definition: `graph LR
    StateNew((New)) -->|start| StateRunnable
    StateRunnable((Runnable)) -->|Scheduler| StateRunning
    StateRunning((Running)) -->|yield| StateRunnable
    StateRunning -->|sleep/wait| StateBlocked((Blocked))
    StateBlocked -->|notify/time| StateRunnable
    StateRunning -->|finish| StateTerminated((Terminated))`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Creating Threads (Runnable is better)',
                code: `// Method 1: Extend Thread (Limits inheritance)
class MyThread extends Thread {
    public void run() { ... }
}

// Method 2: Implement Runnable (Flexible)
Runnable task = () -> {
    System.out.println("Running in: " + Thread.currentThread().getName());
};
Thread t = new Thread(task);
t.start();`
            }
        ]
    },
    {
        id: 'java-concurrency',
        title: 'Advanced Concurrency (java.util.concurrent)',
        blocks: [
            {
                type: 'diagram',
                title: 'Race Condition Visualized',
                definition: `graph TD
    subgraph SharedResource ["Shared Resource"]
    Count["Counter = 0"]
    end
    
    T1[Thread 1] -->|Read 0| Count
    T2[Thread 2] -->|Read 0| Count
    
    T1 -->|Inc to 1| Count
    T2 -->|Inc to 1| Count
    
    Result["Final Value: 1 (Should be 2!)"]`
            },
            {
                type: 'theory',
                title: 'Modern Tools',
                content: `1.  **ExecutorService**: Manages a pool of threads. Avoids overhead of creating new threads for every task.
2.  **CompletableFuture**: The JavaScript Promise of Java. Chain async tasks without blocking.
3.  **Atomic Variables**: (e.g., \`AtomicInteger\`). Thread-safe without using heavy \`synchronized\` locks.`
            },
            {
                type: 'code',
                language: 'java',
                title: 'ExecutorService & CompletableFuture',
                code: `// 1. Thread Pool (Reuses 10 threads)
ExecutorService pool = Executors.newFixedThreadPool(10);
pool.submit(() -> System.out.println("Task 1"));

// 2. CompletableFuture (Async Chain)
CompletableFuture.supplyAsync(() -> fetchUserData())
    .thenApply(user -> user.getEmail())
    .thenAccept(email -> sendEmail(email));`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "Difference between wait() and sleep()?",
                answer: "**wait()**: Belongs to \`Object\`. Releases the lock on the object and waits to be notified. **sleep()**: Belongs to \`Thread\`. Pauses execution but *keeps* the lock.",
                tips: "Locks: Release vs Keep."
            },
            {
                id: 2,
                question: "What is a Deadlock?",
                answer: "A situation where two threads are blocked forever, each waiting for the other to release a lock. (Thread A holds Lock 1 and wants Lock 2. Thread B holds Lock 2 and wants Lock 1).",
                tips: "Circular dependency."
            },
            {
                id: 3,
                question: "What is the volatile keyword?",
                answer: "`volatile` guarantees **Visibility**. It forces threads to read the variable's value directly from Main Memory (RAM), bypassing the quirky CPU Cache. It prevents threads from seeing stale data.",
                tips: "No caching allowed."
            }
        ]
    },
    {
        id: 'java-jvm-internals',
        title: 'JVM Internals: Memory & GC',
        blocks: [
            {
                type: 'diagram',
                title: 'JVM Memory Model (JMM)',
                definition: `graph TD
    subgraph Stack ["Stack Memory (Per Thread)"]
    Frame1["Method A"]
    Frame2["Method B"]
    LocalVars["Local Primitives"]
    end
    
    subgraph Heap ["Shared Heap Memory"]
    Young["Young Gen (Eden/Survivor)"]
    Old["Old Gen (Long-lived Objects)"]
    end
    
    subgraph Meta ["Metaspace"]
    Classes["Class Metadata"]
    Static["Static Variables"]
    end
    
    Frame1 -->|Ref| Young`
            },
            {
                type: 'theory',
                title: 'Garbage Collection (GC)',
                content: `**Goal**: Automatically delete unreachable objects to free memory.
**Process**: "Mark and Sweep".
1.  **Mark**: Traverse GC Roots (Stack variables, Statics) to identify *live* objects.
2.  **Sweep**: Delete everything else.
**Stop The World**: Heavy GCs pause the application. Tuning aims to minimize this pause.`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "Can we force Garbage Collection?",
                answer: "No. calling \`System.gc()\` is merely a *suggestion* to the JVM. The JVM may ignore it if it's busy or doesn't see the need.",
                tips: "Request vs Command."
            },
            {
                id: 2,
                question: "What is a Memory Leak in Java?",
                answer: "When objects are no longer used by the application but are still referenced (e.g., in a static List/Map), preventing GC from removing them. Eventually leads to \`OutOfMemoryError\`.",
                tips: "Unwanted References."
            }
        ]
    },
    {
        id: 'java-reflection',
        title: 'Reflection & Annotations',
        blocks: [
            {
                type: 'theory',
                title: 'The Magic Behind Frameworks',
                content: `**Reflection**: Ability to inspect and modify classes, methods, and fields at *Runtime* (even private ones).
**Use Case**: Spring Boot uses Reflection to scan for classes with \`@Component\` and create instances automatically (Dependency Injection).`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Reflection Example',
                code: `Class<?> clazz = Class.forName("com.example.User");
Method method = clazz.getDeclaredMethod("privateSecret");

// Bypass private access
method.setAccessible(true);
method.invoke(new User());`
            }
        ]
    }
];

// ==========================================
// ==========================================
// MODULE 7: FILE HANDLING (IO & NIO)
// ==========================================
export const javaFileHandlingData = [
    {
        id: 'java-io-basics',
        title: 'File I/O: Streams vs Readers',
        blocks: [
            {
                type: 'theory',
                title: 'The Great Divide: Byte vs Character',
                content: `**Understanding Data Representation**:
In Java, all data is ultimately bytes (0s and 1s). However, how we treat those bytes determines which class we use.

1. **Byte Streams (Input/OutputStream)**:
   * **What**: Handle raw binary data.
   * **Unit**: 8-bit bytes.
   * **Use Cases**: Images (JPEG, PNG), Audio (MP3), Video, PDFs, or any non-text file.
   * **Key Classes**: \`FileInputStream\`, \`FileOutputStream\`.
   * **Analogy**: A water pipe. It flows raw liquid (bytes). It doesn't care if the water is for tea or coffee.

2. **Character Streams (Reader/Writer)**:
   * **What**: Handle text data (Strings, Characters).
   * **Unit**: 16-bit Unicode characters.
   * **Context**: Automatically handles Character Encoding (UTF-8, ASCII) so you don't see garbage symbols.
   * **Use Cases**: Text files (.txt, .json, .xml, .java).
   * **Key Classes**: \`FileReader\`, \`FileWriter\`.
   * **Analogy**: A translator. It takes the raw sounds (bytes) and converts them into meaningful words (characters).`
            },
            {
                type: 'example',
                title: 'Analogy: The Translator',
                content: `**Byte Streams** are like a **Record Player**. It just plays the raw grooves (bytes) on the vinyl. It doesn't know if it's music or a speech.
                
**Character Streams** are like a **Simultaneous Translator**. They listen to the raw sound (bytes) and immediately convert it into understandable English text (Characters) for you.`
            },
            {
                type: 'diagram',
                title: 'I/O Class Hierarchy',
                definition: `graph TD
    Object --> InputStream
    Object --> OutputStream
    Object --> Reader
    Object --> Writer
    
    InputStream --> FileInputStream
    InputStream --> BufferedInputStream
    InputStream --> ObjectInputStream
    
    Reader --> InputStreamReader
    InputStreamReader --> FileReader
    Reader --> BufferedReader
    
    subgraph Binary ["Binary Data (Bytes)"]
    InputStream
    OutputStream
    end
    
    subgraph Text ["Text Data (Chars)"]
    Reader
    Writer
    end`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Reading a File (Old vs New)',
                code: `// METHOD 1: The "Classic" Way (Pre-Java 7)
// Verbose, error-prone, requires manual closing
BufferedReader br = null;
try {
    br = new BufferedReader(new FileReader("data.txt"));
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
} finally {
    // MUST close manually to prevent memory leaks
    try { if (br != null) br.close(); } catch (IOException ex) {}
}

// METHOD 2: Try-with-Resources (Java 7+)
// Best Practice! Auto-closes resource.
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// METHOD 3: The "Modern" One-Liner (Java 11+)
// Uses NIO.2 Files class. Great for small files.
try {
    String content = Files.readString(Path.of("data.txt"));
    System.out.println(content);
} catch (IOException e) { ... }`
            }
        ],
        interviewQuestions: [
            {
                id: 1,
                question: "What is the difference between FileInputStream and FileReader?",
                answer: "\`FileInputStream\` reads raw bytes (8-bit) and is suitable for binary files like images. \`FileReader\` reads characters (16-bit Unicode) and is designed for text files. \`FileReader\` internally uses logic to convert bytes to characters based on the system's default encoding (or a specified one).",
                tips: "Bytes vs Chars."
            }
        ]
    },
    {
        id: 'java-nio',
        title: 'NIO (New I/O): Buffers & Channels',
        blocks: [
            {
                type: 'theory',
                title: 'Why NIO?',
                content: `**The Limitation of IO (Old)**:
Standard IO is **Blocking**. When a thread reads from a stream, it waits. It cannot do anything else until data arrives. This is fine for small apps but terrible for high-performance servers (like a Chat Server) handling 10,000 connections. Using 10,000 threads leads to massive memory overhead.

**The Solution: NIO (Non-blocking IO)**:
Introduced in Java 1.4, NIO allows one thread to manage multiple connections (Channels) using a **Selector**.

**Core Components**:
1.  **Buffers**: Data containers (like arrays) where data is read from or written to.
2.  **Channels**: Connections to files or sockets. They support non-blocking operations.
3.  **Selectors**: A monitoring object that tells the "main thread" which channels have data ready.

**Analogy - The Waiter**:
*   **Old IO**: One waiter per table. If the customer isn't ready to order, the waiter just assumes a statue pose and waits.
*   **NIO**: One waiter for the whole restaurant. They cycle through tables: "Ready? No? Okay, next." They only act when a table raises its hand (Selector event).`
            },
            {
                type: 'code',
                language: 'java',
                title: 'NIO File Copying',
                code: `// Using the Files utility class (NIO.2)
import java.nio.file.*;

public class CopyDemo {
    public static void main(String[] args) throws IOException {
        Path source = Paths.get("large_video.mp4");
        Path dest = Paths.get("backup_video.mp4");

        // Copies attributes and replaces existing file
        Files.copy(source, dest, StandardCopyOption.REPLACE_EXISTING);
        
        System.out.println("Done!");
    }
}
`
            }
        ]
    }
];

// ==========================================
// MODULE 8: DESIGN PATTERNS
// ==========================================
export const javaDesignPatternsData = [
    {
        id: 'java-singleton',
        title: 'Singleton Pattern',
        blocks: [
            {
                type: 'theory',
                title: 'One Instance to Rule Them All',
                content: `**Goal**: Ensure a class has only **ONE** instance and provide a global point of access to it.

**Use Cases**:
1.  **Database Connection Pool**: You don't want to recreate the expensive pool every time.
2.  **Logger**: A centralized log file handler.
3.  **Configuration Manager**: Loaded once at startup.

**The Challenge**: Multi-threading. If two threads call \`getInstance()\` at the same nanosecond, you might accidentally create two objects. This breaks the pattern.`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Thread-Safe Singleton (Bill Pugh Implementation)',
                code: `public class Database {
    
    // Private constructor prevents "new Database()" from outside
    private Database() {
        System.out.println("Connecting to SQL...");
    }

    // Inner static class - Loaded ONLY when getInstance() is called
    // This provides built-in Thread Safety without synchronized locks!
    private static class FieldHolder {
        private static final Database INSTANCE = new Database();
    }

    public static Database getInstance() {
        return FieldHolder.INSTANCE;
    }
}`
            }
        ]
    },
    {
        id: 'java-factory',
        title: 'Factory Pattern',
        blocks: [
            {
                type: 'theory',
                title: 'The "Virtual Constructor"',
                content: `**Problem**: Tight Coupling.
If you write \`new Dog()\`, your code is hardcoded to \`Dog\`. If you later want to change it to \`Cat\`, you have to find/replace every line.

**Solution**: Use a **Factory**.
Instead of calling \`new\` directly, you ask a Factory method: \`AnimalFactory.create("dog")\`.
The Factory decides what to return. Your main code just sees an \`Animal\`.`
            },
            {
                type: 'example',
                title: 'Analogy: The Car Dealership',
                content: `You don't build a car yourself from parts. You go to a **Factory/Dealership** and say "I want a Sedan" (String request).
                
The Factory knows exactly how to assemble the engine, tires, and seats. They just hand you the keys (Instance). You drive away without knowing how the engine was bolted in.`
            },
            {
                type: 'diagram',
                title: 'Factory Method Flow',
                definition: `graph LR
    Client[Client Code]
    Factory[AnimalFactory]
    Dog[Dog Object]
    Cat[Cat Object]
    
    Client -->|1. request dog| Factory
    Factory -->|2. decides and creates| Dog
    Factory -->|3. returns Animal| Client
    
    Client -.->|does not know| Dog`
            }
        ]
    },
    {
        id: 'java-builder',
        title: 'Builder Pattern',
        blocks: [
            {
                type: 'theory',
                title: 'Solving the "Telescoping Constructor"',
                content: `**Problem**: A class with 10 optional parameters.
\`new User("John", "Doe", 25, null, null, true, "NYC", ...)\`
This is readable? No. Error prone? Yes.

**Solution**: The Builder Pattern.
It allows you to construct complex objects step-by-step.
\`User.builder().firstName("John").age(25).build();\``
            },
            {
                type: 'example',
                title: 'Analogy: Subway Sandwich Artist',
                content: `Think of **Subway**.
                
*   **Telescoping Constructor**: The pre-made sandwiches. "I want the Spicy Italian". You get exactly those ingredients. Don't like onions? Too bad.
*   **Builder**: You walk down the line. "Start with Italian bread... add Cheese... Toasted?... Yes... Peppers... No Olives... Mayo."
*   **Build()**: "Wrap it up!" (Finalizes the object).`
            },
            {
                type: 'code',
                language: 'java',
                title: 'Builder Implementation',
                code: `public class User {
    private final String name; // immutable
    private final int age;

    // Private constructor - forces use of Builder
    private User(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
    }

    // Static Class
    public static class Builder {
        private String name;
        private int age;

        public Builder name(String name) {
            this.name = name;
            return this; // Return Builder for chaining
        }
        
        public Builder age(int age) {
            this.age = age;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}

// Usage
User u = new User.Builder()
    .name("Alice")
    .age(30)
    .build();`
            }
        ]
    }
];

// ==========================================
// FINAL EXPORT OBJECT
// ==========================================
export const javaCourse = {
    id: 'java-mastery',
    title: 'Java Masterclass',
    description: 'Master Java from internals to enterprise architecture.',
    icon: 'FaJava',
    topics: [
        ...javaBasicsData,
        ...javaOOPData,
        ...javaCollectionsData,
        ...javaAdvancedData,
        ...javaFunctionalData,
        ...javaExpertData,
        ...javaFileHandlingData,
        ...javaDesignPatternsData
    ]
};