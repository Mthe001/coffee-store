

import React, { useState } from 'react';
import { Link, NavLink, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Home = () => {
    // Mock authentication state (replace with real logic as needed)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Load coffee data using useLoaderData
    const coffees = useLoaderData();

    // Handle login/logout toggling
    const handleAuthToggle = () => {
        if (isLoggedIn) {
            // Log out logic (clear user session, etc.)
            Swal.fire({
                title: "Logged Out!",
                text: "You have successfully logged out.",
                icon: "success",
            });
        } else {
            // Log in logic (navigate to login page or display login modal)
            Swal.fire({
                title: "Login",
                text: "Redirecting to login page...",
                icon: "info",
            });
        }
        setIsLoggedIn(!isLoggedIn);
    };

    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/coffee/${_id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your coffee has been deleted.",
                                icon: "success",
                            });
                        }
                    });
            }
        });
    };

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
                <h1 className="text-xl font-bold">Coffee Shop</h1>
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={handleAuthToggle}
                                className="btn btn-outline text-white border-white hover:bg-white hover:text-gray-800"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="btn btn-outline text-white border-white hover:bg-white hover:text-gray-800">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-outline text-white border-white hover:bg-white hover:text-gray-800">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                    <NavLink to="/users" className="btn btn-outline text-white border-white">
                        users
                    </NavLink>
                </div>
            </nav>

            {/* Main Content */}
            <div className="w-11/12 mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    All the coffees are here: {coffees.length}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Loop over the coffees array using map */}
                    {coffees.map((coffee) => {
                        // Destructuring the coffee object inside the map
                        const { _id, name, photo, category, taste, details, price } = coffee;

                        return (
                            <div
                                key={_id}
                                className="card w-full bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300"
                            >
                                <figure>
                                    <img
                                        src={photo}
                                        alt={name}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                </figure>
                                <div className="card-body p-6">
                                    <h2 className="card-title text-xl font-semibold text-gray-800">{name}</h2>
                                    <p className="text-gray-600">Category: {category}</p>
                                    <p className="text-gray-600">Taste: {taste}</p>
                                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                                        {details}
                                    </p>

                                    {/* Display Price */}
                                    <p className="text-lg font-semibold text-gray-800 mt-4">
                                        Price: ${price}
                                    </p>

                                    <div className="card-actions justify-between mt-4">
                                        {/* Edit, Details, and Delete buttons */}
                                        <div className="flex space-x-2">
                                            <Link to={`updateCoffee/${_id}`}>
                                                <button className="btn btn-warning btn-sm">Edit</button>
                                            </Link>
                                            <button className="btn btn-info btn-sm">Details</button>
                                            <button
                                                onClick={() => handleDelete(_id)}
                                                className="btn btn-error btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
