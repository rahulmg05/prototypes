import * as userService from '../services/userService.js';

export const getUsers = (req, res) => {
    const users = userService.getAllUsers();
    res.json(users);
};

export const getUser = (req, res) => {
    const user = userService.getUserById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
};
