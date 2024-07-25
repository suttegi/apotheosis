import { Router } from 'express'
import { register,login, getme } from '../controllers/auth.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

// Registration  
router.post('/register', register)
// Login
router.post('/login', login)
// Get me
router.get('/getme', checkAuth, getme)

export default router