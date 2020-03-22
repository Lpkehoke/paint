'use strict';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { closeTabAction } from '../../../../actions/tabActions';

class Tab extends React.Component {
    static defaultProps = {
        tabId: 0,
        active: 0,
    }

    static propTypes = {
        tabId: PropTypes.number,
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

            return false;
        });
    }
}


export default connect(
    (state, props) => ({
        tab: state.tabs.own.find(el => +el.id === +props.tabId),
        active: state.tabs.activeTab,
    }),
    dispatch => ({
        closeTab: id => dispatch(closeTabAction(id)),
    })
)(Tab);