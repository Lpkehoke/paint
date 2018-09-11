'use strict';

const React = require('react');
const ReactRedux = require('react-redux');

class NewFile extends React.Component {
    render() {
        return (
            <div className="newFile">
                <div>
                    <span>Title&nbsp;</span>
                    <input ref={inp => this.title = inp} maxLength="10" />
                </div>
                <div>
                    <span>Size&nbsp;</span>
                    <input ref={inp => this.x = inp} type="number" max="10000" />
                    &nbsp;x&nbsp;
                    <input ref={inp => this.y = inp} type="number" max="10000" />
                </div>
                <div>
                    <button ref={btn => this.createBtn = btn}>Create</button>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.createBtn.addEventListener(('click'), e => {
            let x = (+this.x.value > 10000 || this.x.value === '' ? 1080 : this.x.value);
            let y = (+this.y.value > 10000 || this.y.value === '' ? 1920 : this.y.value);
            let title = (this.title.value !== '' ? this.title.value : 'untitled');

            this.props.createNew(x, y, title);
            this.props.deleteThisTab(this.props.id);
            this.props.changeActive(this.props.newId - 1);
        });
    }
}


module.exports = ReactRedux.connect(
    state => ({
        newId: state.tabs.id
    }),
    dispatch => ({
        createNew: (x, y, title) => {
            dispatch({
                type: 'NEW_TAB',
                size: {
                    x,
                    y
                },
                title
            });
        },
        deleteThisTab: id => {
            dispatch({
                type: 'CLOSE_WINDOW',
                id
            })
        },
        changeActive: id => {
            dispatch({
                type: 'CHANGE_ACTIVE_TAB',
                activeTab: id
            })
        }
    })
)(NewFile);