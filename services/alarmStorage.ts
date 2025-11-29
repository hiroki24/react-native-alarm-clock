import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alarm } from '../types/alarm';

const STORAGE_KEY = '@alarms';

export const alarmStorage = {
  async getAlarms(): Promise<Alarm[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading alarms:', error);
      return [];
    }
  },

  async saveAlarm(alarm: Alarm): Promise<void> {
    try {
      const alarms = await this.getAlarms();
      const existingIndex = alarms.findIndex(a => a.id === alarm.id);
      
      if (existingIndex >= 0) {
        alarms[existingIndex] = alarm;
      } else {
        alarms.push(alarm);
      }
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
    } catch (error) {
      console.error('Error saving alarm:', error);
      throw error;
    }
  },

  async deleteAlarm(id: string): Promise<void> {
    try {
      const alarms = await this.getAlarms();
      const filtered = alarms.filter(a => a.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting alarm:', error);
      throw error;
    }
  },

  async updateAlarm(id: string, updates: Partial<Alarm>): Promise<void> {
    try {
      const alarms = await this.getAlarms();
      const index = alarms.findIndex(a => a.id === id);
      
      if (index >= 0) {
        alarms[index] = { ...alarms[index], ...updates };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(alarms));
      }
    } catch (error) {
      console.error('Error updating alarm:', error);
      throw error;
    }
  }
};