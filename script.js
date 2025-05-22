function loadEmployees(searchText = "", departmentFilter = "") {
    fetch("http://localhost:3000/employees")
        .then(res => res.json())
        .then(data => {
            // Filter by name and department
            const filtered = data.filter(emp => {
                const matchesName = emp.name.toLowerCase().includes(searchText.toLowerCase());
                const matchesDept = departmentFilter ? emp.department === departmentFilter : true;
                return matchesName && matchesDept;
            });

            const tbody = document.querySelector("#employeeTable tbody");
            tbody.innerHTML = "";
            filtered.forEach(emp => {
                const row = `
  <tr>
    <td>${emp.id}</td>
    <td>${emp.name}</td>
    <td>${emp.email}</td>
    <td>${emp.phone}</td>
    <td>${emp.gender}</td>
    <td>${emp.department}</td>
    <td>${emp.salary}</td>
    <td>
      <button class="edit-btn" data-id="${emp.id}">Edit</button>
      <button class="delete-btn" data-id="${emp.id}">Delete</button>
    </td>
  </tr>
`;
                tbody.innerHTML += row;
            });
        });
}



document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("employeeForm");
    const searchInput = document.getElementById("searchByName");
    const departmentSelect = document.getElementById("filterByDepartment");

    const urlParams = new URLSearchParams(window.location.search);
    const empId = urlParams.get("id");

    if (form) {
        // If editing, pre-fill form
        if (empId) {
            fetch(`http://localhost:3000/employees/${empId}`)
                .then(res => res.json())
                .then(emp => {
                    document.getElementById("EmpID").value = emp.id;
                    document.getElementById("EmpID").disabled = true;
                    document.getElementById("fname").value = emp.name;
                    document.getElementById("mail").value = emp.email;
                    document.getElementById("phone").value = emp.phone;
                    document.querySelector(`input[name="gender"][value="${emp.gender}"]`).checked = true;
                    document.getElementById("department").value = emp.department;
                    document.getElementById("salary").value = emp.salary;
                    document.getElementById("save").textContent = "Update";
                });
        }

        // Handle Submit (Add or Edit)
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const id = document.getElementById("EmpID").value.trim();
            const name = document.getElementById("fname").value.trim();
            const email = document.getElementById("mail").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const gender = document.querySelector('input[name="gender"]:checked');
            const department = document.getElementById("department").value;
            const salary = document.getElementById("salary").value.trim();

            if (!id || !name || !email || !phone || !gender || department === "Select" || !salary) {
                alert("Please fill out all fields correctly.");
                return;
            }

            const employee = {
                id,
                name,
                email,
                phone,
                gender: gender.value,
                department,
                salary
            };

            if (empId) {
                // UPDATE
                fetch(`http://localhost:3000/employees/${empId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(employee)
                })
                    .then(() => {
                        alert("Employee updated successfully!");
                        window.location.href = "index.html";
                    })
                    .catch(err => {
                        console.error("Error updating employee:", err);
                        alert("Something went wrong!");
                    });
            } else {
                // ADD NEW
                fetch(`http://localhost:3000/employees?id=${id}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.length > 0) {
                            alert("Employee ID already exists!");
                        } else {
                            fetch("http://localhost:3000/employees", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(employee)
                            })
                                .then(() => {
                                    alert("Employee saved successfully!");
                                    form.reset();
                                    window.location.href = "index.html";
                                })
                                .catch(err => {
                                    console.error("Error saving employee:", err);
                                    alert("Something went wrong!");
                                });
                        }
                    });
            }
        });
    }

    // Load Employee Table if on index.html
    if (document.getElementById("employeeTable")) {
        loadEmployees();

        if (searchInput && departmentSelect) {
            searchInput.addEventListener("input", () => {
                loadEmployees(searchInput.value, departmentSelect.value);
            });

            departmentSelect.addEventListener("change", () => {
                loadEmployees(searchInput.value, departmentSelect.value);
            });
        }

        // Delegate Edit/Delete
        document.querySelector("#employeeTable tbody").addEventListener("click", function (e) {
            if (e.target.classList.contains("delete-btn")) {
                const empId = e.target.dataset.id;
                deleteEmployee(empId);
            } else if (e.target.classList.contains("edit-btn")) {
                const empId = e.target.dataset.id;
                window.location.href = `addEmp.html?id=${empId}`;
            }
        });
    }
});


function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        fetch(`http://localhost:3000/employees/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                alert("Employee deleted successfully!");
                loadEmployees();
            })
            .catch(err => {
                console.error("Error deleting employee:", err);
                alert("Failed to delete employee.");
            });
    }
}

