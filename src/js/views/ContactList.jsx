import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import '../../styles/contact.css';

export const ContactList = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleEdit = (contact) => {
        setCurrentContact(contact); 
        setFormData({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            address: contact.address
        });
        setShowModal(true); 
    };

    const handleDelete = (id) => {
        actions.deleteContact(id);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async () => {
        if (currentContact) {
            const updatedData = {
                id: currentContact.id,
                ...formData
            };
            const response = await actions.updateContact(updatedData);
            if (response.ok) {
                setShowModal(false); 
            } else {
                alert(response.message || "Failed to update contact.");
            }
        }
    };

    return (
        <>
            <div className="container-fluid d-flex justify-content-center text-center p-5">
                <h1>Contact List</h1>
            </div>
            <div className="container mt-5">
                {store.contacts.map((contact, index) => (
                    <div className="card mb-3" key={index}>
                        <div className="row g-0 align-items-center">
                            <div className="col-md-2 text-center">
                                <img src="https://picsum.photos/200" className="img-fluid rounded-circle" alt={`${contact.name} Image`} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="card-title mb-0">{contact.name}</h5>
                                        <div>
                                            <button onClick={() => handleEdit(contact)} className="me-3"><i className="fas fa-edit"></i></button>
                                            <button onClick={() => { handleDelete(contact.id) }}><i className="fas fa-trash"></i></button>
                                        </div>
                                    </div>
                                    <p className="card-text mb-0">
                                        <i className="fas fa-map-marker-alt"></i> {contact.address}
                                    </p>
                                    <p className="card-text mb-0">
                                        <i className="fas fa-phone"></i> {contact.phone}
                                    </p>
                                    <p className="card-text">
                                        <i className="fas fa-envelope"></i> {contact.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {store.contacts.length === 0 && <h5 className="text-center">Your Contact List is empty, start by <Link to={'/add-contact'}>Adding a Contact</Link></h5>}
            </div>

            {/* Modal for editing contact */}
            {showModal && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Contact</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
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
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
