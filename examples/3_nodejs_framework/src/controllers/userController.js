// We use named imports (the {} syntax) to import specific functions from the service
import { getAllUsers, getUserById } from '../services/userService.js';

export const getUsers = (req, res) => {
    // Now we can use getAllUsers directly instead of prefixing it with a namespace
    const users = getAllUsers();
    res.json(users);
};

export const getUser = (req, res) => {
    // Using getUserById directly
    const user = getUserById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
};
