import React from 'react';
import './style.scss';
import { motion } from 'framer-motion';

const blogData = [
  {
    id: 1,
    title: 'First Blog Post',
    excerpt: 'This is a short excerpt of the first blog post. It gives a glimpse into the content of the article.',
    imageUrl: 'https://via.placeholder.com/400x300',
    articleUrl: '#'
  },
  {
    id: 2,
    title: 'Second Blog Post',
    excerpt: 'This is a short excerpt of the second blog post. It gives a glimpse into the content of the article.',
    imageUrl: 'https://via.placeholder.com/400x300',
    articleUrl: '#'
  },
  {
    id: 3,
    title: 'Third Blog Post',
    excerpt: 'This is a short excerpt of the third blog post. It gives a glimpse into the content of the article.',
    imageUrl: 'https://via.placeholder.com/400x300',
    articleUrl: '#'
  }
];

const Blog = () => {
  return (
    <div className="blog-page">
      <section className="blog-section">
        <div className="blog-container">
          <h2>Latest Posts</h2>
          <motion.div 
            className="blog-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {blogData.map(post => (
              <motion.div 
                key={post.id} 
                className="blog-card"
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={post.imageUrl} alt={post.title} />
                <div className="blog-card-content">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <a href={post.articleUrl} className="read-more-link">Read More</a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
