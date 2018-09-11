'use strict';

const React = require('react');
const ReactRedux = require('react-redux');

class File extends React.Component {
    render() {
        return (
            <div className="header__container">
                <span className="headerContainer__title">file</span>
                <ul className="headerContainer__subMenu">
                    <li>
                        <span
                            className="newFile"
                            ref={nf => this.newFile = nf}
                        >
                            New file
                        </span>
                    </li>
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this.newFile.addEventListener('click', this._createNewFile.bind(this));
    }

    _createNewFile() {
        this.props.newFile();
    }
}

module.exports = ReactRedux.connect(
    state => ({}),
    dispatch => ({
        newFile: () => {
            dispatch({
                type: 'OPEN_WINDOW',
                view: 'newFile'
            })
        }
    })
)(File);