/**
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * Component - Json
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 */

import React from 'react';

import { doRequestData, doSetPath } from 'modules/Json';

export default Json;

/**
 * Prop types
 * --------------------------------------------------------
 */
export const PropTypes = {
  status: React.PropTypes.number.isRequired,
  path:   React.PropTypes.string.isRequired,
  data:   React.PropTypes.object
};

Json.PropTypes = PropTypes;


/**
 * --------------------------------------------------------
 * Stateless component
 * --------------------------------------------------------
 */

function Json({ status, path, data, dispatch }) {
  let output = '';

  if (status === 'loading') {
    output = 'Request data from API...';
  }
  else if (status === 'ready' && data) {
    output = JSON.stringify(data);
  }

  return (
    <div className="component-json">
      <input type="text"
             value={path}
             placeholder="Api endpoint path - example: posts/1"
             onChange={onChange} />
      <div className="help">
        More information:
        <a href="https://jsonplaceholder.typicode.com" target="_blank">JSONPlaceholder</a>
      </div>
      <button onClick={onClick}>Run</button>
      <code>{output}</code>
    </div>
  );

  function onChange(event) {
    dispatch(doSetPath(event.target.value));
  }

  function onClick() {
    dispatch(doRequestData(path));
  }
}