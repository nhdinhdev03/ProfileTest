import React from 'react';
import './style.scss';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="contact-page">
      <section className="contact-section">
        <div className="contact-container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <motion.div 
              className="contact-form"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form>
                <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </motion.div>
                <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </motion.div>
                <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </motion.div>
                <motion.button 
                  type="submit" 
                  className="submit-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>Email: <a href="mailto:example@example.com">example@example.com</a></p>
              <p>Connect with me on social media!</p>
              {/* Social media links can be added here */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
