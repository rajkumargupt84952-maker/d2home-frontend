import logo from '../assets/logo.png'
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="w-full border-t border-[rgb(var(--border-color))] pt-10 pb-16 px-4 bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))]">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo + Social */}
                <div>
                    <img
                        alt="logo"
                        src={logo }
                        className="h-8 w-auto"
                    />
                    <div className="flex items-center gap-4 mt-5 text-gray-600 text-2xl">
                        <FaInstagram className="cursor-pointer hover:text-pink-500" />
                        <FaXTwitter className="cursor-pointer hover:text-black" />
                        <FaFacebook className="cursor-pointer hover:text-blue-600" />
                        <FaLinkedin className="cursor-pointer hover:text-blue-700" />
                    </div>

                    <p className="text-gray-500 text-sm mt-5">
                        © Zepto Marketplace Private Limited<br />
                        fssai lic no : 11224999000872
                    </p>
                </div>

                {/* Column 1 */}
                <div className="space-y-3">
                    <p className="font-normal">Home</p>
                    <p className="font-normal">Delivery Areas</p>
                    <p className="font-normal">Careers</p>
                    <p className="font-normal">Customer Support</p>
                    <p className="font-normal">Press</p>
                    <p className="font-normal">Mojo - a Zepto Blog</p>
                </div>

                {/* Column 2 */}
                <div className="space-y-3">
                    <p className="font-normal">Privacy Policy</p>
                    <p className="font-normal">Terms of Use</p>
                    <p className="font-normal">
                        Responsible Disclosure Policy
                    </p>
                    <p className="font-normal">Sell on Zepto</p>
                    <p className="font-normal">Deliver with Zepto</p>
                    <p className="font-normal">Franchise with Zepto</p>
                </div>

                {/* App Download */}
                <div>
                    <h3 className="font-normal mb-5">Download App</h3>

                    <button className="w-full border rounded-lg py-2 px-4 flex items-center justify-center gap-2 mb-3">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Play_2022_logo.svg"
                            className="w-5"
                        />
                        <span className="font-semibold">Get it on play store</span>
                    </button>

                    <button className="w-full border rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:shadow-md transition-shadow">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                            className="w-5"
                        />
                        <span className="font-semibold">Get it on app store</span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
