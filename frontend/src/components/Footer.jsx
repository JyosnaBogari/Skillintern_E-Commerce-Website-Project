import {
  footerWrapper,
  footerContainer,
  footerHeading,
  footerLink,
  footerSocialLink,
  footerBadge,
  footerButton
} from "../styles/common"; // reusable footer styles

function Footer() {
  return (
    <footer className={footerWrapper}>

      {/* main footer container */}
      <div className={footerContainer}>

        {/* SOCIAL LINKS */}
        <div className="space-y-3">
          <h2 className={footerHeading}>Connect With Us</h2>

          {/* Instagram link */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={footerSocialLink}
          >
            <span className="w-5 h-5">
              {/* icon */}
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm9.75 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4.25 1.25a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
              </svg>
            </span>
            Instagram
          </a>

          {/* Facebook link */}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={footerSocialLink}
          >
            <span className="w-5 h-5">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 22V13.5h2.5l.4-3h-2.9V7.2c0-.9.2-1.5 1.6-1.5h1.7V2.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.2v2.3H7v3h2.1V22h4.4z" />
              </svg>
            </span>
            Facebook
          </a>

          {/* Twitter link */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={footerSocialLink}
          >
            <span className="w-5 h-5">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 5.5c-.8.4-1.6.6-2.5.8a4.5 4.5 0 0 0 2-2.5 9 9 0 0 1-2.9 1.1 4.5 4.5 0 0 0-7.7 4.1A12.8 12.8 0 0 1 3 4.8a4.4 4.4 0 0 0-.6 2.3 4.5 4.5 0 0 0 2 3.7 4.5 4.5 0 0 1-2-.6v.1a4.5 4.5 0 0 0 3.6 4.4 4.6 4.6 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1 9 9 0 0 1-5.6 1.9c-.4 0-.8 0-1.2-.1a12.7 12.7 0 0 0 6.9 2c8.3 0 12.8-6.9 12.8-12.8 0-.2 0-.4 0-.6a9.2 9.2 0 0 0 2.3-2.3z" />
              </svg>
            </span>
            Twitter
          </a>
        </div>

        {/* POLICIES */}
        <div className="space-y-3">
          <h2 className={footerHeading}>Customer Policies</h2>

          {/* policy links */}
          <a href="#" className={footerLink}>Privacy Policy</a>
          <a href="#" className={footerLink}>Return Policy</a>
          <a href="#" className={footerLink}>Terms &amp; Conditions</a>
          <a href="#" className={footerLink}>Shipping Policy</a>
        </div>

        {/* APP DOWNLOAD */}
        <div className="space-y-4">
          <div>
            <h2 className={footerHeading}>Get the App</h2>
            <p className="text-sm text-[#6e6e73]">
              Shop on the go and save on every order.
            </p>
          </div>

          {/* app buttons */}
          <div className="flex flex-col sm:flex-row gap-3">

            {/* Google Play */}
            <a
              href="#"
              className={footerButton}
              title="Download on Google Play"
            >
              <span className="w-5 h-5">
                <svg viewBox="0 0 512 512" fill="currentColor">
                  <path d="M325.3 234.3L104.1 28.6c-14.4-12.9-34.8 3.2-31.7 21.5l20.7 138.8-20.7 138.8c-3.1 18.3 17.3 34.4 31.7 21.5l221.2-205.7c7.5-7 7.5-19.2 0-26.2z" />
                  <path d="M357.4 295.8l118.6 83.3c26.6 18.7 58.8-5.9 50.7-35.3L410.8 205.2 357.4 295.8z" />
                  <path d="M325.3 277.6L487.8 409.1c16.6 11.7 39.8 2.1 44.4-17.4 0 0 12.5-41.6 12.5-44.4 0-47.9-24.2-92.1-64.8-118.2l-103.5 184.5z" />
                  <path d="M104.1 483.4l221.2-205.7-60.3-52.6L55.7 430.7c-12.9 14.4 3.2 34.8 21.5 31.7l26.9-3z" />
                </svg>
              </span>
              Google Play
            </a>

            {/* App Store */}
            <a
              href="#"
              className={footerButton}
              title="Download on the App Store"
            >
              <span className="w-5 h-5">
                <svg viewBox="0 0 384 512" fill="currentColor">
                  <path d="M318.7 268.1c-.2-33.7 14.3-58.9 44.6-77.4-16.4-24-41.9-37.5-73.8-37.5-31.1 0-65.6 18.3-82.5 18.3-17.8 0-44.6-17.9-73.2-17.4-37.7.5-72.5 22-91.9 56.2-39.3 71.7-10 177.9 28.3 236.6 18.7 28.6 41 60.5 70.4 59.3 28.8-1.1 39.6-18.7 74.4-18.7 34.5 0 44.5 18.7 74.5 18.2 30.5-.4 49.7-28.9 68.2-57.9 21.5-33.2 30.4-65.2 30.7-66.9-.7-.2-59.1-22.6-59.3-89.1z" />
                </svg>
              </span>
              App Store
            </a>

          </div>

          {/* security badge */}
          <div className={footerBadge}>
            <span className="w-2 h-2 rounded-full bg-[#34c759]" />
            Shop securely with trusted checkout
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer