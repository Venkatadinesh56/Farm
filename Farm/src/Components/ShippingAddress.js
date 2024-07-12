import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShippingAddress.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ShippingAddress() {
    const location = useLocation();
    const { total } = location.state || {};
    const { product } = location.state;

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [pincode, setPincode] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [area, setArea] = useState("");
    const [landmark, setLandmark] = useState("");
    const [town, setTown] = useState("");
    const [state, setState] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [proc, setProc] = useState(true);

    const navigate = useNavigate();
    const email = localStorage.getItem('email'); // Retrieve email from localStorage

    useEffect(() => {
        methodget();
    }, []);

    function onNameChange(event) {
        setName(event.target.value);
    }

    function onNumberChange(event) {
        setNumber(event.target.value);
    }

    function onPincodeChange(event) {
        setPincode(event.target.value);
    }

    function onHouseNumberChange(event) {
        setHouseNumber(event.target.value);
    }

    function onAreaChange(event) {
        setArea(event.target.value);
    }

    function onLandmarkChange(event) {
        setLandmark(event.target.value);
    }

    function onTownChange(event) {
        setTown(event.target.value);
    }

    function onStateChange(event) {
        setState(event.target.value);
    }

    function initialAddAddress() {
        setProc(false);
        setShowModal(true);
        setEditIndex(-1); // Reset edit index
    }

    const handleadd = async () => {
        try {
            const response = await axios.post("http://localhost:5000/address", {
                table: email,
                name,
                number,
                pincode,
                houseNumber,
                area,
                landmark,
                town,
                state
            });
            alert("Successfully submitted the details");
            methodget(); // Fetch updated addresses
        } catch (error) {
            console.error("Error adding address:", error);
        }
    }

    const methodget = async () => {
        try {
            const response = await axios.get('http://localhost:5000/address', {
                params: { table: email }
            });
            setAddresses(response.data);
        } catch (error) {
            console.error('Error fetching user addresses:', error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/address/${id}`, {
                params: { table: email }
            });
            alert("Successfully deleted the address");
            methodget(); // Fetch updated addresses
        } catch (error) {
            console.error("Error deleting address:", error);
            alert("Invalid");
        }
    }

    const handleEdit = async (id) => {
        try {
            await axios.put(`http://localhost:5000/address/${id}`, {
                table: email,
                name,
                number,
                pincode,
                houseNumber,
                area,
                landmark,
                town,
                state
            });
            alert("Successfully updated the address");
            methodget(); // Fetch updated addresses

            // Update the selected address if it is the edited address
            if (selectedAddress && selectedAddress._id === id) {
                setSelectedAddress({
                    _id: id,
                    name,
                    number,
                    pincode,
                    houseNumber,
                    area,
                    landmark,
                    town,
                    state
                });
            }
        } catch (error) {
            console.error("Error updating address:", error);
        }
    }

    function addAddress() {
        if (name.trim() !== "" && houseNumber.trim() !== "" && area.trim() !== "" && town.trim() !== "" && state.trim() !== "" && pincode.trim() !== "" && number.trim() !== "") {
            if (editIndex >= 0) {
                handleEdit(addresses[editIndex]._id);
            } else {
                handleadd();
            }

            // Clear the fields
            setName("");
            setNumber("");
            setPincode("");
            setHouseNumber("");
            setArea("");
            setLandmark("");
            setTown("");
            setState("");
            setShowModal(false);
        } else {
            alert("Please fill all the necessary fields");
        }
        setProc(true);
    }

    function editAddress(index) {
        setProc(false);
        const address = addresses[index];
        setName(address.name);
        setNumber(address.number);
        setPincode(address.pincode);
        setHouseNumber(address.houseNumber);
        setArea(address.area);
        setLandmark(address.landmark);
        setTown(address.town);
        setState(address.state);
        setShowModal(true);
        setEditIndex(index);
    }

    function removeAddress(index) {
        const address = addresses[index];
        handleDelete(address._id);
    }

    function handleSelectAddress(index) {
        setSelectedAddress(addresses[index]);
    }

    function handleProceed() {
        if (selectedAddress) {
            navigate('/Paymentpage', { state: { address: selectedAddress, total, product } });
        } else {
            alert("Please select an address.");
        }
    }

    function cancelbutton() {
        setShowModal(false);
        setProc(true);
    }

    return (
        <div className='shipping-address-container'>
            <div className='content'>
                <center>
                    <h1 style={{ position: "relative", left: "-30px" }}>Saved Addresses</h1>
                    <hr style={{ position: "relative", left: "-30px" }} />
                </center>
                {showModal && (
                    <div className='modal'>
                        <div className='modal-content'>
                            <h2>{editIndex >= 0 ? "Edit Address" : "Add a new Address"}</h2>
                            <label htmlFor='name-container'>Full Name (First and last Name) :</label>
                            <br></br>
                            <input
                                className='inputk'
                                type='text'
                                value={name}
                                id='name-container'
                                onChange={onNameChange}
                                required
                            />
                            <br></br>
                            <label htmlFor='mobile-number-container'>Mobile Number :</label>
                            <input className='inputk'
                                type='text'
                                value={number}
                                onChange={onNumberChange}
                                id='mobile-number-container'
                                pattern="[1-9]{1}[0-9]{9}"
                                maxLength="10"
                                required
                            />
                            <br></br>
                            <label htmlFor='pincode-container'>Pincode :</label>
                            <input className='inputk'
                                type='text'
                                value={pincode}
                                onChange={onPincodeChange}
                                id='pincode-container'
                                pattern="[0-9]{6}"
                                maxLength="6"
                                required
                            />
                            <label htmlFor='house-number-container'>Flat, House Number :</label>
                            <input className='inputk'
                                type='text'
                                value={houseNumber}
                                onChange={onHouseNumberChange}
                                id='house-number-container'
                                pattern="[0-9][a-z][A-Z]{}"
                                maxLength="100"
                                required
                            />
                            <label htmlFor='area-container'><b>Area, Street, Village:</b></label>
                            <input className='inputk'
                                type='text'
                                value={area}
                                onChange={onAreaChange}
                                id='area-container'
                                pattern="[0-9][a-z][A-Z]{}"
                                maxLength="100"
                                required
                            />
                            <label htmlFor='landmark-container'>Landmark:</label>
                            <input className='inputk'
                                type='text'
                                value={landmark}
                                placeholder='E.g. near apollo hospital'
                                onChange={onLandmarkChange}
                                id='landmark-container'
                                pattern="[0-9][a-z][A-Z]{}"
                                maxLength="30"
                            />
                            <label htmlFor='town-container'>Town:</label>
                            <input className='inputk'
                                type='text'
                                value={town}
                                onChange={onTownChange}
                                id='town-container'
                                pattern="[0-9][a-z][A-Z]{}"
                                maxLength="30"
                                required
                            />
                            <label htmlFor='state-container'>State:</label>
                            <input className='inputk'
                                type='text'
                                value={state}
                                onChange={onStateChange}
                                id='state-container'
                                pattern="[0-9][a-z][A-Z]{}"
                                maxLength="30"
                                required
                            />
                            <div className='edit-buttons'>
                                <button className='buttonk' onClick={addAddress}>{editIndex >= 0 ? "Save Changes" : "Add Address"}</button>
                                <button className="buttonk" onClick={cancelbutton}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className='right-shipping-addresses'>
                    <div>
                        {addresses.map((addr, index) => (
                            <div key={index} className='address-item' onClick={() => handleSelectAddress(index)}>
                                <input
                                    type='radio'
                                    name='select'
                                    checked={selectedAddress === addr}
                                    onChange={() => handleSelectAddress(index)}
                                    className='radio-buttonk'
                                />
                                <div className='address-content'>
                                    <div>
                                        <div><b>Name:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{addr.name}</b></div>
                                        <div><b>Door_no:</b>&nbsp;{addr.houseNumber}</div>
                                        <div><b>Area:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{addr.area}</div>
                                        <div><b>Landmark:</b>{addr.landmark}</div>
                                        <div><b>State:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{addr.town},{addr.state}</div>
                                        <div><b>Pincode:</b>&nbsp;&nbsp; {addr.pincode}</div>
                                        <div><b>Number:</b>&nbsp;&nbsp;&nbsp;{addr.number}</div>
                                        <span className='edit-buttons'>
                                            <button className='buttonk' onClick={() => editAddress(index)}>Edit</button>
                                            <button className='buttonk' onClick={() => removeAddress(index)}>Remove</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {
                    proc && (
                        <div>
                            <button onClick={initialAddAddress} className='btn btn-addAddress'>ADD NEW ADDRESS</button>

                            <button onClick={handleProceed} style={{ position: "relative", top: "-106px", left: "80px", width: "200px" }} className='button_Proceed'>Proceed</button>

                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ShippingAddress;
