// Mock user data for client (patient), doctor and admin
export const mockUsers = [
  {
    id: "p-1001",
    role: "client",
    name: "John Patient",
    email: "client@example.com",
    phone: "+94-77-123-4567",
    dob: "1990-05-14",
    address: "No.12, Colombo",
  },

  {
    id: "d-2001",
    role: "doctor",
    name: "Dr. Priya Silva",
    email: "doctor@example.com",
    phone: "+94-77-765-4321",
    specialty: "Cardiology",
    hospital: "City General Hospital",
    license: "DOC-9345",
  },

  {
    id: "a-3001",
    role: "admin",
    name: "Admin User",
    email: "admin@example.com",
    phone: "+94-77-000-0000",
    permissions: ["users.manage", "site.settings"],
  },
];

export default mockUsers;
