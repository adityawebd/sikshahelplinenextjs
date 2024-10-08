'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Modal from 'react-modal';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaSearch, FaYoutube, FaGraduationCap } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [notificationType, setNotificationType] = useState('normal');
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpenState] = useState(false); // Added this line to fix the ReferenceError


    useEffect(() => {
        // Simulate data fetching
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/notification`);
                const result = await res.json();
                if (result.success) {
                    setNotifications(result.data);
                    // setFilteredBlogs(result.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const handleReadMore = (notificationName) => {
        window.location.href = `/notifications/${notificationName}`;
        closeModal();
    };

    const handleItemClick = (itemName) => {
        setActiveItem(itemName === activeItem ? null : itemName);
    };

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const fetchNotifications = async () => {
        // Replace with your backend API endpoint
        const response = await fetch('/YOUR_BACKEND_API_ENDPOINT');
        const data = await response.json();
        setNotifications(data);
    };

    useEffect(() => {
        if (modalIsOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [modalIsOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrolled(scrollPosition > 50);
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (modalIsOpen) {
            fetchNotifications();
        }
    }, [modalIsOpen]);

    return (
        <nav className={`navbar navbar-expand-lg ${scrolled ? 'navbar_fixed navbar_dark' : ''}`}>
            <Link href="/" passHref className="navbar-brand">
                <Image src={scrolled ? '/assets/logo-white-box.png' : '/assets/logo-white-box.png'} alt="Logo" width={150} height={50} />
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => setIsOpenState(!isOpen)} // Use isOpenState to toggle navbar
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
            <div className={`navbar-collapse ${isOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:space-x-4`} id="navbarSupportedContent">
                {scrolled ? (
                    <div className="search_widget navbar_search_widget">
                        <input type="text" placeholder="Search for Colleges, Exams, Courses, and More..." />
                        <Link href="#">
                            <FaSearch />
                        </Link>
                    </div>
                ) : (
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link href="/" className="nav-link" onClick={() => handleItemClick('item1')} style={{ color: activeItem === 'item1' ? '#fff' : '', background: activeItem === 'item1' ? '#3D52A0' : '' }}>Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/siksha-helpline" className="nav-link" onClick={() => handleItemClick('item2')} style={{ color: activeItem === 'item2' ? '#fff' : '', background: activeItem === 'item2' ? '#3D52A0' : '' }}>Siksha H.
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about-us" className="nav-link" onClick={() => handleItemClick('item3')} style={{ color: activeItem === 'item3' ? '#fff' : '', background: activeItem === 'item3' ? '#3D52A0' : '' }}>About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/blogs" className="nav-link" onClick={() => handleItemClick('item3')} style={{ color: activeItem === 'item3' ? '#fff' : '', background: activeItem === 'item3' ? '#3D52A0' : '' }}>Blogs
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/contact-us" className="nav-link" onClick={() => handleItemClick('item4')} style={{ color: activeItem === 'item4' ? '#fff' : '', background: activeItem === 'item4' ? '#3D52A0' : '' }}>Contact
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" onClick={() => handleItemClick('item5')} style={{ color: activeItem === 'item5' ? '#fff' : '', background: activeItem === 'item5' ? '#3D52A0' : '' }}>Colleges</a>
                            <ul className="dropdown_menu dropdown_menu--animated dropdown_menu-6">
                                <li className="dropdown_item-1 truncate "><Link href="/collegepage/IIT Delhi (IIT-D)">IIT Delhi</Link></li>
                                <li className='truncate'><Link href="/collegepage/IIT Madras (IIT-M)">IIT Madras</Link></li>
                                <li className='truncate'><Link href="/collegepage/IIT Kharagpur (IIT-KGP)">IIT Kharagpur</Link></li>
                                <li className='truncate'><Link href="/collegepage/IIT Roorkee (IIT-R)">IIT Roorkee</Link></li>
                                <li className='truncate'><Link href="/collegepage/IIT Bombay (IIT-B)">IIT Bombay</Link></li>
                                {/* other dropdown items */}
                            </ul>
                        </li>
                    </ul>
                )}

                <div className="social_media_links ms-auto">
                    <div className="icon_div">
                        <Link href="https://www.facebook.com/profile.php?id=61550767657757&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer"><FaFacebookF /></Link>
                    </div>
                    <div className="icon_div">
                        <Link href="https://www.linkedin.com/company/siksha-helpline/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></Link>
                    </div>
                    <div className="icon_div">
                        <Link href="https://www.instagram.com/siksha_helpline?igsh=MWU3ZXIwbXZzOXhndg==" target="_blank" rel="noopener noreferrer"><FaInstagram /></Link>
                    </div>
                    <div className="icon_div">
                        <Link href="https://x.com/Siksha_Helpline?t=trstRpmhjj-gQEetDt9O6w&s=09" target="_blank" rel="noopener noreferrer"><FaTwitter /></Link>
                    </div>
                    <div className="icon_div">
                        <Link href="https://www.youtube.com/@Siksha_Helpline" target="_blank" rel="noopener noreferrer"><FaYoutube /></Link>
                    </div>
                    <div className="noti">
                        <button className="notification_icons" onClick={openModal}>
                            <IoMdNotifications />
                        </button>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Notification Modal"
                        >
                            <div className="notification_modal_wrapper">
                                <h5 className='text-xl text-black font-semibold'>Notifications</h5>
                                <div className="noti_content mt-3">
                                    <select
                                        value={notificationType}
                                        onChange={(e) => setNotificationType(e.target.value)}
                                    >
                                        <option value="normal">Notification</option>
                                        <option value="live">Live Notification</option>
                                    </select>
                                    <div className="notifications mt-3">
                                        {notifications.filter(notification => notification.type === notificationType).map(notification => (
                                            <div className="nav_notification_div" key={notification.id}>
                                                <div className="d-flex align-items-start">
                                                    <img src={notification.images} alt="" />
                                                    <div className="nav_notification_title ml-2">{notification.title || "N/A"}</div>
                                                </div>
                                                <p className="nav_notification_para">{notification.message || "N/A"}</p>
                                                <div className="d-flex justify-content-between">
                                                    <div className="nav_noti_date">{new Date(notification.date).toLocaleDateString()}</div>
                                                    <button className="nav_noti_readMore" onClick={() => handleReadMore(notification.title)}>Read More</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>

                {scrolled ? (
                    <div className="nav_btns ms-auto">
                        <div className="contact_button common_new_btn text-center mt-4 mb-5">
                            <span><FaGraduationCap /></span>
                            <Link href="">Login/Signup</Link>
                        </div>
                        <div className="contact_button common_new_btn text-center mt-4 mb-5">
                            <span><FaGraduationCap /></span>
                            <Link href="/contact-us">Contact Us</Link>
                        </div>
                    </div>
                ) : (
                    <div className="nav_btns ms-auto not_scrolled_nav_btns">
                        <div className="contact_button common_new_btn text-center mt-4 mb-5">
                            <span><FaGraduationCap /></span>
                            <Link href="">Login/Signup</Link>
                        </div>
                        <div className="contact_button common_new_btn text-center mt-4 mb-5">
                            <span><FaGraduationCap /></span>
                            <Link href="/contact-us">Contact Us</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
