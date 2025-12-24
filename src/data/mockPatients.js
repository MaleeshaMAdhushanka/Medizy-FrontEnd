const mockPatients = [
  {
    id: 1,
    patientId: "P001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+94 77 123 4567",
    age: 32,
    gender: "Female",
    bloodType: "O+",
    allergies: "Penicillin",
    address: "123 Main Street, Colombo 03",
    lastVisit: "2024-01-15",
    totalVisits: 8,
    status: "active",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    emergencyContact: {
      name: "John Johnson",
      relationship: "Husband",
      phone: "+94 77 987 6543",
    },
    medicalHistory: [
      {
        condition: "Hypertension",
        date: "2023-06-15",
        notes:
          "Diagnosed with stage 1 hypertension, prescribed lifestyle changes and medication.",
      },
      {
        condition: "Annual Check-up",
        date: "2024-01-15",
        notes: "Routine annual physical examination. All vitals normal.",
      },
    ],
    recentAppointments: [
      {
        date: "2024-01-15",
        type: "Follow-up",
        diagnosis: "Hypertension management",
        status: "completed",
      },
      {
        date: "2024-02-20",
        type: "Consultation",
        diagnosis: "Routine check-up",
        status: "scheduled",
      },
    ],
    documents: [
      {
        name: "Lab Results - Blood Test",
        uploadDate: "2024-01-15",
      },
      {
        name: "ECG Report",
        uploadDate: "2024-01-10",
      },
    ],
  },
  {
    id: 2,
    patientId: "P002",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+94 71 234 5678",
    age: 45,
    gender: "Male",
    bloodType: "A+",
    allergies: "None",
    address: "456 Park Avenue, Kandy",
    lastVisit: "2024-01-20",
    totalVisits: 12,
    status: "active",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    emergencyContact: {
      name: "Lisa Chen",
      relationship: "Wife",
      phone: "+94 71 876 5432",
    },
    medicalHistory: [
      {
        condition: "Diabetes Type 2",
        date: "2022-03-10",
        notes:
          "Diagnosed with Type 2 diabetes, managing with diet and medication.",
      },
    ],
    recentAppointments: [
      {
        date: "2024-01-20",
        type: "Follow-up",
        diagnosis: "Diabetes management",
        status: "completed",
      },
    ],
    documents: [
      {
        name: "HbA1c Test Results",
        uploadDate: "2024-01-20",
      },
    ],
  },
  {
    id: 3,
    patientId: "P003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+94 76 345 6789",
    age: 28,
    gender: "Female",
    bloodType: "B+",
    allergies: "Shellfish",
    address: "789 Ocean Drive, Galle",
    lastVisit: "2024-01-18",
    totalVisits: 5,
    status: "active",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    emergencyContact: {
      name: "Carlos Rodriguez",
      relationship: "Brother",
      phone: "+94 76 123 4567",
    },
    medicalHistory: [
      {
        condition: "Migraine",
        date: "2023-08-15",
        notes: "Chronic migraine episodes, prescribed preventive medication.",
      },
    ],
    recentAppointments: [
      {
        date: "2024-01-18",
        type: "Consultation",
        diagnosis: "Migraine follow-up",
        status: "completed",
      },
    ],
    documents: [
      {
        name: "MRI Scan Report",
        uploadDate: "2024-01-18",
      },
    ],
  },
];

export default mockPatients;
