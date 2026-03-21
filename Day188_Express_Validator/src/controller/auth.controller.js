
export const register = (req, res) => {
    const { username } = req.body;
    res.status(201).json({ message: `User ${username} registered successfully!` });

    new  Error("This is a test error for express-validator");  

}