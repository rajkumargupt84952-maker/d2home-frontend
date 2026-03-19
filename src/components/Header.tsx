import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../hooks/useTheme'
import { useEffect, useState } from 'react'

import logo from '../assets/logo.png'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    PopoverGroup,
    // Popover,
    // PopoverButton,
    // PopoverPanel,
    // Tab,
    TabGroup,
    // TabList,
    // TabPanel,
    // TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import LoginModal from '../Module/Auth/Pages/Login'
import RegisterModal from '../Module/Auth/Pages/Register'
import type { UserData } from '../interfaces/users'
import { useCartContext } from '../contexts/cartContext'

const navigation = {

    pages: [
        { name: 'All', href: '/all' },
        { name: 'Fruit & Vegetables', href: '/fruit-vegetables' },
        { name: 'Grocery', href: '/grocery' },
    ]

}

export default function Navigation() {
    const navigate = useNavigate();
    const { cartCount } = useCartContext();
    const [openLogin, setOpenLogin] = useState<boolean>(false);
    const [registerModel, setRegisterModel] = useState<boolean>(false);
    const [open, setOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            setUser(JSON.parse(user));
        }
    }, [openLogin, registerModel])


    return (
        <div className="bg-[rgb(var(--bg-secondary))]">
            {/* Mobile menu */}
            <LoginModal show={openLogin} setShow={setOpenLogin} />
            <RegisterModal show={registerModel} setShow={setRegisterModel} />
            <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                />
                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-[rgb(var(--bg-secondary))] pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
                    >
                        <div className="flex px-4 pt-5 pb-2">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>

                        {/* Links */}
                        <TabGroup className="mt-2">

                        </TabGroup>

                        <div className="space-y-6 px-4 py-6">
                            {navigation.pages.map((page) => (
                                <div key={page.name} className="flow-root">
                                    <Link to={page.href} className="-m-2 block p-2 font-medium text-[rgb(var(--text-primary))] hover:text-green-600">
                                        {page.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                        {user?.name ? user.name : <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            <div className="flow-root">
                                <div onClick={() => setOpenLogin(true)} className="-m-2 block p-2 font-medium text-[rgb(var(--text-primary))] hover:text-green-600">
                                    Sign in
                                </div>
                            </div>
                            <div className="flow-root">
                                <Link to="/signup" className="-m-2 block p-2 font-medium text-[rgb(var(--text-primary))] hover:text-green-600">
                                    Create account
                                </Link>
                            </div>
                        </div>}

                    </DialogPanel>
                </div>
            </Dialog>

            <header className="relative bg-[rgb(var(--bg-secondary))]">
                <p className="flex h-10 items-center justify-center bg-green-700 px-4 text-sm font-medium text-[rgb(var(--text-primary))] hover:text-green-600 sm:px-6 lg:px-8">
                    Get free delivery in Lucknow
                </p>

                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="relative rounded-md bg-[rgb(var(--bg-primary))] p-2 text-gray-400 lg:hidden"
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>

                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0">
                            <Link to="/all">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt="logo"
                                    src={logo}
                                    className="h-8 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Flyout menus */}
                        <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="flex h-full space-x-8">
                                {/* {navigation.categories.map((category) => (
                                    <Popover key={category.name} className="flex">
                                        <div className="relative flex">
                                            <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-[rgb(var(--text-primary))] hover:text-green-600 transition-colors duration-200 ease-out">
                                                {category.name}
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600"
                                                />
                                            </PopoverButton>
                                        </div>
                                        <PopoverPanel
                                            transition
                                            className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-whi transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                                        >
                                            <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />
                                            <div className="relative bg-[rgb(var(--bg-secondary))]">
                                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                            {category.featured.map((item) => (
                                                                <div key={item.name} className="group relative text-base sm:text-sm">
                                                                    <img
                                                                        alt={item.imageAlt}
                                                                        src={item.imageSrc}
                                                                        className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                                                    />
                                                                    <a href={item.href} className="mt-6 block font-medium text-[rgb(var(--text-primary))] hover:text-green-600">
                                                                        <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                                        {item.name}
                                                                    </a>
                                                                    <p aria-hidden="true" className="mt-1">
                                                                        Shop now
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                            {category.sections.map((section) => (
                                                                <div key={section.name}>
                                                                    <p id={`${section.name}-heading`} className="font-medium text-[rgb(var(--text-primary))] hover:text-green-600">
                                                                        {section.name}
                                                                    </p>
                                                                    <ul
                                                                        role="list"
                                                                        aria-labelledby={`${section.name}-heading`}
                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                    >
                                                                        {section.items.map((item) => (
                                                                            <li key={item.name} className="flex">
                                                                                <a href={item.href} className="text-[rgb(var(--text-primary))] hover:text-green-500">
                                                                                    {item.name}
                                                                                </a>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </PopoverPanel>
                                    </Popover>
                                ))} */}
                                {navigation.pages.map((page) => (
                                    <Link
                                        key={page.name}
                                        to={page.href}
                                        className="flex items-center text-sm font-medium text-[rgb(var(--text-primary))] hover:text-green-600"
                                    >
                                        {page.name}
                                    </Link>
                                ))}
                            </div>
                        </PopoverGroup>

                        <div className="ml-auto flex items-center">
                            {user?.name ? <div>{user.name} <span className="ml-2 text-sm font-medium text-green-500 cursor-pointer" onClick={() => {
                                localStorage.clear()
                                setUser(null);
                            }
                            }>
                                Logout
                            </span></div> :
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <div onClick={() => setOpenLogin(true)} className="cursor-pointer text-sm font-medium text-green-500 hover:text-green-700">
                                        Sign in
                                    </div>
                                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                                    <div onClick={() => setRegisterModel(true)} className="cursor-pointer text-sm font-medium text-green-500 hover:text-green-700">
                                        Create account
                                    </div>
                                </div>}

                            {/* Search */}
                            <div className="flex lg:ml-6">
                                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Search</span>
                                    <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                                </a>
                            </div>
                            <div className="flex lg:ml-6">
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-lg bg-[rgb(var(--bg-secondary))] hover:bg-[rgb(var(--bg-tertiary))] text-[rgb(var(--text-primary))] transition-all duration-200 border border-[rgb(var(--border-color))]"
                                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                                >
                                    {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
                                </button>
                            </div>

                            {/* Cart */}
                            <div className="ml-4 flow-root lg:ml-6" onClick={() => navigate('/checkout')}>
                                <a href="#" className="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon
                                        aria-hidden="true"
                                        className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartCount}</span>
                                    <span className="sr-only">items in cart, view bag</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

