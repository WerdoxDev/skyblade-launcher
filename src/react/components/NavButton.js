import React, {Component} from 'react';
import './css/NavButton.css';

class NavButton extends Component {
    render() {
        return (
            <div className="button-container">
                <button className="button-border">
                    {this.props.children}
                </button>
            </div>
        );
    }
}

export default NavButton;