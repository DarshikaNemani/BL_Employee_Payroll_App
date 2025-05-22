
```markdown
# 🧾 Employee Payroll App

A simple web application to manage employee payroll details, built using HTML5, CSS3, JavaScript (ES9+), jQuery, and JSON Server for backend simulation. It allows users to **add, view, edit, and delete** employee records.

---

## ✨ Features

- Add employee details through a form.
- View all employee records in a table format.
- Edit existing employee entries.
- Delete employee records.
- Search employees by name or department.
- Sort employee records by name or start date.
- Validates form inputs to prevent incorrect or duplicate data.
- Data is stored using **JSON Server** (acts like a fake REST API).

---

## 🏗️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES9+), jQuery
- **Backend**: JSON Server (mock API)
- **Tools**: AJAX, FontAwesome

---

## 📂 Folder Structure


employee-payroll-app/
├── index.html           # Home page to display employee records
├── addEmp.html          # Form page to add or edit employee
├── styles.css           # Custom styling
├── script.js            # Logic for displaying, searching, sorting, form validation and submission
└── db.json              # JSON Server database file



---
```
## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/employee-payroll-app.git
cd employee-payroll-app
```

### 2. Install JSON Server (if not already)

```bash
npm install -g json-server
```

### 3. Start the JSON Server

```bash
json-server --watch db.json --port 3000
```

The server will run at: `http://localhost:3000/employees`

### 4. Open in Browser

Just open `index.html` in any browser (VSCode + Live Server recommended).

---

## 📋 Sample Data Format (in `db.json`)

```json
{
  "employees": [
    {
      "id": 1,
      "name": "Darshika Nemani",
      "gender": "Female",
      "department": ["HR", "Finance"],
      "salary": 50000,
      "startDate": "2024-06-01",
      "notes": "Top performer"
    }
  ]
}
```

---

## ✅ To-Do / Future Enhancements

* Add pagination
* Export data as CSV or PDF
* Dark mode toggle
* Better form UX with animations

---

## 🙌 Author

Made with ❤️ by Darshika Nemani
*Student, Final Year BTech CSE*
[LinkedIn](https://www.linkedin.com/) | [GitHub](https://github.com/)

---

## 📜 License

This project is licensed under the MIT License - feel free to use and modify!

```
