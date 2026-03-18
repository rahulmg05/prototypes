// A mock service with some mock data
const users = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 24 }
];

// In a real app, these would be async database calls
export const getAllUsers = async () => {
  return users;
};

export const createUser = async (userData) => {
  const newUser = {
    id: users.length + 1,
    ...userData
  };
  users.push(newUser);
  return newUser;
};
