const express = require('express')
const { authenticate} = require(`../middlewares/Auth`)
const {
    userSignUp, verifyEmail, resendVerificationEmail, userLogin, resetPassword, forgotPassword, changePassword, makeAdmin, getOneUser, userLogOut,
    getAllUsers
} = require('../controllers/supplierController')
const midasValidator = require('../middlewares/validator')

const router = express.Router()

router.post('/sign-up', midasValidator(false), userSignUp)

router.post(`/log-in`, midasValidator(false), userLogin)

router.get(`/verify/:token`, verifyEmail)

router.post(`/resend-verification`, midasValidator(false), resendVerificationEmail)

router.post(`/forgot-password`, midasValidator(false), forgotPassword)

router.post(`/change-password/:token`, midasValidator(false), authenticate, changePassword)

router.post(`/reset-password/:token`, resetPassword)

router.get(`/make-admin/:userId`, makeAdmin)

router.get(`/getone/:userId`, getOneUser)

router.get(`/getallusers`, getAllUsers)

router.post(`/log-out`, userLogOut)

module.exports = router