'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const PropTypes = require('prop-types');
const FontAwesomeIcon = require('@fortawesome/react-fontawesome').FontAwesomeIcon;
const faTimesCircle = require('@fortawesome/free-solid-svg-icons').faTimesCircle;


class Tab extends React.Component {
    static defaultProps = {
        tabId: 0,
        active: 0
    }

    static propTypes = {
        tabId: PropTypes.number
    }

    render() {
        let active = '';

        if (+this.props.tabId === +this.props.active) {
            active = 'active';
        }

        return (
            <div className={`tab ${active}`} data-id={this.props.tabId} ref={tab => this.tab = tab}>
                {`${this.props.tab.title} ${this.props.tab.size.x} : ${this.props.tab.size.y}`}
                <div className="__exitIcon" ref={exit => this.exitBtn = exit}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.exitBtn.addEventListener('click', e => {
            e.preventDefault();
            this.props.closeTab(this.props.tab.id);

            if (+this.props.tab.id === +this.props.active) {
                this.props.changeActive(this.props.lastId);
            }

            return false;
        });

        this.tab.addEventListener('selectstart', e => {
            e.preventDefault();
            return false;
        });
    }
}


module.exports = ReactRedux.connect(
    (state, props) => ({
        tab: state.tabs.own.find(el => +el.id === +props.tabId),
        active: state.activeTab,
        lastId: (
            state.tabs.own[state.tabs.own.length-1].id !== state.activeTab
            ? state.tabs.own[state.tabs.own.length-1].id
            : state.tabs.own[0].id
        )
    }),
    dispatch => ({
        closeTab: id => {
            dispatch({
                type: 'CLOSE_TAB',
                id
            });
        },
        changeActive: id => {
            dispatch({
                type: 'CHANGE_ACTIVE_TAB',
                activeTab: id
            })
        }
    })
)(Tab);