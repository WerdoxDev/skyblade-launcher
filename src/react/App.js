import React, {Component} from "react";
import "./App.css";
import GameView from "./components/GameView";
import NavButton from "../react/components/NavButton";
import TitleBar from "../react/components/TitleBar";
import GameStoreView from "../react/components/GameStoreView";
import TopTitleButton from "../react/components/TopTitleButton";
import {Provider} from "./components/MainProvider";
import {channels} from "../shared/constants";

const electron = window.require?.('electron');
const {ipcRenderer} = electron ?? {};

const STORE_GAMES = [
    {
        name: "PlanZ",
        desc: "Zombie survival Game",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    }
];

const USER_GAMES = [
    {
        name: "PlanZ",
        desc: "Zombie survival Game",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    },
    {
        name: "TestItem",
        desc: "This is a test desc",
        image: "planz-logo.jpeg"
    }
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appVersion: ""
        };
        ipcRenderer?.send(channels.APP_INFO);
        ipcRenderer?.on(channels.APP_INFO, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.APP_INFO);
            const appVersion = arg;
            this.setState({appVersion});
        });
    }

    updateSize() {
        let title = document.getElementById('title-name');
        let leftNav = document.getElementById('left-nav');
        let sideButtons = document.getElementsByClassName('button-container');
        title.style.width = `${title.clientHeight}px`;
        leftNav.style.width = `${title.clientHeight}px`;
        Array.prototype.forEach.call(sideButtons, function (elem) {
            elem.style.height = `${title.clientHeight}px`;
        });
    }

    componentDidMount() {
        window.onresize = this.updateSize;
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
                {/*<div className="vl1"/>*/}
                {/*<div className="vl2"/>*/}
                {/*<div className="vl3"/>*/}
                <div className="top-title">
                    <div className="name" id="title-name">
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
                <div className="left-nav" id="left-nav">
                    <div className="content-container">
                        <div className="buttons-container" id="buttons-container">
                            <NavButton number="0"/>
                            <NavButton number="1"/>
                            <NavButton number="2"/>
                            <NavButton number="3"/>
                            <NavButton number="4"/>
                        </div>
                    </div>
                </div>
                <div className="center-content">
                    <Provider>
                        <div id="home-container" className="home-container" name="tab-content">
                            <div className="home-content">
                                <h1>Home</h1>
                                <p>Home is where the heart is.</p>
                            </div>
                        </div>
                        <div id="store-container" className="store-container" name="tab-content">
                            <div className="title-container">
                                <h1>Title Image</h1>
                            </div>
                            <div className="games-container">
                                {STORE_GAMES.map(game => (
                                    <GameView>
                                        <GameView.Name>
                                            {game.name + ": " + game.desc}
                                        </GameView.Name>
                                        <GameView.Image src={game.image}/>
                                    </GameView>
                                ))}
                            </div>
                        </div>
                        <GameStoreView/>
                        <div id="library-container" className="library-container" name="tab-content">
                            {USER_GAMES.map(game => (
                                <GameView>
                                    <GameView.Name>
                                        {game.name + ": " + game.desc}
                                    </GameView.Name>
                                    <GameView.Image src={game.image}/>
                                </GameView>
                            ))}
                            <div className="spacer"/>
                        </div>
                        <div id="friends-container" className="friends-container" name="tab-content">
                            <div className="friends-content">
                                <h1>Friends</h1>
                                <p>Invite your friends! they need you!!</p>
                            </div>
                        </div>
                        <div id="settings-container" className="settings-container" name="tab-content">
                            <div className="settings-content">
                                <h1>Settings</h1>
                                <p>Change those settings man!</p>
                            </div>
                        </div>
                        <h5 className="version-text">{this.state.appVersion}</h5>
                    </Provider>
                </div>
            </div>
        );
    }
}

export default App;
