/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const FollowersFollowing = () => {

    // Get the followers and following from the database #SSHSRNTODO
    const [followers, setFollowers] = useState([
        { id: 1, username: 'follower1', fullName: 'Follower One' },
        { id: 2, username: 'follower2', fullName: 'Follower Two' },
        { id: 3, username: 'follower3', fullName: 'Follower Three' },
    ]);

    const [following, setFollowing] = useState([
        { id: 1, username: 'following1', fullName: 'Following One' },
        { id: 2, username: 'following2', fullName: 'Following Two' },
        { id: 3, username: 'following3', fullName: 'Following Three' },
    ]);

    const [activeTab, setActiveTab] = useState('followers');

    const handleTabChange = (tab: any) => {
        setActiveTab(tab);
    };

    const handleUnfollow = (id: any) => {
        if (activeTab === 'followers') {
            const updatedFollowers = followers.filter((follower) => follower.id !== id);
            setFollowers(updatedFollowers);
        } else if (activeTab === 'following') {
            const updatedFollowing = following.filter((followed) => followed.id !== id);
            setFollowing(updatedFollowing);
        }
    };

    const handleRemove = (id: any) => {
        if (activeTab === 'followers') {
            const updatedFollowers = followers.filter((follower) => follower.id !== id);
            setFollowers(updatedFollowers);
        } else if (activeTab === 'following') {
            const updatedFollowing = following.filter((followed) => followed.id !== id);
            setFollowing(updatedFollowing);
        }
    };

    return (
        <div className="bg-dark text-white min-vh-100 followersFollowingPage">
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
                                <Link className="nav-link left-link" to="/profile">
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
                            <li className="nav-item">
                                <button className="btn btn-primary btn-block mt-3 mx-3 w-75">Tweet</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-danger btn-block align-bottom mx-3 w-75" onClick={() => { if (window.confirm('Are you sure you want to log out?')) { window.location.href = '/'; } }}><strong>Log Out</strong></button>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-10 pt-5">
                        <ul className="nav nav-tabs mt-5">
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeTab === 'followers' ? 'active' : 'inactive'}`}
                                    onClick={() => handleTabChange('followers')}
                                >
                                    Followers
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeTab === 'following' ? 'active' : 'inactive'}`}
                                    onClick={() => handleTabChange('following')}
                                >
                                    Following
                                </a>
                            </li>
                        </ul>
                        {activeTab === 'followers' && (
                            <ul className="list-group">
                                {followers.map((follower) => (
                                    <li key={follower.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {follower.fullName} (@{follower.username})
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleUnfollow(follower.id)}
                                        >
                                            Unfollow
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {activeTab === 'following' && (
                            <ul className="list-group">
                                {following.map((followed) => (
                                    <li key={followed.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {followed.fullName} (@{followed.username})
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleRemove(followed.id)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FollowersFollowing