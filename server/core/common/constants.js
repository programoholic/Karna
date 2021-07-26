const schools = [
  {
    id: "1",
    registrationNumber: "XYZ12001",
    name: "Delhi Public School - RK PURAM",
    address: {
      country: "India",
      street1: "B -11 , RK Puram",
      street2: "",
      city: "New Delhi",
      state: "New Delhi",
      zip: "110096",
    },
  },
];

const students = [
  {
    firstName: "Anis",
    lastName: "Alam",
    email: "anis.alam@g.com",
    rollId: "DPS001",
    className: "12",
    dob: "01-01-1995",
    school: {
      name: "Delhi Public School - RK Puram",
      registrationNumber: "XYZ12001",
    },
  },
  {
    firstName: "Adil",
    lastName: "Ali",
    email: "adil@g.com",
    rollId: "DPS002",
    className: "12",
    dob: "01-01-1996",
    school: {
      name: "Delhi Public School - RK Puram",
      registrationNumber: "XYZ12001",
    },
  }
];

module.exports = { schools,students };
