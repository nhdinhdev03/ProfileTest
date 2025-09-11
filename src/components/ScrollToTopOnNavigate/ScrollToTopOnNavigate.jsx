import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { smoothScrollTo } from '../../utils/scroll';

// Component này sẽ tự động cuộn lên đầu trang khi route thay đổi
function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();
  const lastPathname = useRef(pathname);
  
  useEffect(() => {
    // Nếu có hash trong URL (ví dụ: /about#section1), không cuộn lên đầu trang
    // vì người dùng đang cố gắng điều hướng đến một phần cụ thể của trang
    if (hash) {
      // Tìm phần tử có ID khớp với hash và cuộn đến đó
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Tính toán vị trí của phần tử có xét đến header offset
        setTimeout(() => {
          const headerOffset = 80; // Chiều cao của header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          // Sử dụng hàm smoothScrollTo được cải tiến từ utils/scroll.js
          smoothScrollTo(offsetPosition);
        }, 100);
      }
      return;
    }
    
    // Nếu pathname đã thay đổi, cuộn lên đầu trang
    if (pathname !== lastPathname.current) {
      lastPathname.current = pathname;
      
      // Sử dụng kết hợp requestAnimationFrame và setTimeout để đảm bảo
      // rằng cuộn xảy ra sau khi DOM đã render hoàn toàn
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }, 100);
      });
    }
  }, [pathname, hash]);

  // Component này không render gì cả
  return null;
}

export default ScrollToTopOnNavigate;
