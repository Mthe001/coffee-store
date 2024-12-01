import React from 'react';
import Swal from 'sweetalert2';

const AddCoffee = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const coffee = {
            name: form.name.value,
            chiefName: form.chiefName.value,
            supplier: form.supplier.value,
            taste: form.taste.value,
            category: form.category.value,
            details: form.details.value,
            photo: form.photo.value,
            price: form.price.value,  // Capture price value
        };

        console.log("Coffee Data to be sent:", coffee);

        // Send data to the server
        fetch('http://localhost:5000/coffee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coffee),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to add coffee: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Server Response:', data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'success',
                        text: 'Coffee added successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
                form.reset(); // Reset the form after a successful submission
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while adding coffee. Please try again later.');
            });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Add Your Favorite Coffee</h1>
            <p className="text-center text-gray-600 mb-10">
                Fill out the form below to add a new coffee to our collection. Make sure to provide accurate details so others can enjoy your recommended coffee!
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 shadow-lg rounded-lg p-8 grid w-11/12 mx-auto gap-6 md:grid-cols-2"
            >
                {/* Coffee Name */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        Coffee Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter coffee name"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Chief Name */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        Chief Name
                    </label>
                    <input
                        type="text"
                        name="chiefName"
                        placeholder="Enter chief name"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Supplier */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        Supplier
                    </label>
                    <input
                        type="text"
                        name="supplier"
                        placeholder="Enter supplier name"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Taste */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        Taste
                    </label>
                    <input
                        type="text"
                        name="taste"
                        placeholder="Enter taste (e.g., Sweet, Bitter)"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        placeholder="Enter category (e.g., Espresso, Latte)"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Photo URL */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        Photo URL
                    </label>
                    <input
                        type="url"
                        name="photo"
                        placeholder="Enter photo URL"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Details */}
                <div className="flex flex-col md:col-span-2">
                    <label className="label mb-2 font-medium text-gray-700">
                        Details
                    </label>
                    <textarea
                        name="details"
                        placeholder="Enter additional details"
                        className="textarea textarea-bordered w-full"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 text-center">
                    <button type="submit" value="Add Coffee" className="btn btn-primary w-full md:w-1/2">
                        Add Coffee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCoffee;
