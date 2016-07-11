import React from 'react';
import { connect } from 'react-redux';
import WidgetList from '../views/widgetList';
import * as widgetApi from 'api/widgetApi';
import store from 'store';
import { loadSearchLayout } from '../../actions/searchLayoutActions';

const WidgetListContainer = React.createClass({

  componentDidMount: function() {
    widgetApi.getWidgets();
    store.dispatch(loadSearchLayout('widgets', 'Widget Results'));
  },

  render: function() {
    return (
      <WidgetList widgets={this.props.widgets} deleteWidget={widgetApi.deleteWidget} />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    widgets: store.widgetState.widgets
  };
};

export default connect(mapStateToProps)(WidgetListContainer);
