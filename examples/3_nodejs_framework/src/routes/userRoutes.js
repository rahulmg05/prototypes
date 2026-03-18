// Here we import the DEFAULT export from the express package.
import express from 'express';
// Here we use NAMED imports (curly braces) to import specific functions from the controller.
import { getUsers, getUser } from '../controllers/userController.js';

const router = express.Router();

// Using the named imports directly
router.get('/', getUsers);
router.get('/:id', getUser);

// This module has ONE default export: the configured Express Router.
// Other files can import this router and name it whatever they want.
export default router;
