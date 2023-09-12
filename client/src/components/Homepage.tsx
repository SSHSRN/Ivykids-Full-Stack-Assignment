import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
    return (
        <div className='home'>
            <div className='homePageLogo'>
                {/* Got this svg from "https://twitter.com/" */}
                <svg viewBox="0 0 24 24" aria-hidden="true" className="r-1nao33i r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
            </div>
            <div className='homePageContent'>
                <h1 className='homePageTitle'>Happening now</h1>
                <h2 className='homePageSub'>Join today.</h2>
                <button className='homePageSignUp'>Create Account</button>
                <p className='homePageTerms'>By signing up, you agree to the <Link className='link' to='https://twitter.com/tos'>Terms of Service</Link> and <Link className='link' to='https://twitter.com/privacy'>Privacy Policy</Link>, including <Link className='link' to='https://help.twitter.com/rules-and-policies/twitter-cookies'>Cookie Use</Link>.</p>
                <p className='homePageLoginText'><strong>Already have an account?</strong></p>
                <button className='homePageLogIn'>Sign in</button>
            </div>
        </div>
    )
}

export default Homepage