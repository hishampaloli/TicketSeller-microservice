import Link from "next/link";
import React from "react";

const Header = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div className="navbar navbar-light bg-light">
      <Link className="nav-link" href="/">
        {/* <a className='navbar-brand'>Ticketing</a> */}
        Ticketing
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {currentUser ? (
            <Link className="nav-link" href="/auth/signout" onClick={() => {

            }}>
              Sign Out
            </Link>
          ) : (
            <div>
              <Link className="nav-link" href="/auth/signin">
                Sing IN
              </Link>
              <Link className="nav-link" href="/auth/signup">
                Sign Up
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
