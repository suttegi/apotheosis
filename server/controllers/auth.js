import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req,res) => {
    try {
        const { username, password } = req.body
        const isUsed = await User.findOne({username})
        if (isUsed) {
            res.json({
                message: "invalid"
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
        })
        const token = jwt.sign(
            {
                id: newUser._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        )

        await newUser.save()

        res.json({
            newUser, message: "registred"
        })

    } catch (error) {
        console.log(error)
    }
}

export const login = async (req,res) => {
    try {
        const { username, password } = req.body
        const isUser = await User.findOne({username})

        if(!isUser){
            res.json({
                message: "invalid login or password"
            })
        }
        const isPass = await bcrypt.compare(password, isUser.password)
        if(!isPass){
            res.json({
                message: "invalid login or password"
            })
        }

        const token = jwt.sign(
            {
                id: isUser._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        )


        res.json({
            token, isUser, message: "succesfully"
        })
    } catch (error) {
        console.log(error)
    }
}

export const getme = async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user){
            res.json({
                message: "invalid"
            })
        }
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        )

        res.json({
            user, token
        })


    } catch (error) {
        console.log(error)
    }
}