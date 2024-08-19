// pages/api/login.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { email, password } = req.body;
  
    // Dummy login logic for illustration purposes
    if (email === 'user@example.com' && password === 'password') {
      return res.status(200).json({ message: 'Login successful' });
    }
  
    return res.status(401).json({ message: 'Invalid email or password' });
  }