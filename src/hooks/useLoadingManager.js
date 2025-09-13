import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook để quản lý trạng thái loading dựa trên các task thực tế
 * @param {Array} loadingTasks - Danh sách các task cần load
 * @returns {Object} - Loading state và methods
 */
export const useLoadingManager = (loadingTasks = []) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Initializing...');
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [taskProgress, setTaskProgress] = useState({});

  // Cập nhật progress dựa trên số task hoàn thành
  useEffect(() => {
    if (loadingTasks.length === 0) {
      setProgress(0);
      return;
    }

    const completed = completedTasks.size;
    const total = loadingTasks.length;
    const baseProgress = (completed / total) * 100;
    
    // Thêm progress của task hiện tại
    const currentTaskId = loadingTasks.find(task => !completedTasks.has(task.id))?.id;
    const currentTaskProgress = currentTaskId ? (taskProgress[currentTaskId] || 0) : 0;
    const currentTaskWeight = total > 0 ? (1 / total) * 100 : 0;
    
    const totalProgress = Math.min(baseProgress + (currentTaskProgress * currentTaskWeight / 100), 100);
    setProgress(totalProgress);

    // Cập nhật loading state
    if (completed === total && totalProgress >= 100) {
      setIsLoading(false);
    }
  }, [completedTasks, loadingTasks, taskProgress]);

  // Cập nhật current task
  useEffect(() => {
    const pendingTask = loadingTasks.find(task => !completedTasks.has(task.id));
    if (pendingTask) {
      setCurrentTask(pendingTask.description || pendingTask.name || 'Loading...');
    } else if (loadingTasks.length > 0) {
      setCurrentTask('Completing...');
    }
  }, [completedTasks, loadingTasks]);

  // Mark task as completed
  const completeTask = useCallback((taskId) => {
    setCompletedTasks(prev => new Set([...prev, taskId]));
    setTaskProgress(prev => ({ ...prev, [taskId]: 100 }));
  }, []);

  // Update progress của một task cụ thể
  const updateTaskProgress = useCallback((taskId, progressValue) => {
    setTaskProgress(prev => ({
      ...prev,
      [taskId]: Math.min(Math.max(progressValue, 0), 100)
    }));
  }, []);

  // Start loading với tasks mới
  const startLoading = useCallback((newTasks = []) => {
    setIsLoading(true);
    setProgress(0);
    setCompletedTasks(new Set());
    setTaskProgress({});
    setCurrentTask('Initializing...');
  }, []);

  // Force complete loading
  const completeLoading = useCallback(() => {
    setProgress(100);
    setIsLoading(false);
    setCurrentTask('Ready!');
  }, []);

  return {
    isLoading,
    progress,
    currentTask,
    completedTasks,
    taskProgress,
    completeTask,
    updateTaskProgress,
    startLoading,
    completeLoading
  };
};

/**
 * Hook đơn giản cho loading với promise
 * @param {Function} asyncFunction - Function async cần track
 * @param {Array} dependencies - Dependencies để re-run
 * @returns {Object} - Loading state
 */
export const useAsyncLoading = (asyncFunction, dependencies = []) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Loading...');
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async () => {
    if (!asyncFunction) return;

    setIsLoading(true);
    setProgress(0);
    setError(null);
    setCurrentTask('Starting...');

    try {
      // Simulate progress tracking
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10 + 5;
        });
      }, 200);

      const result = await asyncFunction();
      
      clearInterval(progressInterval);
      setProgress(100);
      setCurrentTask('Complete!');
      setData(result);
      
      // Delay để show complete state
      setTimeout(() => {
        setIsLoading(false);
      }, 300);

    } catch (err) {
      setError(err);
      setIsLoading(false);
      setCurrentTask('Error occurred');
    }
  }, [asyncFunction]);

  useEffect(() => {
    execute();
  }, dependencies);

  return {
    isLoading,
    progress,
    currentTask,
    error,
    data,
    retry: execute
  };
};

export default useLoadingManager;