import React, { useState } from "react";
import { Link } from "react-router-dom";

// Example patient data, replace with real data from API or props
const initialPatients = [
    {
        id: 1,
        name: "John Doe",
        age: 34,
        bloodType: "A+",
        contact: "john@example.com",
        status: "Waiting",
        diagnosis: "Chronic Kidney Disease",
        priority: "High"
    },
    {
        id: 2,
        name: "Jane Smith",
        age: 29,
        bloodType: "O-",
        contact: "jane@example.com",
        status: "Matched",
        diagnosis: "Polycystic Kidney Disease",
        priority: "Critical"
    },
    {
        id: 3,
        name: "Michael Johnson",
        age: 41,
        bloodType: "B+",
        contact: "michael@example.com",
        status: "Under Treatment",
        diagnosis: "Diabetic Nephropathy",
        priority: "Medium"
    }
];

const tableHeaderStyle = "px-4 py-2 border-b font-semibold text-left bg-gray-100";
const tableCellStyle = "px-4 py-2 border-b";

const PatientAdmin = () => {
    const [patients, setPatients] = useState(initialPatients);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // Filter patients based on search term and status
    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            patient.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            patient.bloodType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || patient.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const updatePatientStatus = (patientId, newStatus) => {
        setPatients(patients.map(patient => 
            patient.id === patientId ? { ...patient, status: newStatus } : patient
        ));
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "Critical": return "text-red-600 bg-red-100";
            case "High": return "text-orange-600 bg-orange-100";
            case "Medium": return "text-yellow-600 bg-yellow-100";
            default: return "text-gray-600 bg-gray-100";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Waiting": return "text-blue-600 bg-blue-100";
            case "Matched": return "text-green-600 bg-green-100";
            case "Under Treatment": return "text-purple-600 bg-purple-100";
            default: return "text-gray-600 bg-gray-100";
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-8 p-6 bg-white rounded shadow">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Patient Management</h2>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                        Add New Patient
                    </button>
                    <Link
                        to="/hospital-admin"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search patients by name, email, or blood type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div className="min-w-[150px]">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="All">All Status</option>
                        <option value="Waiting">Waiting</option>
                        <option value="Matched">Matched</option>
                        <option value="Under Treatment">Under Treatment</option>
                    </select>
                </div>
            </div>

            {/* Patient Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-700">Total Patients</h3>
                    <p className="text-2xl font-bold text-blue-900">{patients.length}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-700">Waiting</h3>
                    <p className="text-2xl font-bold text-yellow-900">
                        {patients.filter(p => p.status === "Waiting").length}
                    </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-700">Matched</h3>
                    <p className="text-2xl font-bold text-green-900">
                        {patients.filter(p => p.status === "Matched").length}
                    </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-700">Under Treatment</h3>
                    <p className="text-2xl font-bold text-purple-900">
                        {patients.filter(p => p.status === "Under Treatment").length}
                    </p>
                </div>
            </div>

            {/* Patient Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border rounded">
                    <thead>
                        <tr>
                            <th className={tableHeaderStyle}>Patient ID</th>
                            <th className={tableHeaderStyle}>Name</th>
                            <th className={tableHeaderStyle}>Age</th>
                            <th className={tableHeaderStyle}>Blood Type</th>
                            <th className={tableHeaderStyle}>Contact</th>
                            <th className={tableHeaderStyle}>Diagnosis</th>
                            <th className={tableHeaderStyle}>Priority</th>
                            <th className={tableHeaderStyle}>Status</th>
                            <th className={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient) => (
                            <tr key={patient.id} className="hover:bg-gray-50">
                                <td className={tableCellStyle}>
                                    <span className="font-mono text-sm">#{patient.id}</span>
                                </td>
                                <td className={tableCellStyle}>
                                    <div className="font-medium text-gray-900">{patient.name}</div>
                                </td>
                                <td className={tableCellStyle}>{patient.age}</td>
                                <td className={tableCellStyle}>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {patient.bloodType}
                                    </span>
                                </td>
                                <td className={tableCellStyle}>
                                    <div className="text-sm text-gray-900">{patient.contact}</div>
                                </td>
                                <td className={tableCellStyle}>
                                    <div className="text-sm text-gray-600">{patient.diagnosis}</div>
                                </td>
                                <td className={tableCellStyle}>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(patient.priority)}`}>
                                        {patient.priority}
                                    </span>
                                </td>
                                <td className={tableCellStyle}>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                                        {patient.status}
                                    </span>
                                </td>
                                <td className={tableCellStyle}>
                                    <div className="flex gap-2">
                                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                                            View
                                        </button>
                                        <button className="text-green-600 hover:text-green-900 text-sm font-medium">
                                            Edit
                                        </button>
                                        <select
                                            value={patient.status}
                                            onChange={(e) => updatePatientStatus(patient.id, e.target.value)}
                                            className="text-xs border border-gray-300 rounded px-2 py-1"
                                        >
                                            <option value="Waiting">Waiting</option>
                                            <option value="Matched">Matched</option>
                                            <option value="Under Treatment">Under Treatment</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* No patients found message */}
            {filteredPatients.length === 0 && (
                <div className="text-center text-gray-500 mt-6 py-8">
                    {searchTerm || statusFilter !== "All" 
                        ? "No patients found matching your criteria." 
                        : "No patients found."
                    }
                </div>
            )}

            {/* Footer with summary */}
            <div className="mt-6 text-sm text-gray-600 text-center">
                Showing {filteredPatients.length} of {patients.length} patients
            </div>
        </div>
    );
};

export default PatientAdmin;
