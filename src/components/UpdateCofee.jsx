import React from 'react';
import { useLoaderData, useNavigate } from 'react-router'; // Import useNavigate
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
    // Load current coffee data from useLoaderData
    const coffee = useLoaderData();
    const navigate = useNavigate(); // Initialize useNavigate hook for redirection

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedCoffee = {
            name: form.name.value,
            chiefName: form.chiefName.value,
            supplier: form.supplier.value,
            taste: form.taste.value,
            category: form.category.value,
            details: form.details.value,
            photo: form.photo.value,
            price: form.price.value, // Capture price value
        };

        console.log("Updated Coffee Data to be sent:", updatedCoffee);

        // Send the updated data to the server
        fetch(`http://localhost:5000/coffee/${coffee._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCoffee),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to update coffee: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Server Response:', data);
                if (data.modifiedCount > 0) {
                    // Show success alert
                    Swal.fire({
                        title: 'Success',
                        text: 'Coffee updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    })

                    form.reset(); // Reset the form after successful submission
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while updating the coffee. Please try again later.');
            });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Update Coffee Details</h1>
            <p className="text-center text-gray-600 mb-10">
                Edit the details of your coffee and make sure it's perfect before submitting.
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 grid w-11/12 mx-auto gap-6 md:grid-cols-2"
            >
                {/* Coffee Name */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">Coffee Name</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={coffee.name}
                        placeholder="Enter coffee name"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Chief Name */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">Chief Name</label>
                    <input
                        type="text"
                        name="chiefName"
                        defaultValue={coffee.chiefName}
                        placeholder="Enter chief name"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Supplier */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">Supplier</label>
                    <input
                        type="text"
                        name="supplier"
                        defaultValue={coffee.supplier}
                        placeholder="Enter supplier name"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Taste */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">Taste</label>
                    <input
                        type="text"
                        name="taste"
                        defaultValue={coffee.taste}
                        placeholder="Enter taste (e.g., Sweet, Bitter)"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        defaultValue={coffee.category}
                        placeholder="Enter category (e.g., Espresso, Latte)"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Photo URL */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">Photo URL</label>
                    <input
                        type="url"
                        name="photo"
                        defaultValue={coffee.photo}
                        placeholder="Enter photo URL"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={coffee.price}
                        placeholder="Enter price"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Details */}
                <div className="flex flex-col md:col-span-2">
                    <label className="label mb-2 font-medium text-gray-700">Details</label>
                    <textarea
                        name="details"
                        defaultValue={coffee.details}
                        placeholder="Enter additional details"
                        className="textarea textarea-bordered w-full"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 text-center">
                    <button type="submit" className="btn btn-primary w-full md:w-1/2">
                        Update Coffee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCoffee;
