import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCalendar, FiClock, FiUser, FiTag, FiArrowRight, FiSearch, FiFilter } from 'react-icons/fi'
import './Blog.scss'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)

  // Mock blog data - trong thực tế sẽ fetch từ API
  const blogPosts = [
    {
      id: 1,
      title: "React 18: Những tính năng mới và cải tiến đáng chú ý",
      excerpt: "Khám phá những tính năng mới trong React 18 như Concurrent Features, Automatic Batching, và Suspense improvements.",
      content: `
        <h2>React 18 đã ra mắt với nhiều tính năng mới thú vị</h2>
        <p>React 18 mang đến nhiều cải tiến quan trọng cho developers...</p>
        <h3>Concurrent Features</h3>
        <p>Concurrent Features là một trong những thay đổi lớn nhất...</p>
        <h3>Automatic Batching</h3>
        <p>Automatic Batching giúp tối ưu hóa performance...</p>
      `,
      category: 'react',
      author: 'Professional Developer',
      date: '2024-01-15',
      readTime: 8,
      image: '/api/placeholder/600/300',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox: Khi nào nên sử dụng cái gì?",
      excerpt: "So sánh chi tiết giữa CSS Grid và Flexbox, cách sử dụng hiệu quả cho layout responsive.",
      content: `
        <h2>CSS Grid và Flexbox: Hai công cụ mạnh mẽ</h2>
        <p>CSS Grid và Flexbox đều là những công cụ layout mạnh mẽ...</p>
        <h3>Khi nào sử dụng CSS Grid</h3>
        <p>CSS Grid phù hợp cho layout 2D...</p>
        <h3>Khi nào sử dụng Flexbox</h3>
        <p>Flexbox tốt cho layout 1D...</p>
      `,
      category: 'css',
      author: 'Professional Developer',
      date: '2024-01-10',
      readTime: 6,
      image: '/api/placeholder/600/300',
      tags: ['CSS', 'Layout', 'Responsive']
    },
    {
      id: 3,
      title: "Node.js Performance: Tối ưu hóa ứng dụng backend",
      excerpt: "Các kỹ thuật tối ưu hóa performance cho ứng dụng Node.js, từ caching đến database optimization.",
      content: `
        <h2>Tối ưu hóa Node.js Performance</h2>
        <p>Performance là yếu tố quan trọng trong phát triển backend...</p>
        <h3>Caching Strategies</h3>
        <p>Sử dụng Redis và Memory caching...</p>
        <h3>Database Optimization</h3>
        <p>Indexing và query optimization...</p>
      `,
      category: 'nodejs',
      author: 'Professional Developer',
      date: '2024-01-05',
      readTime: 12,
      image: '/api/placeholder/600/300',
      tags: ['Node.js', 'Performance', 'Backend']
    },
    {
      id: 4,
      title: "TypeScript: Từ JavaScript đến Type Safety",
      excerpt: "Hướng dẫn chuyển đổi từ JavaScript sang TypeScript và những lợi ích của type safety.",
      content: `
        <h2>TypeScript mang lại type safety cho JavaScript</h2>
        <p>TypeScript giúp developers viết code an toàn hơn...</p>
        <h3>Cài đặt và cấu hình</h3>
        <p>Bắt đầu với TypeScript trong dự án...</p>
        <h3>Advanced Types</h3>
        <p>Generics, Union types, và Intersection types...</p>
      `,
      category: 'typescript',
      author: 'Professional Developer',
      date: '2023-12-28',
      readTime: 10,
      image: '/api/placeholder/600/300',
      tags: ['TypeScript', 'JavaScript', 'Type Safety']
    },
    {
      id: 5,
      title: "Modern CSS: Variables, Nesting và Container Queries",
      excerpt: "Khám phá những tính năng CSS hiện đại giúp viết stylesheet hiệu quả và dễ maintain.",
      content: `
        <h2>CSS hiện đại với nhiều tính năng mới</h2>
        <p>CSS đã phát triển rất nhiều trong những năm gần đây...</p>
        <h3>CSS Custom Properties</h3>
        <p>Sử dụng CSS variables để tạo theme system...</p>
        <h3>Container Queries</h3>
        <p>Responsive design dựa trên container size...</p>
      `,
      category: 'css',
      author: 'Professional Developer',
      date: '2023-12-20',
      readTime: 7,
      image: '/api/placeholder/600/300',
      tags: ['CSS', 'Modern CSS', 'Responsive']
    },
    {
      id: 6,
      title: "Web Performance: Core Web Vitals và Optimization",
      excerpt: "Tối ưu hóa website performance với Core Web Vitals, lazy loading, và code splitting.",
      content: `
        <h2>Web Performance và User Experience</h2>
        <p>Performance ảnh hưởng trực tiếp đến user experience...</p>
        <h3>Core Web Vitals</h3>
        <p>LCP, FID, và CLS - những metrics quan trọng...</p>
        <h3>Optimization Techniques</h3>
        <p>Image optimization, code splitting, lazy loading...</p>
      `,
      category: 'performance',
      author: 'Professional Developer',
      date: '2023-12-15',
      readTime: 9,
      image: '/api/placeholder/600/300',
      tags: ['Performance', 'Web Vitals', 'Optimization']
    }
  ]

  const categories = [
    { id: 'all', label: 'Tất cả', count: blogPosts.length },
    { id: 'react', label: 'React', count: blogPosts.filter(p => p.category === 'react').length },
    { id: 'css', label: 'CSS', count: blogPosts.filter(p => p.category === 'css').length },
    { id: 'nodejs', label: 'Node.js', count: blogPosts.filter(p => p.category === 'nodejs').length },
    { id: 'typescript', label: 'TypeScript', count: blogPosts.filter(p => p.category === 'typescript').length },
    { id: 'performance', label: 'Performance', count: blogPosts.filter(p => p.category === 'performance').length }
  ]

  useEffect(() => {
    let filtered = blogPosts

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredPosts(filtered)
  }, [selectedCategory, searchTerm])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('vi-VN', options)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  }

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  }

  if (selectedPost) {
    return (
      <section id="blog" className="blog blog--single">
        <div className="blog__container">
          <motion.button
            className="blog__back-btn"
            onClick={() => setSelectedPost(null)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Quay lại
          </motion.button>

          <motion.article
            className="blog__single-post"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="blog__single-header">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="blog__single-image"
              />
              <div className="blog__single-meta">
                <div className="blog__single-tags">
                  {selectedPost.tags.map((tag, index) => (
                    <span key={index} className="blog__tag">{tag}</span>
                  ))}
                </div>
                <h1 className="blog__single-title">{selectedPost.title}</h1>
                <div className="blog__single-info">
                  <div className="blog__meta-item">
                    <FiUser />
                    <span>{selectedPost.author}</span>
                  </div>
                  <div className="blog__meta-item">
                    <FiCalendar />
                    <span>{formatDate(selectedPost.date)}</span>
                  </div>
                  <div className="blog__meta-item">
                    <FiClock />
                    <span>{selectedPost.readTime} phút đọc</span>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="blog__single-content"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
          </motion.article>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="blog">
      <div className="blog__container">
        <motion.div
          className="blog__header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="blog__title-section" variants={itemVariants}>
            <h2 className="blog__title">
              <span className="blog__title-text">Blog</span>
              <span className="blog__title-highlight">& Insights</span>
            </h2>
            <p className="blog__description">
              Chia sẻ kiến thức, kinh nghiệm và xu hướng công nghệ mới nhất
            </p>
          </motion.div>

          <motion.div className="blog__controls" variants={itemVariants}>
            <div className="blog__search">
              <FiSearch className="blog__search-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="blog__search-input"
              />
            </div>

            <div className="blog__filter">
              <FiFilter className="blog__filter-icon" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="blog__filter-select"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="blog__categories" variants={itemVariants}>
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`blog__category ${selectedCategory === category.id ? 'blog__category--active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
              <span className="blog__category-count">{category.count}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="blog__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                className="blog__card"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                whileHover={{ 
                  y: -10,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
                onClick={() => setSelectedPost(post)}
              >
                <div className="blog__card-image">
                  <img src={post.image} alt={post.title} />
                  <div className="blog__card-overlay">
                    <FiArrowRight className="blog__card-icon" />
                  </div>
                </div>

                <div className="blog__card-content">
                  <div className="blog__card-meta">
                    <div className="blog__meta-item">
                      <FiCalendar />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="blog__meta-item">
                      <FiClock />
                      <span>{post.readTime} phút</span>
                    </div>
                  </div>

                  <h3 className="blog__card-title">{post.title}</h3>
                  <p className="blog__card-excerpt">{post.excerpt}</p>

                  <div className="blog__card-tags">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="blog__tag">
                        <FiTag />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="blog__card-footer">
                    <div className="blog__card-author">
                      <FiUser />
                      <span>{post.author}</span>
                    </div>
                    <motion.button
                      className="blog__card-read-more"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Đọc thêm <FiArrowRight />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div
            className="blog__no-results"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Không tìm thấy bài viết nào</h3>
            <p>Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Blog
