const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')
const userSchema = new Schema({
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    }
})

// User-defined function for signup, mongoose provides this functionality. it is called a static function
userSchema.statics.signup = async function(email, password) {
        //validatoron
        if(!email || !password){
            throw Error('All fields must be filled ')
        }
        if (!validator.isEmail(email)) {
            throw Error('Tumhaare wahan aisi email id hoti h kya?')
          }
        // Check if the email already exists
        const exists = await this.findOne({ email })
        if (exists) {
            throw new Error('Email already in use')
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        // Create a new user with the hashed password
        const user = await this.create({ email, password: hash })
        return user
    // } catch (error) {
    //     // Handle the error here
    //     console.error('Signup error:', error.message)
    //     throw error; // Rethrow the error to propagate it further if needed
    // }
}

//static method for logging in
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled ')
    }
    const user = await this.findOne({ email })

    if(!user ){
        throw Error ('No match found bruh')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error ('INCRORRECT PASSWORD')
    }
    return user 
}


module.exports = mongoose.model('User', userSchema)
