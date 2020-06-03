import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
    
    return (
        <NavLink onClick={props.handleLogOut} exact to={props.url} className={props.className} activeClassName={props.activeClassName}>
            <div className="one">
                <div className="dash-icon">
                    <img src={props.src} alt="dash" />
                </div>
                <p>{props.text}</p>
            </div>
        </NavLink>
    );
}

export default Navigation;