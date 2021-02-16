import React, {Component} from "react";
import {storeGames, userGames} from "../../shared/games";
import GameView from "./GameView";
import GameStoreView from "./GameStoreView";
import {channels} from "../../shared/constants";
import Library from "./Library";
import "./css/Tabs.css";

const electron = window.require?.('electron');
const {ipcRenderer} = electron ?? {};

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appVersion: "",
            valueKey: {
                channel: "",
                data: "",
            },
        };
        ipcRenderer?.send(channels.APP_INFO);
        ipcRenderer?.on(channels.APP_INFO, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.APP_INFO);
            //this.setState({appVersion: arg});
        });
    }

    changeData(channel, data) {
        console.log('State changed from Tabs in channel: ' + channel);
        this.setState({
            valueKey: {
                channel: channel,
                data: data,
            },
        });
    }

    render() {
        return (
            <div className="center-content">
                <div id="home-container" className="home-container" name="tab-content">
                    <div className="home-content">
                        <h1>Home</h1>
                        <p>Home is where the heart is.</p>
                    </div>
                </div>
                <div id="store-container" className="store-container" name="tab-content">
                    <div className="store-closed">Store is closed (for now)</div>
                    {/*<div className="title-container">*/}
                    {/*    <h1>Title Image</h1>*/}
                    {/*</div>*/}
                    {/*<div className="games-container">*/}
                    {/*    {storeGames.map(game => (*/}
                    {/*        <GameView game={game} changeValue={this.changeData.bind(this)}/>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </div>
                <Library value={this.state.valueKey} changeValue={this.changeData.bind(this)}/>
                <GameStoreView value={this.state.valueKey} changeValue={this.changeData.bind(this)}/>
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
            </div>
        );
    }
}

export default Tabs;