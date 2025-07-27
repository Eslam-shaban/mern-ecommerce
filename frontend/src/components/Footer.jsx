import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Company Info */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Veltrix</h2>
                    <p className="text-sm">
                        Your go-to e-commerce platform for amazing deals and high-quality products.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/products" className="hover:underline">Shop</Link></li>
                        <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
                        <li><Link to="/about" className="hover:underline">About Us</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex gap-4 text-xl">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaFacebookF /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaTwitter /></a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaInstagram /></a>
                        <a href="https://github.com/Eslam-shaban" target="_blank" rel="noreferrer" className="hover:text-white"><FaGithub /></a>
                    </div>
                </div>

                {/* Newsletter or Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
                    <p className="text-sm">Email: eslamshaban170@gmail.com</p>
                    <p className="text-sm">Phone: 01157963024</p>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Veltrix. All rights reserved.
            </div>
        </footer>
    );
}
