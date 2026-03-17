// A mock service interacting with a mock database
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

export const getAllUsers = () => {
    return users;
};

export const getUserById = (id) => {
    return users.find(u => u.id === parseInt(id));
};
