import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axiosInstance';

const ShippingForm = () => {
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        address: '',
        country: '',
        state: '',
        city: '',
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const headers = {
        "X-CSCAPI-KEY": import.meta.env.VITE_GEO_API_KEY_VALUE,
    };
    // Add a new effect to restore saved address after countries are loaded
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('shippingAddress'));
        if (saved && countries.length > 0) {
            const countryObj = countries.find(c => c.name === saved.country);
            if (!countryObj) return;

            setAddress({
                address: saved.address,
                country: countryObj.iso2,
                state: '',
                city: ''
            });
        }
    }, [countries]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('shippingAddress'));
        if (saved && states.length > 0) {
            const stateObj = states.find(s => s.name === saved.state);
            if (!stateObj) return;

            setAddress((prev) => ({
                ...prev,
                state: stateObj.iso2,
                city: ''
            }));
        }
    }, [states]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('shippingAddress'));
        if (saved && cities.length > 0) {
            const cityObj = cities.find(c => c.name === saved.city);
            if (!cityObj) return;

            setAddress((prev) => ({
                ...prev,
                city: cityObj.id.toString()
            }));
        }
    }, [cities]);


    // Load countries on mount
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await API.get(
                    'https://api.countrystatecity.in/v1/countries',
                    { headers }
                );
                // console.log(res.data[0])
                setCountries(res.data);
            } catch (err) {
                console.error('Failed to load countries:', err.message);
            }
        };
        fetchCountries();
    }, []);

    // Load states when country changes
    useEffect(() => {
        const fetchStates = async () => {
            if (!address.country) return;
            try {
                const res = await API.get(
                    `https://api.countrystatecity.in/v1/countries/${address.country}/states`,
                    { headers }
                );
                // console.log(res.data[0])
                setStates(res.data);
                setCities([]); // reset cities
                setAddress((prev) => ({ ...prev, state: '', city: '' }));
            } catch (err) {
                console.error('Failed to load regions:', err.message);
            }
        };
        fetchStates();
    }, [address.country]);

    // Load cities when region changes
    useEffect(() => {
        const fetchCities = async () => {
            if (!address.country || !address.state) return;
            try {
                const res = await API.get(
                    `https://api.countrystatecity.in/v1/countries/${address.country}/states/${address.state}/cities/`,
                    { headers }
                );
                // console.log(res.data[0])
                setCities(res.data);
                setAddress((prev) => ({ ...prev, city: '' }));
            } catch (err) {
                console.error('Failed to load cities:', err.message);
            }
        };
        fetchCities();
    }, [address.state]);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const countryObj = countries.find((c) => c.iso2 === address.country);
        const stateObj = states.find((s) => s.iso2 === address.state);
        const cityObj = cities.find((c) => c.id.toString() === address.city);

        const fullAdress = {
            ...address,
            country: countryObj?.name || '',
            state: stateObj?.name || '',
            city: cityObj?.name || '',
        }
        localStorage.setItem('shippingAddress', JSON.stringify(fullAdress));
        navigate('/place-order');
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md mt-10 rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Shipping Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="address"
                    value={address.address}
                    onChange={handleChange}
                    placeholder="Street Address"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-amber-400"
                />

                {/* Country Dropdown */}
                <select
                    name="country"
                    value={address.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                >
                    <option value="" disabled>Select Country</option>
                    {countries.map((country) => (
                        <option key={country.iso2} value={country.iso2}>
                            {country.name}
                        </option>
                    ))}
                </select>

                {/* Region Dropdown */}
                <select
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                >
                    <option value="" disabled>Select Region</option>
                    {states.map((state) => (
                        <option key={state.iso2} value={state.iso2}>
                            {state.name}
                        </option>
                    ))}
                </select>

                {/* City Dropdown */}
                <select
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                >
                    <option value="" disabled>Select City</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="w-full py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600"
                >
                    Continue to Place Order
                </button>
            </form>
        </div>
    );
};

export default ShippingForm;
