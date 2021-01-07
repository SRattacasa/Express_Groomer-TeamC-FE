import React from 'react';
import PropTypes from 'prop-types';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import Parallax from 'rc-scroll-anim/lib/ScrollParallax';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { FaDog, FaHome, FaSearch, FaRegCalendarAlt } from 'react-icons/fa';
import { RiSecurePaymentLine, RiScissorsFill } from 'react-icons/ri';

// import SearchForm
import { SearchForm } from '../search';
// import FormInput as a test to see if it will render on the page correctly
import { FormInput } from '../common';

const { TweenOneGroup } = TweenOne;

const featuresCN = [
  {
    title: 'In-Shop Dog Grooming',
    content: 'Drop your dog off at the groomer!',
    icon: <FaDog style={{ color: '#50C9CE', fontSize: '2em' }} />,
    color: '#50C9CE',
    shadowColor: 'rgba(19,194,194,.12)',
  },
  {
    title: 'In-Home Dog Grooming',
    content: 'Groomers come to you!',
    icon: <FaHome style={{ color: '#7EE081', fontSize: '2em' }} />,
    color: '#7EE081',
    shadowColor: 'rgba(47,84,235,.12)',
  },
  {
    title: 'Search Groomers',
    content: 'Find the perfect groomer for you!',
    icon: <FaSearch style={{ color: '#50723C', fontSize: '2em' }} />,
    color: '#50723C',
    shadowColor: 'rgba(245,34,45,.12)',
  },
  {
    title: 'Appointment Scheduling',
    content: 'Make appointments that fit your schedule!',
    icon: <FaRegCalendarAlt style={{ color: '#AC92A6', fontSize: '2em' }} />,
    color: '#AC92A6',
    shadowColor: 'rgba(26,196,77,.12)',
  },
  {
    title: 'Secure Checkout',
    content: 'Pay securely through the app!',
    icon: <RiSecurePaymentLine style={{ color: '#F07605', fontSize: '2em' }} />,
    color: '#F07605',
    shadowColor: 'rgba(250,173,20,.12)',
  },
  {
    title: 'Join as a Groomer',
    content: 'Reach new customers near you!',
    icon: <RiScissorsFill style={{ color: '#6247AA', fontSize: '2em' }} />,
    color: '#6247AA',
    shadowColor: 'rgba(114,46,209,.12)',
  },
];

const pointPos = [
  { x: -30, y: -10 },
  { x: 20, y: -20 },
  { x: -65, y: 15 },
  { x: -45, y: 80 },
  { x: 35, y: 5 },
  { x: 50, y: 50, opacity: 0.2 },
];

class Page1 extends React.PureComponent {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      hoverNum: null,
    };
  }
  onMouseOver = i => {
    this.setState({
      hoverNum: i,
    });
  };
  onMouseOut = () => {
    this.setState({
      hoverNum: null,
    });
  };
  getEnter = e => {
    const i = e.index;
    const r = Math.random() * 2 - 1;
    const y = Math.random() * 10 + 5;
    const delay = Math.round(Math.random() * (i * 50));
    return [
      {
        delay,
        opacity: 0.4,
        ...pointPos[e.index],
        ease: 'easeOutBack',
        duration: 300,
      },
      {
        y: r > 0 ? `+=${y}` : `-=${y}`,
        duration: Math.random() * 1000 + 2000,
        yoyo: true,
        repeat: -1,
      },
    ];
  };
  render() {
    const { hoverNum } = this.state;
    let children = [[], [], []];
    featuresCN.forEach((item, i) => {
      const isHover = hoverNum === i;
      const pointChild = [
        'point-0 left',
        'point-0 right',
        'point-ring',
        'point-1',
        'point-2',
        'point-3',
      ].map(className => (
        <TweenOne
          component="i"
          className={className}
          key={className}
          style={{
            background: item.color,
            borderColor: item.color,
          }}
        />
      ));
      const child = (
        <li key={i.toString()}>
          <div
            className="page1-box"
            onMouseEnter={() => {
              this.onMouseOver(i);
            }}
            onMouseLeave={this.onMouseOut}
          >
            <TweenOneGroup
              className="page1-point-wrapper"
              enter={this.getEnter}
              leave={{
                x: 0,
                y: 30,
                opacity: 0,
                duration: 300,
                ease: 'easeInBack',
              }}
              resetStyleBool={false}
            >
              {(this.props.isMobile || isHover) && pointChild}
            </TweenOneGroup>
            <div
              className="page1-image"
              style={{
                boxShadow: `${isHover ? '0 12px 24px' : '0 6px 12px'} ${
                  item.shadowColor
                }`,
              }}
            >
              <div>{item.icon}</div>
            </div>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        </li>
      );
      children[Math.floor(i / 3)].push(child);
    });

    children = children.map((item, i) => (
      <QueueAnim
        className="page1-box-wrapper"
        key={i.toString()}
        type="bottom"
        leaveReverse
        delay={[i * 100, (children.length - 1 - i) * 100]}
        component="ul"
      >
        {item}
      </QueueAnim>
    ));
    return (
      <div className="home-page page1">
        <div className="home-page-wrapper" id="page1-wrapper">
          {!this.props.isMobile && (
            <Parallax
              className="page1-bg"
              animation={{
                translateY: 200,
                ease: 'linear',
                playScale: [0, 1.65],
              }}
              location="page1-wrapper"
            ></Parallax>
          )}
          <h2>
            What can <span>Express Groomers</span> do for you{' '}
          </h2>
          <OverPack>{children}</OverPack>
          {/* render SearchForm - it just renders groomer cards right now */}
          {/* <SearchForm /> */}
          {/* render FormInput as a test to see if it will render correctly */}
          {/* <FormInput /> */}
        </div>
      </div>
    );
  }
}

export default Page1;
