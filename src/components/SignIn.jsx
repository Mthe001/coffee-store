import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const SignUp = () => {


    const { createUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        // Validate passwords
        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Passwords do not match!",
            });
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log('user created at firbase', result.user);

                const createdAt = result?.user?.metadata?.creationTime;
                const newUser = { name, email, photoURL, createdAt }

                //save new user info to the database

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.insertedId) {
                            console.log('user created in db')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })



            })

            .catch(error => {
                console.log('error', error)
            })

        form.reset();
        // Display SweetAlert2 dialog with the entered values
        Swal.fire({
            icon: "success",
            title: "Sign Up Successful",

        });

        // Log input values for debugging
        console.log({
            name,
            email,
            photoURL,
            password,
            confirmPassword
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
                <form onSubmit={handleSignUp} className="mt-6 space-y-4">
                    {/* Name Field */}
                    <div className="form-control">
                        <label className="label" htmlFor="name">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Photo URL Field */}
                    <div className="form-control">
                        <label className="label" htmlFor="photoURL">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="url"
                            id="photoURL"
                            name="photoURL"
                            placeholder="Enter your photo URL"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label" htmlFor="email">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="form-control">
                        <label className="label" htmlFor="password">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="form-control">
                        <label className="label" htmlFor="confirmPassword">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full">
                        Sign Up
                    </button>
                </form>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline w-full mt-4"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default SignUp;
