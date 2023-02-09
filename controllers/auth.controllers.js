import { User } from "../models/User.js"

export const register = async (req, res) => {
  const { email, password } = req.body
  try {
    //alternativa buscando por email
    let user = await User.findOne({ email })
    if(user) throw({code : 11000})

    user = new User({ email, password })

    await user.save()
    // jwt token
    return res.json({ ok: true })
  } catch (error) {
    if (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Ya existe este usuario' })
      }
    }
  }
}

export const login = async (req, res) => {
  res.json({ ok: 'login' });
}
