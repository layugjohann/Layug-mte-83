const bcrypt = require('bcrypt');
const User = require("../models/User");

const auth = require("../auth");
const { errorHandler } = require("../auth");

module.exports.registerUser = (req, res) => {

	const { email, password } = req.body;

	if (!email.includes("@")) {
		return res.status(400).send({
			error: "Email invalid"
		});
	}

	if (password.length < 8) {
		return res.status(400).send({
			error: "Password must be at least 8 characters"
		});
	}

	return User.create({
		email: email,
		password: bcrypt.hashSync(password, 10)
	})
	.then(() => {
		return res.status(201).send({
			success: true,
			message: "User successfully registered"
		});
	})
	.catch(error => errorHandler(error, req, res));
};


module.exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: "Email and password must be provided"});
    }

    if (!email.includes("@")) {
        return res.status(400).send({ error: "Email format not valid"});
    }

    return User.findOne({ email })
    .then(user => {
        if (!user) {
            throw { status: 404, message: "User not found"};
        }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        throw { status: 409, message: "Incorrect password"};
    }

    return res.status(200).send({
        success: true,
        message: "User successfully logged in",
        access: auth.createAccessToken(user)
    });
})
    .catch(error => errorHandler(error, req, res));
}

module.exports.getDetails = (req, res) => {
    const userId = req.user.id;

    return User.findById(userId)
    .then(user => {
        if (!user) {
            throw { status: 404, message: "User not found"};
        }

        user.password = undefined;

        return res.status(200).send({
            success: true,
            user
        });
    })
    .catch(error => errorHandler(error, req, res));
}