import { useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';

export const useNotifications = () => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    checkAndRequestPermissions();
  }, []);

  const checkAndRequestPermissions = async () => {
    const granted = await notificationService.requestPermissions();
    setHasPermission(granted);
    return granted;
  };

  return {
    hasPermission,
    requestPermissions: checkAndRequestPermissions,
  };
};
