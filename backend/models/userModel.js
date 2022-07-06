import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
    },
    photo: {
        type: String,
    },
    image: {
        type: String
    },
    address: {
        type: String
    },
    postalCode: {
        type: String
    },
    ville: {
        type: String
    },
    pays: {
        type: String
    },
    lastName: {
        type: String,
    },
    pseudo: {
        type: String,
    },
    pushToken: {
        type: String,
    },
    phone: {
        type: String,
    },
    portefeuille: {
        type: Number,
    },
    unreadMessages: {
        type: Number,
    },
    notifications: [
        {
            notificationsTitle: {
                type: String
            },
            notificationsBody: {
                type: String
            },
            notificationsImage: {
                type: String
            }
        }
    ],
    avis: [
        {
            rating: {
                type: Number
            },
            rateur: {
                type: String
            },
            commentaire: {
                type: String
            }
        }
    ]
}, {
    timestamps: true
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

const User = mongoose.model("User", userSchema);

export default User;
