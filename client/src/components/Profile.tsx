/* eslint-disable jsx-a11y/anchor-is-valid */
// Search for: #SSHSRNTODO

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserProfilePage = () => {
    // profile data and timeline tweets are hardcoded for now, but will be fetched from the server #SSHSRNTODO
    const initialPosts = [
        { id: 1, content: 'This is a more recent post by the user.', timestamp: '2 hours ago', deletable: true },
        { id: 2, content: 'This is the first post by the user.', timestamp: '1 day ago', deletable: true },
        { id: 3, content: 'This is the second post by the user.', timestamp: '2 days ago', deletable: true, media: { type: 'image', url: 'https://example.com/image1.jpg' } },
    ];

    const initialTimelineTweets = [
        { id: 1, content: 'A tweet from followed user 1.', timestamp: '3 hours ago' },
        { id: 2, content: 'A tweet from followed user 2 with an image.', timestamp: '5 hours ago', media: { type: 'image', url: 'https://example.com/image1.jpg' } },
        { id: 3, content: 'A tweet from followed user 3 with a video.', timestamp: '6 hours ago', media: { type: 'video', url: 'https://example.com/video1.mp4' } },
        { id: 4, content: 'A tweet from followed user 4.', timestamp: '7 hours ago' },
        { id: 5, content: 'A tweet from followed user 5 with an image.', timestamp: '8 hours ago', media: { type: 'image', url: 'https://example.com/image2.jpg' } },
    ];

    const [activeTab, setActiveTab] = useState('posts');
    const [posts, setPosts] = useState(initialPosts);
    const [nInitialPosts, setNInitialPosts] = useState(initialPosts.length);
    const [timelineTweets] = useState(initialTimelineTweets);

    // user data is hardcoded for now, but will be fetched from the server #SSHSRNTODO
    const user = {
        username: 'sshsrn',
        displayName: 'Srihari Da',
        joined: 'September 2020',
        followersCount: 12,
        followingCount: 10,
        tweetsCount: nInitialPosts
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleDeletePost = (postId: number) => {
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
        setNInitialPosts(nInitialPosts - 1);
    };

    const renderTabContent = () => {
        if (activeTab === 'posts') {
            return (
                <div>
                    {posts.map((post) => (
                        <div key={post.id} className="card mb-3 tweetCard">
                            <div className="card-body d-flex justify-content-between">
                                <div>
                                    <p className="card-text">{post.content}</p>
                                    {post.media && (
                                        <div>
                                            {post.media.type === 'image' && (
                                                <img src={post.media.url} alt="Tweet Media" className="img-fluid" />
                                            )}
                                            {post.media.type === 'video' && (
                                                <video controls src={post.media.url} className="w-100" />
                                            )}
                                        </div>
                                    )}
                                    <p className="card-text text-muted">{post.timestamp}</p>
                                </div>
                                {post.deletable && (
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this post?')) {
                                                handleDeletePost(post.id);
                                            }
                                        }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        else if (activeTab === 'timeline') {
            return (
                <div>
                    {timelineTweets.map((tweet) => (
                        <div key={tweet.id} className="card mb-3 tweetCard">
                            <div className="card-body">
                                <p className="card-text">{tweet.content}</p>
                                {tweet.media && (
                                    <div>
                                        {tweet.media.type === 'image' && (
                                            <img src={tweet.media.url} alt="Tweet Media" className="img-fluid" />
                                        )}
                                        {tweet.media.type === 'video' && (
                                            <video controls src={tweet.media.url} className="w-100" />
                                        )}
                                    </div>
                                )}
                                <p className="card-text text-muted text-white-50">{tweet.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const [showTweetModal, setShowTweetModal] = useState(false); // State to control modal visibility

    // Function to toggle the modal
    const toggleTweetModal = () => {
        setShowTweetModal(!showTweetModal);
    };

    const uploadMedia = () => {
        // Open file upload dialog
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,video/*';
        input.click();
        // Handle file upload
        input.onchange = () => {
            const file = input.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const mediaPreview = document.createElement('div');
                    mediaPreview.className = 'mt-3';
                    if (file.type.startsWith('image/')) {
                        const img = document.createElement('img');
                        img.src = reader.result as string;
                        img.className = 'img-fluid w-50 mx-auto d-block';
                        mediaPreview.appendChild(img);
                    }
                    else if (file.type.startsWith('video/')) {
                        const video = document.createElement('video');
                        video.src = reader.result as string;
                        video.controls = true;
                        video.className = 'w-50';
                        mediaPreview.appendChild(video);
                    }
                    document.querySelector('.modal-body')?.appendChild(mediaPreview);
                };
            }
        };
    };

    const uploadTweet = () => {
        // Get tweet content
        const tweetContent = (document.querySelector('.modal-body textarea') as HTMLTextAreaElement).value;
        // Get media content
        const mediaPreview = document.querySelector('.modal-body .mt-3');
        let media: { type: string, url: string } | undefined;
        if (mediaPreview) {
            const img = mediaPreview.querySelector('img');
            const video = mediaPreview.querySelector('video');
            if (img) {
                media = { type: 'image', url: img.currentSrc };
                // For now, it will not show the image in the profile page as the image is not uploaded to server #SSHSRNTODO
            }
            else if (video) {
                media = { type: 'video', url: video.src };
                // For now, it will not show the video in the profile page as the video is not uploaded to server #SSHSRNTODO
            }
        }
        // Add tweet to posts including media
        const newPost = { id: nInitialPosts + 1, content: tweetContent, timestamp: 'Just now', deletable: true, media: media };
        setPosts([newPost, ...posts]);
        setNInitialPosts(nInitialPosts + 1);
        // Close modal
        toggleTweetModal();
    }

    const handleLogout = async() => {
        if (window.confirm('Are you sure you want to log out?')) {
            console.log('Logging out...');
            const logoutResponse = await axios.post(process.env.REACT_APP_SERVER_URL + '/user/logout', {username: user.username});
            console.log(logoutResponse.data);
            localStorage.removeItem('token');
            window.location.href = '/'; 
        }
    }

    return (
        <div className="bg-dark text-white min-vh-100">
            <div className="container-fluid">
                <div className="row">
                    {/* Left Menu */}
                    <div className="col-md-2 bg-dark py-4">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" href="/">
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="logoSvg"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link left-link" href="/profile">
                                    <svg viewBox="0 0 24 24" width="26.25px" height="26.25px" fill="rgb(255,255,255)" className="sc-bcXHqe gBPObk mx-1"><g><path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path></g>
                                    </svg>
                                    <span className="mx-3">My Profile</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link left-link" to={`/search`}>
                                    <svg viewBox="0 0 24 24" width="26.25px" height="26.25px" fill="rgb(255,255,255)" className="sc-bcXHqe gBPObk mx-1"><g><path d="M21 7.337h-3.93l.372-4.272c.036-.412-.27-.775-.682-.812-.417-.03-.776.27-.812.683l-.383 4.4h-6.32l.37-4.27c.037-.413-.27-.776-.68-.813-.42-.03-.777.27-.813.683l-.382 4.4H3.782c-.414 0-.75.337-.75.75s.336.75.75.75H7.61l-.55 6.327H3c-.414 0-.75.336-.75.75s.336.75.75.75h3.93l-.372 4.272c-.036.412.27.775.682.812l.066.003c.385 0 .712-.295.746-.686l.383-4.4h6.32l-.37 4.27c-.036.413.27.776.682.813l.066.003c.385 0 .712-.295.746-.686l.382-4.4h3.957c.413 0 .75-.337.75-.75s-.337-.75-.75-.75H16.39l.55-6.327H21c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-6.115 7.826h-6.32l.55-6.326h6.32l-.55 6.326z"></path></g></svg>
                                    <span className="mx-3">Explore</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className='btn btn-primary btn-block mt-3 mx-3 w-75' onClick={toggleTweetModal}>Tweet</button>
                            </li>
                            <li className="nav-item">
                                <button className='btn btn-outline-danger btn-block align-bottom mx-3 w-75' onClick={handleLogout}><strong>Log Out</strong></button>
                            </li>
                        </ul>
                    </div>

                    {/* Main Content */}
                    <div className="col-md-10 pt-5">
                        <div className="row pt-5">
                            <div className="col-md-3">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Profile"
                                    className="img-fluid rounded-circle"
                                />
                            </div>
                            <h2>{user.displayName}</h2>
                            <p>@{user.username}</p>
                            <p>
                                <svg viewBox="0 0 24 24" width="18.75" height="18.75" fill="rgb(101, 119, 134)" className="mx-2"><g><path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path></g></svg>
                                Joined {user.joined}
                            </p>
                            <div className="row">
                                <div className="col-md-4">
                                    <p>
                                        <Link className='followersFollowingLink' to={`/${user.username}/followers`}>
                                            <strong>{user.followersCount}</strong> Followers
                                        </Link>
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <p>
                                        <Link className='followersFollowingLink' to={`/${user.username}/following`}>
                                            <strong>{user.followingCount}</strong> Following
                                        </Link>
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <p>
                                        <strong>{user.tweetsCount}</strong> Tweets
                                    </p>
                                </div>
                            </div>
                            <ul className="nav nav-tabs" id="profileTabs">
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${activeTab === 'posts' ? 'active' : 'inactive'}`}
                                        onClick={() => handleTabChange('posts')}
                                    >
                                        Posts
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${activeTab === 'timeline' ? 'active' : 'inactive'}`}
                                        onClick={() => handleTabChange('timeline')}
                                    >
                                        Timeline
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content mt-3">
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tweet Modal */}
            <div className={`modal fade ${showTweetModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showTweetModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content" style={{ backgroundColor: "black" }}>
                        <div className="modal-header border-0">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={toggleTweetModal}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-1">
                                    <img
                                        src="https://via.placeholder.com/150" // Add user pohoto da #SSHSRNTODO
                                        alt="Profile"
                                        className="img-fluid rounded-circle"
                                        style={{ width: "50px" }}
                                    />
                                </div>
                                <div className="col-md-10">
                                    <p className="mb-0">
                                        <strong>{user.displayName}</strong>
                                    </p>
                                    <p className="text-white mb-0">@{user.username}</p>
                                </div>
                            </div>
                            <textarea
                                className="form-control mt-3"
                                rows={3}
                                placeholder="What's happening?"
                                style={{ backgroundColor: "black", color: "white", border: "1px solid gray" }}
                            ></textarea>
                        </div>
                        <div className="modal-footer border-0">
                            <button className="btn btn-sm btn-primary" type="button" onClick={uploadMedia}>
                                <i className="fas fa-image mx-1"></i>/
                                <i className="fas fa-video mx-1"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={uploadTweet} // Send tweet to server #SSHSRNTODO
                            >
                                Tweet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                showTweetModal && (
                    <div className="modal-backdrop fade show"></div>
                )
            }
            <style>
                {`
                    .modal-body textarea::placeholder {
                        color: gray; /* Change this to your desired placeholder color */
                    }
                `}
            </style>
        </div>
    );
};

export default UserProfilePage;
