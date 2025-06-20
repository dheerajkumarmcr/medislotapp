import React from "react";
import { Row, Col } from "react-bootstrap";
import { BiBook, BiCalendarX, BiMoney } from "react-icons/bi";

const PolicyCards = () => {
  const policies = [
    {
      title: 'Booking Guidelines',
      icon: BiBook,
      color: 'from-blue-500 to-blue-600',
      items: [
        'Arrive 15 minutes prior to your appointment time',
        'Bring valid government-issued ID and relevant medical records',
        'Complete pre-visit forms online if available',
        'Carry your insurance information if applicable'
      ],
      subtitle: '4 requirements'
    },
    {
      title: 'Cancellation Policy',
      icon: BiCalendarX,
      color: 'from-red-500 to-red-600',
      items: [
        'Cancel at least 24 hours before your appointment',
        'Late cancellations may incur a fee',
        'No-shows will be charged 50% of service fee',
        'Emergency cancellations accepted with documentation'
      ],
      subtitle: '4 conditions',
      phone: '081700 55555'
    },
    {
      title: 'Payment Policy',
      icon: BiMoney,
      color: 'from-green-500 to-green-600',
      items: [
        'Cash payments accepted at all facilities',
        'Credit/debit cards coming soon',
        'Insurance co-pays due at time of service',
        'Payment plans available for major procedures'
      ],
      subtitle: '4 options'
    }
  ];

  return (
    <div className="p-4">
      <p className="text-xl font-semibold mb-2">Our Policies</p>
      <Row className="g-4">
        {policies.map((policy, index) => (
          <Col lg={4} key={index}>
            <PolicyCard 
              title={policy.title}
              subtitle={policy.subtitle}
              Icon={policy.icon}
              color={policy.color}
              items={policy.items}
              phone={policy.phone}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const PolicyCard = ({ title, subtitle, Icon, color, items, phone }) => {
  return (
    <div className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white h-100">
      <div className={`absolute inset-0 bg-gradient-to-r ${color} translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300`} />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-blue-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-blue-200 relative z-10 duration-300 mb-3">
        {subtitle}
      </p>
      
      <ul className="relative z-10 duration-300 group-hover:text-white">
        {items.map((item, index) => (
          <li key={index} className="mb-2 flex items-start">
            <svg className="w-4 h-4 mt-1 mr-2 text-green-500 group-hover:text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      
      {phone && (
        <div className="mt-3 p-3 rounded text-center relative z-10 duration-300 group-hover:text-white">
          <h6 className="mb-2 flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Toll-Free Cancellation
          </h6>
          <h4 className="group-hover:text-white">{phone}</h4>
        </div>
      )}
    </div>
  );
};

export default PolicyCards;