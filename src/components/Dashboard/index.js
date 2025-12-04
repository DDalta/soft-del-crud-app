import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import History from "../History";

import { employeesData, activityLogs } from "../../data/data";

const Dashboard = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState(employeesData);
  const [logs, setLogs] = useState(activityLogs);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewingHistory, setIsViewingHistory] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees_data"));
    if (data !== null && Object.keys(data).length !== 0) setEmployees(data);

    const logsData = JSON.parse(localStorage.getItem("activity_logs"));
    if (logsData !== null && Object.keys(logsData).length !== 0)
      setLogs(logsData);
  }, []);

  const handleEdit = (id) => {
    const [employee] = employees.filter((employee) => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const [employee] = employees.filter((employee) => employee.id === id);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const employeesCopy = employees.map((employee) =>
          employee.id === id ? { ...employee, status: "DELETED" } : employee,
        );

        const log = {
          action: "DELETE",
          employee: { ...employee },
          timestamp: new Date().toISOString(),
        };
        const newLogs = [...logs, log];

        localStorage.setItem("employees_data", JSON.stringify(employeesCopy));
        localStorage.setItem("activity_logs", JSON.stringify(newLogs));
        setEmployees(employeesCopy);
        setLogs(newLogs);
      }
    });
  };

  const activeEmployees = employees.filter(
    (employee) => employee.status === "ACTIVE",
  );

  return (
    <div className="container">
      {isViewingHistory ? (
        <History
          employees={employees}
          logs={logs}
          setIsViewingHistory={setIsViewingHistory}
        />
      ) : (
        <>
          {!isAdding && !isEditing && (
            <>
              <Header
                setIsAdding={setIsAdding}
                setIsAuthenticated={setIsAuthenticated}
                setIsViewingHistory={setIsViewingHistory}
              />
              <Table
                employees={activeEmployees}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </>
          )}
          {isAdding && (
            <Add
              employees={employees}
              setEmployees={setEmployees}
              setIsAdding={setIsAdding}
              logs={logs}
              setLogs={setLogs}
            />
          )}
          {isEditing && (
            <Edit
              employees={employees}
              selectedEmployee={selectedEmployee}
              setEmployees={setEmployees}
              setIsEditing={setIsEditing}
              logs={logs}
              setLogs={setLogs}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
