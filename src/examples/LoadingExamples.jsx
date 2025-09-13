import React, { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import { useLoadingManager, useAsyncLoading } from '../hooks/useLoadingManager';

/**
 * Ví dụ sử dụng LoadingScreen với data thực tế
 */
const ExampleUsage = () => {
  // Example 1: Loading với tasks cụ thể
  const loadingTasks = [
    { id: 'components', name: 'Loading Components', description: 'Loading React components...' },
    { id: 'data', name: 'Fetching Data', description: 'Fetching user data...' },
    { id: 'assets', name: 'Loading Assets', description: 'Loading images and assets...' },
    { id: 'config', name: 'Loading Config', description: 'Loading configuration...' },
    { id: 'theme', name: 'Setting Theme', description: 'Applying theme settings...' }
  ];

  const {
    isLoading,
    progress,
    currentTask,
    completeTask,
    updateTaskProgress,
    startLoading
  } = useLoadingManager(loadingTasks);

  // Simulate loading tasks
  useEffect(() => {
    if (!isLoading) return;

    const simulateLoading = async () => {
      // Load components
      updateTaskProgress('components', 50);
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateTaskProgress('components', 100);
      completeTask('components');

      // Fetch data
      updateTaskProgress('data', 30);
      await new Promise(resolve => setTimeout(resolve, 800));
      updateTaskProgress('data', 70);
      await new Promise(resolve => setTimeout(resolve, 500));
      updateTaskProgress('data', 100);
      completeTask('data');

      // Load assets
      updateTaskProgress('assets', 25);
      await new Promise(resolve => setTimeout(resolve, 600));
      updateTaskProgress('assets', 60);
      await new Promise(resolve => setTimeout(resolve, 400));
      updateTaskProgress('assets', 100);
      completeTask('assets');

      // Load config
      updateTaskProgress('config', 100);
      completeTask('config');

      // Set theme
      await new Promise(resolve => setTimeout(resolve, 300));
      updateTaskProgress('theme', 100);
      completeTask('theme');
    };

    simulateLoading();
  }, [isLoading, updateTaskProgress, completeTask]);

  const handleLoadingComplete = () => {
    console.log('Loading completed!');
    // Chuyển đến main app hoặc hide loading screen
  };

  return (
    <div>
      {isLoading && (
        <LoadingScreen
          isLoading={isLoading}
          progress={progress}
          currentTask={currentTask}
          onComplete={handleLoadingComplete}
        />
      )}
      
      {!isLoading && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>App Loaded Successfully!</h1>
          <button onClick={() => startLoading()}>
            Reload
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Ví dụ với API calls thực tế
 */
const ApiLoadingExample = () => {
  // Simulate API calls
  const fetchData = async () => {
    // Simulate multiple API calls
    const [users, posts, settings] = await Promise.all([
      fetch('/api/users').then(r => r.json()).catch(() => ({ users: [] })),
      fetch('/api/posts').then(r => r.json()).catch(() => ({ posts: [] })),
      fetch('/api/settings').then(r => r.json()).catch(() => ({ settings: {} }))
    ]);

    return { users, posts, settings };
  };

  const { isLoading, progress, currentTask, data, error } = useAsyncLoading(fetchData, []);

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <h2>Loading Failed</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {isLoading && (
        <LoadingScreen
          isLoading={isLoading}
          progress={progress}
          currentTask={currentTask}
          onComplete={() => console.log('API data loaded')}
        />
      )}
      
      {!isLoading && data && (
        <div style={{ padding: '2rem' }}>
          <h1>Data Loaded!</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

/**
 * Ví dụ loading cho Route-based app
 */
const RouteLoadingExample = () => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    progress: 0,
    currentTask: 'Loading...'
  });

  const loadRoute = async (routeName) => {
    setLoadingState({
      isLoading: true,
      progress: 0,
      currentTask: `Loading ${routeName}...`
    });

    // Simulate route loading steps
    const steps = [
      { task: 'Loading route components...', delay: 500, progress: 25 },
      { task: 'Fetching route data...', delay: 800, progress: 50 },
      { task: 'Preparing layout...', delay: 300, progress: 75 },
      { task: 'Finalizing...', delay: 200, progress: 100 }
    ];

    for (const step of steps) {
      setLoadingState(prev => ({
        ...prev,
        currentTask: step.task,
        progress: step.progress
      }));
      await new Promise(resolve => setTimeout(resolve, step.delay));
    }

    setCurrentRoute(routeName);
    setLoadingState(prev => ({ ...prev, isLoading: false }));
  };

  return (
    <div>
      {loadingState.isLoading && (
        <LoadingScreen
          isLoading={loadingState.isLoading}
          progress={loadingState.progress}
          currentTask={loadingState.currentTask}
          onComplete={() => console.log(`Route ${currentRoute} loaded`)}
        />
      )}
      
      {!loadingState.isLoading && (
        <div style={{ padding: '2rem' }}>
          <h1>Current Route: {currentRoute}</h1>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={() => loadRoute('home')}>Home</button>
            <button onClick={() => loadRoute('about')}>About</button>
            <button onClick={() => loadRoute('portfolio')}>Portfolio</button>
            <button onClick={() => loadRoute('contact')}>Contact</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleUsage;
export { ApiLoadingExample, RouteLoadingExample };