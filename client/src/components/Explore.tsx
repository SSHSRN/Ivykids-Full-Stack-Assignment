/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Explore = () => {
    const [showRes, setShowRes] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [user, setUser] = useState({
        username: '',
        displayName: '',
        joined: '',
        followersCount: 0,
        followers: [],
        followingCount: 0,
        following: [],
        tweetsCount: 0,
        tweets: []
    });

    // Check if user is logged in
    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/';
            }
            else {
                const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/user/verify', { token });
                if (response.data.message === 'Valid token') {
                    setUser(response.data.user);
                }
                else {
                    alert('You are either not logged in or your session has expired. Please log in again.');
                    window.location.href = '/';
                }
            }
        };
        checkLoggedIn();
    }, []);

    const handleSearch = async () => {
        const searchQuery = (document.querySelector('.form-control') as HTMLInputElement).value;
        const result = await axios.get(process.env.REACT_APP_SERVER_URL + '/application/search', {
            params: {
                username: searchQuery
            }
        });
        // render the results
        setShowRes(true);
        setSearchResults(result.data.users);

    }

    return (
        <div className="bg-dark text-white min-vh-100 ExplorePage">
            <div className="container-fluid">
                <div className="row">
                    {/* Left Menu */}
                    <div className="col-md-2 bg-dark py-4">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="logoSvg">
                                        <g>
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link left-link" to={`/user/${user.username}`}>
                                    <svg viewBox="0 0 24 24" width="26.25px" height="26.25px" fill="rgb(255,255,255)" className="sc-bcXHqe gBPObk mx-1">
                                        <g>
                                            <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path>
                                        </g>
                                    </svg>
                                    <span className="mx-3">My Profile</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link left-link" to="/search">
                                    <svg viewBox="0 0 24 24" width="26.25px" height="26.25px" fill="rgb(255,255,255)" className="sc-bcXHqe gBPObk mx-1">
                                        <g>
                                            <path d="M21 7.337h-3.93l.372-4.272c.036-.412-.27-.775-.682-.812-.417-.03-.776.27-.812.683l-.383 4.4h-6.32l.37-4.27c.037-.413-.27-.776-.68-.813-.42-.03-.777.27-.813.683l-.382 4.4H3.782c-.414 0-.75.337-.75.75s.336.75.75.75H7.61l-.55 6.327H3c-.414 0-.75.336-.75.75s.336.75.75.75h3.93l-.372 4.272c-.036.412.27.775.682.812l.066.003c.385 0 .712-.295.746-.686l.383-4.4h6.32l-.37 4.27c-.036.413.27.776.682.813l.066.003c.385 0 .712-.295.746-.686l.382-4.4h3.957c.413 0 .75-.337.75-.75s-.337-.75-.75-.75H16.39l.55-6.327H21c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-6.115 7.826h-6.32l.55-6.326h6.32l-.55 6.326z"></path>
                                        </g>
                                    </svg>
                                    <span className="mx-3">Explore</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-10 pt-5">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Search Twitter" aria-label="Search Twitter" aria-describedby="button-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2"
                                            onClick={handleSearch}
                                        >Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className={`text-center mt-1 ${showRes ? 'd-none' : 'd-block'}`} >Search for users</h2>
                        <div className="row">
                            {searchResults.map((user: any) => (
                                <div className="col-11" key={user._id}>
                                    <div className="card mb-4 bg-black text-white">
                                        <div className="card-body bg-black text-white d-flex">
                                            <img src="https://res.cloudinary.com/twitter-clone-media/image/upload/v1597737557/user_wt3nrc.png" className="smallProfilePic" alt="profile" />
                                            <div className="d-block mx-3">
                                                <h5 className="card-title">{user.name}</h5>
                                                <Link to={`/user/${user.username}`} style={{ textDecoration: 'none', color: 'white' }}>
                                                    <p className="card-text">@{user.username}</p>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore