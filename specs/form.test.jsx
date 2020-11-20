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


describe('<Form/>', () => {
  it('calls componentDidMount', () => {
    const baseProps = {
      property: {
        agentsInfo: [],
        bookings: [],
        requestInfo: [],
      },
      currentView: 'info',
      toggleView: jest.fn(),
    };
    sinon.spy(Form.prototype, 'componentDidMount');
    const wrapper = shallow(<Form {...baseProps} />);
    expect(Form.prototype.componentDidMount).to.have.property('callCount', 1);
  });
});

describe('add function to form', () => {
  it('should be able to call a function once added on form', () => {
    const baseProps = {
      property: {
        agentsInfo: [],
        bookings: [],
        requestInfo: [],
      },
      currentView: '',
      toggleView: jest.fn(),
    };
    const wrapper = shallow(<Form {...baseProps} />);
    wrapper.instance().props.toggleView();
    expect(wrapper.instance().props.toggleView).to.exist;
  });
});

describe('onclick event on form', () => {
  it('should be able to handle onclick even on form', () => {
    const baseProps = {
      property: {
        agentsInfo: [],
        bookings: [],
        requestInfo: [],
      },
      currentView: '',
      toggleView: jest.fn(),
    };
    const wrapper = mount(<Form {...baseProps} />);
    wrapper.find('#checkbox').simulate('click');
    expect(wrapper.instance().state.financing).to.equal(true);
  });
});




describe('conditional render the form to show schedule view', () => {
  it('should contains times, disclaimer and date components but no agent components', () => {
    const wrapper = mount(<App />); // mount/render/shallow when applicable
    wrapper.setState({
      property: {
        bookings: [
          {
            type: 'In-Person',
            date: '2020-11-20',
            time: '10:30 AM',
            booking: {
              name: 'Javier Breitenberg',
              email: 'Zora_Hirthe@yahoo.com',
              phone: '808-984-7973',
              financing: true,
            },
          },
        ],
        requestInfo: [
          {
            name: 'Rosa Walker',
            email: 'Willow38@yahoo.com',
            phone: '409-522-4996',
            message: 'Suscipit sit debitis doloribus commodi error eos repudiandae. Est consequatur dicta et necessitatibus eos libero veniam.',
            financing: false,
          },
        ],
        agentsInfo: [
          {
            name: 'Melody Conroy',
            email: 'Alayna_Baumbach@yahoo.com',
            phone: '290-921-4362',
            reviewsScore: '3',
            reviewsCount: 49,
            recentSales: 19,
            picture: 'https://s3-us-west-1.amazonaws.com/trulia.tour.scheduler/3.jpg',
          },
        ],
        _id: '5fb57339592ece052ce73106',
        propertyId: 7,
        address: '20203 Sawayn Plaza',
        city: 'South Gideonfurt',
        state: 'Pennsylvania',
        zipCode: '29804-7636',
        listingAgent: 'Levi Wintheiser DVM',
        propertyType: 'Pending',
        __v: 0,
      },
    });
    expect(wrapper.find(Dates).exists()).to.equal(true);
    expect(wrapper.find(Disclaimer).exists()).to.equal(true);
    expect(wrapper.find(Times).exists()).to.equal(true);
    expect(wrapper.find(Agents).exists()).to.equal(false);
  });
});

describe('conditional render on form to show render view', () => {
  it('should have agent and disclaimer components but no date or time components', () => {
    const baseProps = {
      property: {
        agentsInfo: [],
        bookings: [],
        requestInfo: [],
      },
      currentView: 'info',
      toggleView: jest.fn(),
    };
    const wrapper = shallow(<Form {...baseProps} />);
    expect(wrapper.find(Agents).exists()).to.equal(true);
    expect(wrapper.find(Disclaimer).exists()).to.equal(true);
    expect(wrapper.find(Times).exists()).to.equal(false);
    expect(wrapper.find(Dates).exists()).to.equal(false);
  });
});