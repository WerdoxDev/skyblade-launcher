import React, {Component} from 'react';
import findByType from '../utilities/find-by-type';
import './css/TitleBar.css';
import {channels} from '/../Users/MuffinPlayz/skyblade-launcher/src/shared/constants';

const Minimize = () => null;
const Maximize = () => null;
const Close = () => null;
const {ipcRenderer} = window;

class TitleBar extends Component {
    handleClick(id) {
        ipcRenderer.send(channels.TITLE_BAR, id)
    }

    renderMinimize() {
        const {children} = this.props;
        const minimize = findByType(children, Minimize);
        if (!minimize) {
            return null;
        }

        return (
            <button id="minimize"
                    text={minimize.props.text}
                    onClick={() => this.handleClick('minimize')}
            >
                {minimize.props.text}
            </button>
        );
    }

    renderMaximize() {
        const {children} = this.props;
        const maximize = findByType(children, Maximize);
        if (!maximize) {
            return null;
        }

        return (
            <button id="maximize" className="center"
                    text={maximize.props.text}
                    onClick={() => this.handleClick('maximize')}
            >
                {maximize.props.text}
            </button>
        );
    }

    renderClose() {
        const {children} = this.props;
        const close = findByType(children, Close);
        if (!close) {
            return null;
        }

        return (
            <button id="close"
                    text={close.props.text}
                    onClick={() => this.handleClick('close')}
            >
                {close.props.text}
            </button>
        );
    }

    render() {
        return (
            <div className="title-bar">
                <div>
                    {this.renderMinimize()}
                    {this.renderMaximize()}
                    {this.renderClose()}
                </div>
            </div>
        );
    }
}

TitleBar.Minimize = Minimize;
TitleBar.Maximize = Maximize;
TitleBar.Close = Close;

export default TitleBar;

