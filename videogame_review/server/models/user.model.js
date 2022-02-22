const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        userName: 
        {
            type: String,
            required: [true, "User name is required"],
            minlength: [3, "User name must be at least 3 characters"]
        },

        firstName: 
        {
            type: String,
            required: [true, "First name required"],
            minLength: [3, "First name must be at least 3 characters"]
        },

        lastName: 
        {
            type: String,
            required: [true, "Last name required"],
            minLength: [3, "Last name must be at least 3 characters"]
        },

        email:
        {
            type: String,
            required: [true, "Email is required"],
        },

        password:
        {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Password must be at least 8 characters"]
        }
    },
    {timestamps: true}
)

UserSchema.virtual("confirmPassword")
    .get( () => this._confirmPassword)
    .set( (value) => this._confirmPassword = value)


UserSchema.pre("validate", function(next)
{
    if (this.password !== this.confirmPassword)
    {
        this.invalidate("confirmPassword", "Passwords must match");
        console.log("Passwords don't match");
    }
    next()
})

UserSchema.pre("save", function(next)
{
    console.log("In PreSave")
    bcrypt.hash(this.password, 10)
        .then( (hashedPassword) =>
        {
            this.password = hashedPassword;
            next();
        })
})

const User = mongoose.model("User", UserSchema);

module.exports = User;