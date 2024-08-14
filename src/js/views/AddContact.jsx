import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const AddContact = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission

        // Check for empty fields
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            setErrorMessage("All fields are required.");
            return;
        }

        const response = await actions.addContact(formData);
        if (response.ok) {
            navigate('/');
        } else {
            setErrorMessage(response.message || "An error occurred while adding the contact.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add New Contact</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        required
                    />
                </div>

+                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                <button type="submit" className="btn btn-primary">
                    Save Contact
                </button>
                <Link to="/" className="btn btn-secondary ms-2">
                    Back to Contacts
                </Link>
            </form>
        </div>
    );
};
