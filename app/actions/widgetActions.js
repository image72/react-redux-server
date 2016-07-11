import * as types from './actionTypes';

export function getWidgetsSuccess(widgets) {
  return {
    type: types.GET_WIDGETS_SUCCESS,
    widgets
  };
}

export function deleteWidgetSuccess(widgetId) {
  return {
    type: types.DELETE_WIDGET_SUCCESS,
    widgetId
  };
}
