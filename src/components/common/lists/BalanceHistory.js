import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { WIDGET_LOADER_COLOR } from '../../../theme/Customize';
import HorizontalListItem from './HorizontalListItem';
import { getRecentBalance } from '../../../actions';
import _ from 'lodash';
import uniqid from 'uniqid';
import classNames from 'classnames';


class BalanceHistory extends Component {
    state = {
        isLoading: false,
        items: []
    }

    componentDidMount() {
        this.props.getRecentBalance(result => {
            if (_.isArray(result.items)) {
                this.setState({ items: result.items })
            }
        })
    }

    _renderPreloader() {
        if (this.state.isLoading) {
            return(
                <div style={{ width: 40,  margin: 'auto', marginTop: 30 }}>
                    <CircularProgress style={{ color: WIDGET_LOADER_COLOR }} />
                </div>                
            )            
        }
    }

    _renderItems() {
        // 'dot trend trend-up-back': obj.trend === 'up',
        // 'dot trend trend-down-back': obj.trend === 'down'        
        return this.state.items.map(obj => {
            const isTrendUp = obj.trend === 'up';
            return(
                <HorizontalListItem onClick={ e => this._listItemClick({ link: obj.link, target: obj.target }) } key={ uniqid() } 
                    title={ obj.title } value={
                        <div className={ classNames( { 'trend trend-up': isTrendUp, 'trend trend-down': !isTrendUp } ) }>{ obj.value }</div>
                    } info={ obj.info } 
                    avatar={
                    <div className={ classNames({
                        'avatar balance trend-up': isTrendUp,
                        'avatar balance trend-down': !isTrendUp    
                    }) }>
                        <div className={ classNames({
                            'dot trend trend-up-back': isTrendUp,
                            'dot trend trend-down-back': !isTrendUp 
                        }) }></div>
                    </div> } 
                    link={ obj.link } _target={ obj._target }
                />                 
            )
        })

    }

    render() {       
        return(
            <div>
                { this._renderPreloader() }
                { this._renderItems() }                   
            </div>
        )
    }
}

export default connect(null, { getRecentBalance })(BalanceHistory);
