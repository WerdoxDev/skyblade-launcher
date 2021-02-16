import React, {Component} from "react";
import {userGames} from "../../shared/games";
import GameView from "./GameView";
import "./css/Library.css";

class Library extends Component {

    changeData(channel, data) {
        this.props.changeValue(channel, data);
    }

    render() {
        return (
            <div id="library-container" className="library-container" name="tab-content">
                {userGames.map(game => (
                    <GameView gameId={game.id} value={this.props.value} changeValue={this.changeData.bind(this)}/>
                ))}
                <div className="spacer"/>
            </div>
        );
    }
}

export default Library;