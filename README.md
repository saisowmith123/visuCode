# visuCode

## Objective

Build a web application that enables users to generate and view simple visualizations (e.g., bar charts) by submitting custom scripts written in **Python** or **R**. These scripts are executed on the backend, and the resulting visualizations are rendered on the frontend.

---

## Features

- Language selector (Python / R)
- Code editor to enter visualization scripts
- Visualization display embedded on the same page
- Handles **static**, **interactive**, and **3D** plots
- Option to open the visualization in a new tab for full-size view
- Sample code provided for quick execution

---

## Tech Stack

### Backend – [FastAPI]

- REST API that accepts code and selected language
- Executes Python/R scripts using isolated Docker containers
- Two separate Docker environments:
  - `Dockerfile.python` for Python scripts
  - `Dockerfile.r` for R scripts
- Returns a rendered image or HTML (for interactive/3D) to be embedded

### Frontend – Angular

- Dropdown for language selection
- Textarea for code input
- Visualization rendering using iframe or embed
- Responsive layout with improved user experience

---

## Visualization Libraries Used

### Python:

- `matplotlib` – for static charts
- `plotly` – for interactive and 3D plots

### R:

- `ggplot2` – for static charts
- `plotly` – for interactive and 3D plots
- `rgl` – for 3D visualizations

---

## Challenges Faced

- **User-defined variables:** Initially, the implementation required users to store the output in a fixed variable named p. However, this approach was restrictive. To make it flexible, I later used regular expressions to dynamically detect and capture the visualization object, regardless of the variable name used by the user.
- **Docker setup:** Faced challenges while setting up Docker-based execution environments. Eventually, I moved from running code directly on the backend to executing it securely within isolated Docker containers for both Python and R scripts.
- **Frontend layout bugs:** Faced layout rendering issues, especially with iframe responsiveness; resolved through documentation and debugging.
- **Testing Across Multiple Libraries** Each library behaves differently (e.g., plt, fig, mlab, etc.). I had to test with codes covering a variety of outputs (PNG, HTML) and verify the backend’s ability to capture and serve each correctly.

---

## Future Improvements

- Allow **multiple concurrent script executions** using message queues like RabbitMQ or Kafka.
- Implement **user-specific submission history** with authentication.
- **Auto-detect plot type** and suggest enhancements or fix common mistakes in user code.
- Implement **live collaboration** where two users can edit and visualize the same code.
- Add **code templates** for beginners in both Python and R.
- **Implement automated cleanup strategy** Although output files are currently stored in the backend and manually cleaned, I plan to integrate a more robust and configurable automated cleanup mechanism based on file age, size in future.



---
