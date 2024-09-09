
import './Contact.css';
import contact_message from '../../assets/contact-message.png';
import contact_phone from '../../assets/contact-phone.png';
import contact_location from '../../assets/contact-location.png';
import msg_icon from '../../assets/msg-icon.png';
import white_arrow from '../../assets/white-arrow.png';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const [result, setResult] = useState('');
  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    setResult('Sending....');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          access_key: '6bf5c277-1c0f-4da8-82d4-88bd7144abe2'
        }),
      });

      const result = await response.json();

      if (result.success) {
        setResult('Form Submitted Successfully');
        reset(); // Reset the form fields
      } else {
        console.log('Error:', result);
        setResult(result.message);
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setResult('There was an error submitting the form.');
    }
  };

  return (
    <div className="contact">
      <div className="contact-col">
        <h3>
          Send us a message <img src={msg_icon} alt="" loading="lazy" />
        </h3>
        <p>
          Feel free to reach out through the contact form or find our contact
          information below. Your feedback, questions, and suggestions are
          important to us as we strive to provide exceptional service to our
          university community.
        </p>
        <ul>
          <li>
            <img src={contact_message} alt="" loading="lazy" />
            Contact@GreatStack.dev
          </li>
          <li>
            <img src={contact_phone} alt="" loading="lazy" />
            +1 123-456-7890
          </li>
          <li>
            <img src={contact_location} alt="" loading="lazy" />
            77 Massachusetts Ave, Cambridge
          </li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={handleSubmit(onSubmit)} id="form">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            placeholder='Enter your name'
            {...register('name', { required: 'Name is required' })}
          />
          {/* <label htmlFor="name">Email ID</label>
          <input
            type="email"
            id="name"
            placeholder='Enter your email ID'
            {...register('name', { required: 'Email is required' })}
          /> */}
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            {...register('phone', { required: 'Phone number is required' })}
            placeholder='Enter your mobile number'
          />

          <label htmlFor="message">Write your message here</label>
          <textarea
            id="message"
            {...register('message', { required: 'Message is required' })}
            rows="6"
            placeholder="Enter your message"
          ></textarea>
          <button type="submit" className="btn dark-btn">
            Submit Now <img src={white_arrow} alt="" loading="lazy" />
          </button>
          <span>{result}</span>
        </form>
      </div>
    </div>
  );
};

export default Contact;

