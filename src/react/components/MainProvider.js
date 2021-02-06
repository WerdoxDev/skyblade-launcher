import React, {Component} from 'react';

const Context = React.createContext();

class Provider extends Component {
    state = {message: ""};

    render() {
        return (
            <Context.Provider value={
                {
                    state: this.state,
                    setMessage: (value) => this.setState({
                        message: value
                    })
                }}>
                {this.props.children}
            </Context.Provider>)
    }
}

export {Provider, Context};
