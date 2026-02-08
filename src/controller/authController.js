import * as authService from "../services/authService.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        
        if(!name || !email || !password) {
            res.status(400).json({Error: "Missing Fields"})
        }
        const user = await authService.registerUser(name,email,password) 
        res.status(201).json(user)

    } catch(error) {
        if (error.message === "user Already Exists") {
            return res.status(409).json({ error: error.message})
        }
        return res.status(500).json({ error: 'Internal Error'})
    }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const session = await authService.loginUser(email, password);
    return res.status(200).json(session);
  } catch (error) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
};