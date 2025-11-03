import React from 'react';

const History = ({ employees, logs, setIsViewingHistory }) => {
  const deletedEmployees = employees.filter(
    employee => employee.status === 'DELETED'
  );

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="container">
      <div style={{ marginTop: '30px' }}>
        <button onClick={() => setIsViewingHistory(false)} className="muted-button">Back to Dashboard</button>
      </div>

      <h2 style={{ marginTop: '30px' }}>Deleted Employees</h2>
      <div className="contain-table">
        <table className="striped-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {deletedEmployees.length > 0 ? (
              deletedEmployees.map((employee, i) => (
                <tr key={employee.id}>
                  <td>{i + 1}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{formatter.format(employee.salary)}</td>
                  <td>{employee.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No Deleted Employees</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '30px' }}>Activity Log</h2>
      <div className="contain-table">
        <table className="striped-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Employee</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs
                .slice(0) // Create a shallow copy to avoid modifying the original
                .reverse() // Display most recent logs first
                .map((log, i) => (
                  <tr key={i}>
                    <td>{log.action}</td>
                    <td>{`${log.employee.firstName} ${log.employee.lastName}`}</td>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={3}>No Activity Logs</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
