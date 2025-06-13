

export function HomeScreen() {

    const content = <><h3 className="google-maps-text-title">Handled with love
        </h3><p>Whether you shop online or visit us in person,
        every order is packed with thoughtful attention and care. 
        Our Portland store is where it all begins — 
        stop by and say hello!<br></br><br></br>
        <span className="google-maps-text-address">315 NW Davis St, Portland, OR 97209, USA</span></p></>;


    return <div className="screen">
        <div className="home-screen">
        <div>
            <h1 className="screen-title">Modula</h1>
            <p>
            Your next favorite find starts here
            </p>
            <img className="hero-section__image " src="/assets/hero-section.png" alt="Many objects in front of a light pink background"></img>
            
            <div className="google-map-text-small">{content}</div>

            <div className="google-map-container">
                <div className="google-map-wrapper">
                    <div className="google-map-iframe-wrapper">
                        <iframe
                            className="google-map"
                            title="Map"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps?q=315+NW+Davis+St,+Portland,+OR+97209,+USA&hl=en&z=15&output=embed"
                        />
                    </div>

                    <div className="google-map-text-big">{content}</div>
                </div>
            </div>
        </div>
        <div className="stretch-div"></div>
        <p className="copyright-text">© 2025 Modula - All Rights Reserved</p>

    </div>
    </div>;
}