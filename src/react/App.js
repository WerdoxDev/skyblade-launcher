import React, {Component} from 'react';
import './App.css';
import GameView from './components/GameView';
import NavButton from '../react/components/NavButton';
import TitleBar from '../react/components/TitleBar';
import GameStoreView from '../react/components/GameStoreView';
import {Provider} from './components/MainProvider';
import {channels} from '../shared/constants';

const {ipcRenderer} = window;

const STORE_GAMES = [
    {name: 'PlanZ', desc: 'Zombie survival Game', image: 'planz-logo.jpeg'},
    {name: 'TestItem', desc: 'This is a test description', image: 'planz-logo.jpeg'},
    {name: 'TestItem', desc: 'This is a test description', image: 'planz-logo.jpeg'},
    {name: 'TestItem', desc: 'This is a test description', image: 'planz-logo.jpeg'},
    {name: 'TestItem', desc: 'This is a test description', image: 'planz-logo.jpeg'}
];

const USER_GAMES = [
    {name: 'PlanZ', desc: 'Zombie survival Game', image: 'planz-logo.jpeg'}
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appVersion: '',
        };
        ipcRenderer.send(channels.APP_INFO);
        ipcRenderer.on(channels.APP_INFO, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.APP_INFO);
            const appVersion = arg;
            this.setState({appVersion});
        });
    }

    render() {
        return (
            <div className="window-background">
                <TitleBar>
                    <TitleBar.Minimize text="-"/>
                    <TitleBar.Maximize text="+"/>
                    <TitleBar.Close text="x"/>
                </TitleBar>
                <div className="window-main">
                    <div className="vl1"/>
                    <div className="vl2"/>
                    <div className="vl3"/>
                    <div className="left-nav">
                        <div className="title">
                            <h2>SkyBlade</h2>
                        </div>
                        <div className="button-container" id="button-container">
                            <div className="page-indicator" id="page-indicator">
                                <div className="indicator"></div>
                            </div>
                            <NavButton id="home" number="0" display="block">Home</NavButton>
                            <NavButton id="store" number="1" display="grid">Store</NavButton>
                            <NavButton id="library" number="2" display="grid">Library</NavButton>
                            <NavButton id="friends" number="3" display="block">Friends</NavButton>
                            <div className="spacer"/>
                            <NavButton id="settings" number="5" display="block">Settings</NavButton>
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
                                            <GameView.Name>{game.name + ': ' + game.desc}</GameView.Name>
                                            <GameView.Image src={game.image}/>
                                        </GameView>
                                    ))}
                                </div>
                            </div>
                            <GameStoreView></GameStoreView>
                            <div id="library-container" className="library-container" name="tab-content">
                                {USER_GAMES.map(game => (
                                    <GameView>
                                        <GameView.Name>{game.name + ': ' + game.desc}</GameView.Name>
                                        <GameView.Image src={game.image}/>
                                    </GameView>
                                ))}
                                <div className="spacer"></div>
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
            </div>
        );
    }
}

export default App;