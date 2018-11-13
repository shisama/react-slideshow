import * as React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PagingButton from '../src/PagingButton';
import sinon from 'sinon';

configure({adapter: new Adapter()});

describe('PagingButton', () => {
  test('click event', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <PagingButton
        onClick={spy}
      />
    );
    expect(spy.called).toBeFalsy();
    wrapper.find('button').simulate('click');
    wrapper.find('button').simulate('click');
    expect(spy.callCount).toBe(2);
  })
});