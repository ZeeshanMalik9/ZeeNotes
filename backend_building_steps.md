# Spring Boot + MongoDB Backend Guide for Beginners


---

## **Introduction**

This document is a complete, beginner-friendly guide to building a Backend for your Notes Application.
**Goal:** We will move your data from `data.js` (Frontend) to a **MongoDB Database** and serve it via a **Spring Boot API**.

---

## **Phase 1: Prerequisites**

Before writing code, ensure you have these installed:

1.  **Java Development Kit (JDK)**: You need JDK 17 or 21.
    - _Check_: Open terminal and type `java -version`.
2.  **MongoDB**: The database software.
    - _Download_: MongoDB Community Server (free).
    - _Check_: Open terminal and type `mongod --version`.
    - _Tool_: Download **MongoDB Compass** (GUI to see your data).
3.  **Maven**: The build tool (usually comes with your IDE).
4.  **IDE**: IntelliJ IDEA (Community Edition) is recommended for Java/Spring Boot. VS Code is also fine.

---

## **Phase 2: Project Initialization (Step-by-Step)**

We will use **Spring Initializr** to generate the project skeleton.

1.  Go to website: **[start.spring.io](https://start.spring.io/)**
2.  **Project**: Select `Maven` (Build tool).
3.  **Language**: Select `Java`.
4.  **Spring Boot**: Select the latest logical version (e.g., `3.x.x`). Do not select "SNAPSHOT".
5.  **Project Metadata**:
    - **Group**: `com.example` (or `com.tapacademy`)
    - **Artifact**: `notes-backend`
    - **Name**: `notes-backend`
    - **Package name**: `com.example.notes`
    - **Packaging**: `Jar`
    - **Java**: `17` (or `21` depending on what you installed).
6.  **Dependencies** (Click "ADD DEPENDENCIES" button):
    - Search for **"Spring Web"**: (Allows us to create REST APIs).
    - Search for **"Spring Data MongoDB"**: (Allows us to talk to MongoDB).
    - Search for **"Lombok"**: (Reduces coding by auto-generating Getters/Setters).
    - Search for **"Spring Boot DevTools"**: (Auto-restarts server when you change code).
7.  Click **GENERATE** (Ctrl + Enter).
8.  A `.zip` file will download. **Extract** this zip file to your desktop or projects folder.

---

## **Phase 3: IDE Setup**

1.  Open **IntelliJ IDEA**.
2.  Click **"Open"**.
3.  Navigate to the extracted `notes-backend` folder and select the `pom.xml` file or the folder itself.
4.  Wait for Maven to download dependencies (you will see a progress bar at the bottom). This might take 5 minutes the first time.

---

## **Phase 4: Database Configuration**

We need to tell Spring Boot where your MongoDB is located.

1.  In the Project Explorer (left side), open: `src/main/resources/application.properties`.
2.  Add the following lines:

```properties
# 1. Define the Database Connection
# format: mongodb://<host>:<port>/<database-name>
spring.data.mongodb.uri=mongodb://localhost:27017/notes_db

# 2. Server Port
# Run backend on port 8080.
server.port=8080

# 3. Application Name
spring.application.name=NotesBackend
```

---

## **Phase 5: Creating the Java Code**

We will build the application layer by layer. Create these packages (folders) inside `src/main/java/com/example/notes/`:

1.  `model` (This is where we define what our data looks like).
2.  `repository` (This is the layer that talks to the database).
3.  `service` (This is where logical operations happen).
4.  `controller` (This is the entry point specific URLs).

### **Step 5.1: The Data Models (Entities)**

Your JavaScript data has a nested structure: `Course` -> `blocks` etc. We must replicate this in Java.

**File 1: `src/main/java/com/example/notes/model/InterviewQuestion.java`**

```java
package com.example.notes.model;

import lombok.Data; // Auto-generates getters, setters, toString
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewQuestion {
    private Integer id;
    private String question;
    private String answer;
    private String tips;
}
```

**File 2: `src/main/java/com/example/notes/model/ContentBlock.java`**

```java
package com.example.notes.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContentBlock {
    // This class handles ALL types of blocks (theory, code, diagram, example)
    // Fields can be null if not appropriate for the type.

    private String type;        // "theory", "code", "diagram", "example"
    private String title;       // Common to all

    // Theory & Example fields
    private String content;

    // Code fields
    private String language;
    private String code;

    // Diagram fields
    private String definition;
}
```

**File 3: `src/main/java/com/example/notes/model/Topic.java`**

```java
package com.example.notes.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Topic {
    private String id;     // e.g., "lists-and-keys"
    private String title;  // e.g., "Lists & Keys"

    // A Topic contains a list of Blocks
    private List<ContentBlock> blocks;

    // A Topic contains a list of Questions
    private List<InterviewQuestion> interviewQuestions;
}
```

**File 4: `src/main/java/com/example/notes/model/Course.java`**
_This is the Root Document that gets saved to MongoDB._

```java
package com.example.notes.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "courses") // Tells Mongo to save this in a "courses" table
public class Course {

    @Id // This marks the unique key (Primary Key)
    private String id;    // e.g. "react-mastery"

    private String title;
    private String description;
    private String icon;

    // We embed topics directly inside the course document
    // because they are always loaded together.
    private List<Topic> topics;
}
```

---

### **Step 5.2: The Repository (Database Access)**

This interface gives you magic methods like `.save()`, `.findAll()`, `.delete()` without writing SQL.

**File: `src/main/java/com/example/notes/repository/CourseRepository.java`**

```java
package com.example.notes.repository;

import com.example.notes.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

// <Course, String> means: We are managing 'Course' objects, and the ID is a 'String'.
@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
}
```

---

### **Step 5.3: The Service (Business Logic)**

It is good practice to put logic here, not in the Controller.

**File: `src/main/java/com/example/notes/service/CourseService.java`**

```java
package com.example.notes.service;

import com.example.notes.model.Course;
import com.example.notes.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired // Dependency Injection: Spring gives us a Repository instance
    private CourseRepository courseRepository;

    // 1. Get all courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // 2. Get one course by ID
    public Optional<Course> getCourseById(String id) {
        return courseRepository.findById(id);
    }

    // 3. Save/Update a course
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }
}
```

---

### **Step 5.4: The Controller (API Endpoints)**

This opens your app to the world (Internet/Frontend).

**File: `src/main/java/com/example/notes/controller/CourseController.java`**

```java
package com.example.notes.controller;

import com.example.notes.model.Course;
import com.example.notes.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Tells Spring this class responds to web requests
@RequestMapping("/api/courses") // Base URL: http://localhost:8080/api/courses
@CrossOrigin(origins = "http://localhost:5173") // IMPORTANT: Allows React (port 5173) to talk to Java (port 8080)
public class CourseController {

    @Autowired
    private CourseService courseService;

    // GET Request: Get all courses
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    // GET Request: Get details of one specific course
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        return courseService.getCourseById(id)
                .map(ResponseEntity::ok) // If found, return 200 OK + data
                .orElse(ResponseEntity.notFound().build()); // If not found, return 404
    }

    // POST Request: Create a new course (We will use this to upload your data)
    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseService.saveCourse(course);
    }
}
```

---

## **Phase 6: Running & Seeding**

### **Step 6.1: Run the Backend**

1.  Go to `src/main/java/com/example/notes/NotesBackendApplication.java`.
2.  Click the **Green Play Button** next to `public static void main`.
3.  Look at the Console. You should see `Started NotesBackendApplication in ... seconds`.
4.  If it fails, ensure MongoDB is running (`mongod`).

### **Step 6.2: Upload Valid Data (One-Time Script)**

We need to move your JS data to the DB.

1.  In your **Frontend (React)**, open `src/App.jsx` (temporarily).
2.  Add this temporary button just for one-time use.

```javascript
/* src/App.jsx temporary code */
import { courses } from "./data"; // Your existing data file

function App() {
  // ... existing code

  const seedDatabase = async () => {
    console.log("Starting Upload...");
    for (const course of courses) {
      try {
        const response = await fetch("http://localhost:8080/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(course),
        });
        console.log(`Uploaded ${course.title}: ${response.status}`);
      } catch (error) {
        console.error("Error uploading:", error);
      }
    }
    alert("Upload Complete!");
  };

  return (
    <div>
      {/* Temporary Button */}
      <button
        onClick={seedDatabase}
        style={{ padding: "20px", background: "red", color: "white" }}
      >
        CLICK ME TO UPLOAD DATA TO MONGODB
      </button>

      {/* ... Your normal app code */}
    </div>
  );
}
```

3.  Run React (`npm run dev`).
4.  Click the Red Button **ONCE**.
5.  Check your MongoDB Compass tool. fast refresh. You should see a `notes_db` database and a `courses` collection with your data!
6.  **Delete** the Red Button code from `App.jsx`.

---

## **Phase 7: Connecting Frontend to Backend**

Now that data is in the database, stop reading from `data.js` files and read from the URL.

**Step 7.1: Fetching in `TopicPage.jsx`**

Modify `src/pages/TopicPage.jsx`:

```javascript
// DELETE: import { courses } from '../data';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TopicPage = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We fetch ALL courses to find the correct topic.
    // (In a future optimization, you should create an endpoint to search by topicId directly)
    fetch("http://localhost:8080/api/courses")
      .then((res) => res.json())
      .then((allCourses) => {
        // Logic to find the specific topic inside the nested arrays
        for (const course of allCourses) {
          const foundTopic = course.topics.find((t) => t.id === topicId);
          if (foundTopic) {
            setTopic(foundTopic);
            break;
          }
        }
        setLoading(false);
      })
      .catch((err) => console.error("API Error:", err));
  }, [topicId]);

  if (loading) return <div>Loading Content from Server...</div>;
  if (!topic) return <div>Topic not found in Database</div>;

  // ... REST OF YOUR COMPONENT UI REMAINS EXACTLY THE SAME
  // e.g. topic.blocks.map(...)
};
```

---

## **Phase 8: Final Verification**

1.  **Restart Backend**: Ensure Spring Boot is running (port 8080).
2.  **Restart Frontend**: Ensure React is running.
3.  **Navigate**: Go to a topic page.
4.  **Verify**: If the content loads, congratulations! You are now viewing data coming dynamically from MongoDB, processing through Spring Boot, and rendering in React.

You have successfully built a full-stack application.
