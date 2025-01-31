import { createClerkClient } from '@clerk/backend';
import { User } from '../models/user.model.js'; // Adjust the path as needed

// Initialize Clerk client
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId;
        const users = await User.find({ clerkId: { $ne: currentUserId } });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
// Register a new user
export const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Create user in Clerk
        const clerkUser = await clerk.users.createUser({
            emailAddress: email,
            password,
            firstName: fullName.split(" ")[0],
            lastName: fullName.split(" ")[1] || "",
        });

        // Save user to MongoDB
        const newUser = new User({
            clerkId: clerkUser.id,
            fullName: clerkUser.firstName + " " + clerkUser.lastName,
            email: clerkUser.emailAddresses[0].emailAddress,
            authMethod: "email_password",
        });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

// Handle Clerk webhook
export const handleClerkWebhook = async (req, res) => {
    const event = req.body;

    if (event.type === "user.created") {
        const userData = event.data;

        try {
            // Save user to MongoDB
            const newUser = new User({
                clerkId: userData.id,
                fullName: userData.first_name + " " + userData.last_name,
                email: userData.email_addresses[0].email_address,
                authMethod: userData.password_enabled ? "email_password" : "google",
            });
            await newUser.save();

            res.status(200).json({ message: "User saved to MongoDB", user: newUser });
        } catch (error) {
            res.status(500).json({ message: "Failed to save user", error: error.message });
        }
    } else {
        res.status(200).json({ message: "Webhook received, no action taken" });
    }
};