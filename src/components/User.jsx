
// import React, { useState } from 'react';
// import { Link, useLoaderData } from 'react-router';
// import Swal from 'sweetalert2'; // Import SweetAlert2

// const User = () => {
//     const loadedUser = useLoaderData();
//     const [users, setUsers] = useState(loadedUser); // No state modification needed

//     // Function to handle deleting a user
//     const handleDeleteUser = async (userId) => {
//         // Show SweetAlert confirmation before deleting the user
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: 'You won\'t be able to revert this!',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!',
//         });

//         if (result.isConfirmed) {
//             try {
//                 const response = await fetch(`http://localhost:5000/users/${userId}`, {
//                     method: 'DELETE',
//                 });
//                 const responseData = await response.json();

//                 if (response.ok) {
//                     // Show success SweetAlert2 popup
//                     Swal.fire(
//                         'Deleted!',
//                         'The user has been deleted.',
//                         'success'
//                     );
//                     // Remove the deleted user from the state
//                     setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
//                 } else {
//                     // Show error SweetAlert2 popup if the user deletion failed
//                     Swal.fire(
//                         'Error!',
//                         responseData.message || 'Failed to delete user',
//                         'error'
//                     );
//                 }
//             } catch (error) {
//                 console.error('Error deleting user:', error);
//                 Swal.fire(
//                     'Error!',
//                     'There was an error with the deletion process.',
//                     'error'
//                 );
//             }
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8">
//             {/* Dashboard Header */}
//             <div className="text-center mb-8">
//                 <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//                     User Dashboard
//                 </h1>
//                 <h2 className="text-lg text-gray-600 mt-2">Total Users: {users.length}</h2>
//                 <Link to='/'
//                     className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
//                 >
//                     Add User
//                 </Link>
//             </div>

//             {/* Table Section */}
//             <div className="overflow-x-auto shadow-xl rounded-lg bg-white border border-gray-300">
//                 <table className="min-w-full table-auto">
//                     <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
//                         <tr>
//                             <th className="px-6 py-4 text-sm font-medium">ID</th>
//                             <th className="px-6 py-4 text-sm font-medium">Name</th>
//                             <th className="px-6 py-4 text-sm font-medium">Email</th>
//                             <th className="px-6 py-4 text-sm font-medium">Photo</th>
//                             <th className="px-6 py-4 text-sm font-medium">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <tr
//                                 key={user._id}
//                                 className="bg-white border-b border-gray-200 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-pink-100 transition-all duration-300"
//                             >
//                                 <td className="px-6 py-4 text-sm font-medium">{user._id}</td>
//                                 <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
//                                 <td className="px-6 py-4 text-sm font-medium">{user.email}</td>
//                                 <td className="px-6 py-4 text-sm font-medium">
//                                     <img
//                                         src={user.photoUrl}
//                                         alt={`${user.name}'s photo`}
//                                         className="w-16 h-16 rounded-full object-cover border border-gray-300"
//                                     />
//                                 </td>
//                                 <td className="px-6 py-4 text-sm font-medium space-x-2">
//                                     <button
//                                         className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleDeleteUser(user._id)} // Attach delete handler
//                                         className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default User;


import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import Swal from 'sweetalert2'; // Import SweetAlert2

const User = () => {
    const loadedUser = useLoaderData();
    const [users, setUsers] = useState(loadedUser); // No state modification needed

    // Function to handle deleting a user
    const handleDeleteUser = async (userId) => {
        // Show SweetAlert confirmation before deleting the user
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/users/${userId}`, {
                    method: 'DELETE',
                });
                const responseData = await response.json();

                if (response.ok) {
                    // Show success SweetAlert2 popup
                    Swal.fire(
                        'Deleted!',
                        'The user has been deleted.',
                        'success'
                    );
                    // Remove the deleted user from the state
                    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
                } else {
                    // Show error SweetAlert2 popup if the user deletion failed
                    Swal.fire(
                        'Error!',
                        responseData.message || 'Failed to delete user',
                        'error'
                    );
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                Swal.fire(
                    'Error!',
                    'There was an error with the deletion process.',
                    'error'
                );
            }
        }
    };

    // Helper function to format the last login time
    const formatLastLoginTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Converts the timestamp to a human-readable format
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8">
            {/* Dashboard Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    User Dashboard
                </h1>
                <h2 className="text-lg text-gray-600 mt-2">Total Users: {users.length}</h2>
                <Link to='/'
                    className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                >
                    Add User
                </Link>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto shadow-xl rounded-lg bg-white border border-gray-300">
                <table className="min-w-full table-auto">
                    <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                        <tr>
                            <th className="px-6 py-4 text-sm font-medium">ID</th>
                            <th className="px-6 py-4 text-sm font-medium">Name</th>
                            <th className="px-6 py-4 text-sm font-medium">Email</th>
                            <th className="px-6 py-4 text-sm font-medium">Photo</th>
                            <th className="px-6 py-4 text-sm font-medium">Last Login Time</th> {/* Added Column */}
                            <th className="px-6 py-4 text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="bg-white border-b border-gray-200 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-pink-100 transition-all duration-300"
                            >
                                <td className="px-6 py-4 text-sm font-medium">{user._id}</td>
                                <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                                <td className="px-6 py-4 text-sm font-medium">{user.email}</td>
                                <td className="px-6 py-4 text-sm font-medium">
                                    <img
                                        src={user.photoUrl}
                                        alt={`${user.name}'s photo`}
                                        className="w-16 h-16 rounded-full object-cover border border-gray-300"
                                    />
                                </td>
                                <td className="px-6 py-4 text-sm font-medium">
                                    {/* Format the Last Login Time */}
                                    {user.lastLoginTime ? formatLastLoginTime(user.lastLoginTime) : 'Not Available'}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium space-x-2">
                                    <button
                                        className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user._id)} // Attach delete handler
                                        className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;
