'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { EditIcon } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { DateRangePicker } from 'react-date-range';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import 'react-date-range/dist/styles.css'; // import the styles
// import 'react-date-range/dist/theme/default.css'; // import the theme

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [search, setSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    useEffect(() => {
        // Simulate data fetching
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/blogs`);
                const result = await res.json();
                if (result.success) {
                    setBlogs(result.data);
                    setFilteredBlogs(result.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     // Filter blogs based on search term and date range
    //     const filtered = blogs
    //         .filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()))
    //         .filter(blog => {
    //             const blogDate = new Date(blog.createdAt); // Ensure your blog object has a date field
    //             return blogDate >= dateRange.startDate && blogDate <= dateRange.endDate;
    //         });
    //     setFilteredBlogs(filtered);
    // }, [search, dateRange, blogs]);

    // const handleSearchChange = (e) => {
    //     setSearch(e.target.value);
    // };

    // const handleRowsPerPageChange = (e) => {
    //     setRowsPerPage(Number(e.target.value));
    //     setCurrentPage(1); // Reset to first page when rows per page changes
    // };

    // const handlePageChange = (newPage) => {
    //     setCurrentPage(newPage);
    // };

    // const pageCount = Math.ceil(filteredBlogs.length / rowsPerPage);
    // const blogs = filteredBlogs.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


    console.log(blogs)

    return (
        <>
            <Navbar />

            <div className="blogs_wrapper bg_reddish">
                <div className="hero_blogs">
                    <h2 className='text-3xl font-semibold'>Blogs</h2>
                </div>
            </div>
            <div className="container py-5 lg:px-28 bg_reddish">
                <div className="blogs_card_wrapper flex flex-wrap gap-4">
                    {blogs.length > 0 ? blogs.map((blog) => (
                        <div key={blog.id} className="blogs_card rounded shadow-md border border-slate-500 p-3 h-[400px] w-[300px] bg-white m-2">
                            <img
                                src={blog.cardImage || "https://via.placeholder.com/300x200"} // Fallback image URL
                                alt={blog.title}
                                className="rounded h-[80%] w-full border"
                            />
                            <Link
                                href={'/blogs/view/' + blog.title}
                                className="text-xl mt-3 text-black font-semibold"
                            >
                                {blog.title.length > 15 ? blog.title.slice(0, 15) + '...' : blog.title}
                            </Link>
                            <div className="text-base text-slate-500 font-medium">Date: {new Date(blog.date).toLocaleDateString()}</div>
                            <Link
                                href={'/blogs/view/' + blog.title}
                                className="rounded-full px-4 py-2 bg-blue-500 text-white mt-6 p-6"
                            >
                                Read this blog
                            </Link>
                        </div>
                    )) : (
                        <div className="text-center text-gray-500">No blogs found</div>
                    )}
                </div>

                {/* <div className="pagination mt-4 flex justify-center space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Previous
                    </button>
                 
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pageCount}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Next
                    </button>
                </div> */}
            </div>

            <Footer />
        </>
    );
}
