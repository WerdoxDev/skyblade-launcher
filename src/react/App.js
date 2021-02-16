import React, {Component} from "react";
import "./App.css";
import NavButton from "../react/components/NavButton";
import TitleBar from "../react/components/TitleBar";
import TopTitleButton from "../react/components/TopTitleButton";
import Tabs from "./components/Tabs";

class App extends Component {
    constructor(props) {
        super(props);
        this.titleName = React.createRef();
        this.leftNav = React.createRef();
        this.buttonsContainer = React.createRef();
    }

    updateSize() {
        this.titleName.current.style.width = `${this.titleName.current.clientHeight}px`;
        this.leftNav.current.style.width = `${this.titleName.current.clientHeight}px`;
        Array.prototype.forEach.call(this.buttonsContainer.current, function (elem) {
            elem.style.height = `${this.titleName.current.clientHeight}px`;
        });
    }

    componentDidMount() {
        window.onresize = () => this.updateSize();
        this.updateSize();
    }

    render() {
        return (
            <div className="window-main">
                <TitleBar>
                    <TitleBar.Minimize text="-"/>
                    <TitleBar.Maximize text="+"/>
                    <TitleBar.Close text="x"/>
                </TitleBar>
                <div className="top-title">
                    <div className="name" ref={this.titleName}>
                        <div className="name-border">
                            <h2>SB</h2>
                        </div>
                    </div>
                    <input className="search-input" placeholder="Search games"/>
                    <div className="spacer-line"/>
                    <div className="title-buttons-container">
                        <TopTitleButton page="library">My Games</TopTitleButton>
                        <TopTitleButton page="store">Store</TopTitleButton>
                        <TopTitleButton page="settings">Settings</TopTitleButton>
                    </div>
                    <div className="account-container">
                        <div className="account">
                            <div className="account-icon">
                                <img src="Muffin.png" alt="Profile Picture"/>
                            </div>
                            <div className="account-name">
                                <h3>MuffinPlayz</h3>
                            </div>
                        </div>
                        <div className="friends"/>
                        <div className="downloads"/>
                    </div>
                </div>
                <div className="left-nav" ref={this.leftNav}>
                    <div className="content-container">
                        <div className="buttons-container" ref={this.buttonsContainer}>
                            <NavButton number="0"/>
                            <NavButton number="1"/>
                            <NavButton number="2"/>
                            <NavButton number="3"/>
                            <NavButton number="4"/>
                        </div>
                    </div>
                </div>
                <Tabs/>
            </div>
        );
    }
}

export default App;
