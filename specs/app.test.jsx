import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import App from '../client/app.jsx';
import Form from '../client/form.jsx';
import Agents from '../client/agentsList.jsx';
import Dates from '../client/dateCarousel.jsx';
import Times from '../client/timesDropDown.jsx';
import Disclaimer from '../client/disclaimer.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('<App/>', () => {
  it('contains form component', () => {
    const wrapper = shallow(<App />); // mount/render/shallow when applicable
    expect(wrapper.find(Form).exists()).to.equal(true);
  });
  it('calls componentDidMount', () => {
    sinon.spy(App.prototype, 'componentDidMount');
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount).to.have.property('callCount', 1);
  });
  it('calls retrieveInfobooking', () => {
    sinon.spy(App.prototype, 'retrievePropertyInfo');
    const wrapper = mount(<App />);
    expect(App.prototype.retrievePropertyInfo).to.have.property('callCount', 1);
  });
  it('allows us to set props', () => {
    const wrapper = mount(<App bar="baz" />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
  });

});


