import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {

    const { loginUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        // Show SweetAlert2 for Google Sign-In action
        Swal.fire({
            icon: 'info',
            title: 'Google Sign-In',
            text: 'Google Sign-In clicked!',
        });
        console.log('Google Sign-In clicked!');
    };

    const handleEmailSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Show SweetAlert2 with input values
        Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            html: `<p>Email: <strong>${email}</strong></p><p>Password: <strong>${password}</strong></p>`,
        });

        // Log input values for debugging
        console.log({ email, password })
        loginUser(email, password)
            .then(result => {
                console.log(result.user)

                //update last login time 

                const lastLoginTime = result?.user?.metadata?.lastSignInTime;

                const loginInfo = { email, lastLoginTime };

                fetch(`http://localhost:5000/users`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loginInfo)
                })
                    .then(
                        res => res.json()
                    )
                    .then(data => {
                        console.log(data)
                    })


            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            {/* Login Card */}
            <div className="bg-white shadow-md rounded-lg p-8 w-80">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <div className="flex items-center justify-center my-4">
                    <hr className="w-full border-gray-300" />
                    <span className="mx-2 text-gray-500">OR</span>
                    <hr className="w-full border-gray-300" />
                </div>
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                    <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        alt="Google Icon"
                        className="w-5 h-5"
                    />
                    Sign in with Google
                </button>
            </div>

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mt-6 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
            >
                Back
            </button>
        </div>
    );
};

export default Login;
