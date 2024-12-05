import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
        const [foods, setFoods] = useState([]);
        const [loading, setLoading] = useState(true);
        const [showAddForm, setShowAddForm] = useState(false);
        const [newFood, setNewFood] = useState({
                name: '',
                description: '',
                price: '',
                category: '',
                restaurant: '',
                quantity: 10,
                image: ''
        });

        // Fetch foods
        useEffect(() => {
                loadFoods();
        }, []);

        const loadFoods = async () => {
                try {
                        const response = await axios.get('http://localhost:3000/api/foods');
                        setFoods(response.data);
                } catch (error) {
                        console.error('Error loading foods:', error);
                } finally {
                        setLoading(false);
                }
        };

        // Handle quantity update
        const handleQuantityChange = async (foodId, newQuantity) => {
                try {
                        await axios.put(`http://localhost:3000/api/foods/${foodId}`, {
                                quantity: newQuantity
                        });
                        loadFoods(); // Reload foods to get updated data
                } catch (error) {
                        console.error('Error updating quantity:', error);
                }
        };

        // Handle new food submission
        const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                        await axios.post('http://localhost:3000/api/foods', newFood);
                        setNewFood({
                                name: '',
                                description: '',
                                price: '',
                                category: '',
                                restaurant: '',
                                quantity: 10,
                                image: ''
                        });
                        setShowAddForm(false);
                        loadFoods();
                } catch (error) {
                        console.error('Error adding food:', error);
                }
        };

        if (loading) {
                return <div className="flex justify-center items-center h-screen">Loading...</div>;
        }

        return (
                <div className="container mx-auto p-4">
                        <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">QuickBite Inventory Management</h1>
                                <button
                                        onClick={() => setShowAddForm(!showAddForm)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                        {showAddForm ? 'Cancel' : 'Add New Food'}
                                </button>
                        </div>

                        {/* Add Food Form */}
                        {showAddForm && (
                                <div className="mb-8 bg-white p-6 rounded-lg shadow">
                                        <h2 className="text-xl font-semibold mb-4">Add New Food</h2>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                        <label className="block text-sm font-medium mb-1">Name</label>
                                                        <input
                                                                type="text"
                                                                value={newFood.name}
                                                                onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                                                                className="w-full p-2 border rounded"
                                                                required
                                                        />
                                                </div>
                                                <div>
                                                        <label className="block text-sm font-medium mb-1">Description</label>
                                                        <textarea
                                                                value={newFood.description}
                                                                onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
                                                                className="w-full p-2 border rounded"
                                                        />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                                <label className="block text-sm font-medium mb-1">Price</label>
                                                                <input
                                                                        type="number"
                                                                        step="0.01"
                                                                        value={newFood.price}
                                                                        onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
                                                                        className="w-full p-2 border rounded"
                                                                        required
                                                                />
                                                        </div>
                                                        <div>
                                                                <label className="block text-sm font-medium mb-1">Category</label>
                                                                <input
                                                                        type="text"
                                                                        value={newFood.category}
                                                                        onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                                                                        className="w-full p-2 border rounded"
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                                <label className="block text-sm font-medium mb-1">Restaurant</label>
                                                                <input
                                                                        type="text"
                                                                        value={newFood.restaurant}
                                                                        onChange={(e) => setNewFood({ ...newFood, restaurant: e.target.value })}
                                                                        className="w-full p-2 border rounded"
                                                                        required
                                                                />
                                                        </div>
                                                        <div>
                                                                <label className="block text-sm font-medium mb-1">Initial Quantity</label>
                                                                <input
                                                                        type="number"
                                                                        value={newFood.quantity}
                                                                        onChange={(e) => setNewFood({ ...newFood, quantity: parseInt(e.target.value) })}
                                                                        className="w-full p-2 border rounded"
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div>
                                                        <label className="block text-sm font-medium mb-1">Image URL</label>
                                                        <input
                                                                type="text"
                                                                value={newFood.image}
                                                                onChange={(e) => setNewFood({ ...newFood, image: e.target.value })}
                                                                className="w-full p-2 border rounded"
                                                        />
                                                </div>
                                                <button
                                                        type="submit"
                                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                                >
                                                        Add Food
                                                </button>
                                        </form>
                                </div>
                        )}

                        {/* Food List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {foods.map((food) => (
                                        <div key={food.id} className="bg-white p-4 rounded-lg shadow">
                                                <div className="aspect-w-16 aspect-h-9 mb-4">
                                                        <img
                                                                src={food.image || 'https://via.placeholder.com/300'}
                                                                alt={food.name}
                                                                className="object-cover rounded-lg w-full h-48"
                                                        />
                                                </div>
                                                <h3 className="text-lg font-semibold">{food.name}</h3>
                                                <p className="text-gray-600 text-sm mb-2">{food.restaurant}</p>
                                                <p className="text-gray-500 text-sm mb-4">{food.description}</p>
                                                <div className="flex justify-between items-center mb-2">
                                                        <span className="font-bold">${food.price}</span>
                                                        <div className="flex items-center space-x-2">
                                                                <button
                                                                        onClick={() => handleQuantityChange(food.id, Math.max(0, food.quantity - 1))}
                                                                        className="bg-gray-200 px-2 py-1 rounded"
                                                                >
                                                                        -
                                                                </button>
                                                                <span className="px-2">{food.quantity}</span>
                                                                <button
                                                                        onClick={() => handleQuantityChange(food.id, food.quantity + 1)}
                                                                        className="bg-gray-200 px-2 py-1 rounded"
                                                                >
                                                                        +
                                                                </button>
                                                        </div>
                                                </div>
                                                <div className={`text-sm ${food.quantity < 5 ? 'text-red-500' : food.quantity < 10 ? 'text-yellow-500' : 'text-green-500'}`}>
                                                        {food.quantity === 0 ? 'Out of stock' :
                                                                food.quantity < 5 ? 'Low stock' :
                                                                        'In stock'}
                                                </div>
                                        </div>
                                ))}
                        </div>
                </div>
        );
}

export default App;