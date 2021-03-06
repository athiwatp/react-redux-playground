/**
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * Test - component - Counter
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 */

import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';

import Counter from 'components/Counter/Counter';
import { doAddCounter, doSetTick } from 'modules/counter';

import configureStore from 'redux-mock-store';


const mockStore = configureStore([]);


function setup(propOverrides) {
  const store = mockStore({});

  const props = Object.assign({
    tick: 1,
    count: 0
  }, propOverrides);

  props.dispatch = store.dispatch;

  const wrapper = shallow(<Counter {...props} />)

  return {
    wrapper,
    props,
    store,
    rootElement:  wrapper.find('.component-counter'),
    setTickInput: wrapper.find('.set-tick-input'),
    addButton:    wrapper.find('.add-button')
  };
}

/**
 * --------------------------------------------------------
 * Spec - component - Counter
 * --------------------------------------------------------
 */
describe('Component - Counter', function() {

  it('should render properly', () => {
    const { rootElement, setTickInput, addButton } = setup({
      tick: 5,
      count: 10
    });

    expect(rootElement).to.have.length(1);
    expect(setTickInput).to.have.length(1);
    expect(addButton).to.have.length(1);

    expect(setTickInput.props().defaultValue).to.equal(5);
    expect(addButton.text()).to.equal('Add Counter - 10');
  });

  it('should button event `onClick` work properly', () => {
    const { store, addButton } = setup();
    expect(typeof addButton.props().onClick).to.equal('function');

    addButton.simulate('click');

    const actions = store.getActions();
    expect(actions).to.have.length(1);
    expect(actions[0]).to.deep.equal(doAddCounter());
  });

  it('should input event `onChange` work properly', () => {
    const { store, setTickInput } = setup();
    expect(typeof setTickInput.props().onChange).to.equal('function');

    setTickInput.simulate('change', {
      target: {
        value: 10
      }
    });

    const actions = store.getActions();
    expect(actions).to.have.length(1);
    expect(actions[0]).to.deep.equal(doSetTick(10));
  });
});
