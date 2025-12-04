import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Add from '../components/Dashboard/Add';

describe('Add Component', () => {
  it('should render the add employee form correctly', () => {
    // Mock props that the Add component expects
    const employees = [];
    const setEmployees = jest.fn();
    const setIsAdding = jest.fn();
    const logs = [];
    const setLogs = jest.fn();

    render(
      <Add
        employees={employees}
        setEmployees={setEmployees}
        setIsAdding={setIsAdding}
        logs={logs}
        setLogs={setLogs}
      />
    );

    // Check if the form heading is present
    expect(screen.getByRole('heading', { name: 'Add Employee' })).toBeInTheDocument();

    // Check if all the input fields are rendered
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Salary ($)')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();

    // Check if the "Add" and "Cancel" buttons are present
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });
});
