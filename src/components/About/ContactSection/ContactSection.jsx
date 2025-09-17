import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { memo, useCallback, useDeferredValue, useId, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import {
  FiGithub, FiLinkedin, FiMail,
  FiTwitter,
  FiYoutube
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";


import "./ContactSection.scss";
import useDeviceCapability from "hooks/useDeviceCapability";

const ContactSection = memo(({ profile, light }) => {
  const { t } = useTranslation();
  const { isLowPerformance, isMobile } = useDeviceCapability();
  const [startTransition] = useTransition();

  const [activeContact, setActiveContact] = useState(null);
  const [availability] = useState('available'); // available, busy, away
  
  // Deferred values for performance
  const deferredIsLowPerformance = useDeferredValue(isLowPerformance);
  const deferredIsMobile = useDeferredValue(isMobile);
  
  // Intersection observer for performance
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: deferredIsLowPerformance ? 0.05 : 0.1,
    rootMargin: deferredIsMobile ? '50px' : '100px'
  });

  // Comprehensive contact information
  const contactInfo = {
    email: {
      primary: "nhdinhdev03@gmail.com",
      work: "contact@nhdinhdev.com"
    },
    phone: {
      primary: "+84 123 456 789",
      whatsapp: "+84 123 456 789"
    },
    location: {
      city: "Ho Chi Minh City",
      country: "Vietnam",
      timezone: "GMT+7",
      address: "District 1, Ho Chi Minh City"
    },
    availability: {
      status: availability,
      workingHours: "9:00 AM - 6:00 PM (GMT+7)",
      responseTime: "Within 24 hours",
      languages: ["Vietnamese", "English"]
    },
    social: [
      {
        name: "GitHub",
        url: "https://github.com/nhdinhdev03",
        icon: FiGithub,
        color: "#333",
        followers: "50+",
        description: t('contact.github_desc', "View my projects and contributions")
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/nhdinhdev03",
        icon: FiLinkedin,
        color: "#0077b5",
        followers: "200+",
        description: t('contact.linkedin_desc', "Connect professionally")
      },
      {
        name: "Twitter",
        url: "https://twitter.com/nhdinhdev03",
        icon: FiTwitter,
        color: "#1da1f2",
        followers: "100+",
        description: t('contact.twitter_desc', "Follow for tech updates")
      },
      {
        name: "YouTube",
        url: "https://youtube.com/@nhdinhdev03",
        icon: FiYoutube,
        color: "#ff0000",
        followers: "500+",
        description: t('contact.youtube_desc', "Watch coding tutorials")
      }
    ]
  };

  // Handle contact method selection
  const handleContactSelect = useCallback((contactType) => {
    startTransition(() => {
      setActiveContact(activeContact === contactType ? null : contactType);
    });
  }, [activeContact, startTransition]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 12 }
    }
  };
  
  return (
    <motion.section 
      className="contact-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
      whileHover={{ 
        scale: 1.01,
        transition: { type: 'spring', stiffness: 400 }
      }}
    >
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
      >
        {t('about.connect_title')}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
      >
        {t('about.connect_description')}
      </motion.p>
      <motion.div 
        className="contact-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
      >
        <motion.a
          href="mailto:nhdinhdev03@gmail.com"
          className="btn btn-primary"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiMail style={{ marginRight: '8px' }} />
          {t('about.email')}
        </motion.a>
        <motion.a
          href={profile?.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiGithub style={{ marginRight: '8px' }} />
          {t('about.github')}
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/nhdinhdev03"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiLinkedin style={{ marginRight: '8px' }} />
          {t('about.linkedin')}
        </motion.a>
      </motion.div>
      <motion.div 
        className="theme-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <motion.div 
          className="theme-status"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {light
            ? t('about.light_mode_active')
            : t('about.dark_mode_active')}
        </motion.div>
      </motion.div>
    </motion.section>
  );
});

ContactSection.propTypes = {
  profile: PropTypes.shape({
    html_url: PropTypes.string,
  }),
  light: PropTypes.bool.isRequired,
};

export default ContactSection;