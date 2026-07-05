import { useState, useEffect, useCallback, useRef } from 'react';
import MiningScreen from './components/MiningScreen';
import ShopScreen from './components/ShopScreen';
import TasksScreen from './components/TasksScreen';
import FriendsScreen from './components/FriendsScreen';
import WalletScreen from './components/WalletScreen';
import BottomNav from './components/BottomNav';
import { loadGameState, saveGameState, GameState, defaultState } from './game/state';
import { PICKAXES } from './game/config';

export type Screen = 'mine' | 'shop' | 'tasks' | 'friends' | 'wallet';

export default function App() {
  const [screen, setScreen] = useState<Screen>('mine');
  const [state, setState] = useState<GameState>(defaultState);
  const [loaded, setLoaded] = useState(false);
  const [notification, setNotification] = useState<string>('');
  const lastSaveRef = useRef(Date.now());

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
    const saved = loadGameState();
    setState(saved);
    setLoaded(true);
    const startParam = tg?.initDataUnsafe?.start_param;
    if (startParam && startParam.startsWith('ref_') && !saved.referredBy) {
      const referrerId = startParam.slice(4);
      const userId = String(tg?.initDataUnsafe?.user?.id || '');
      if (referrerId && referrerId !== userId) {
        setState(prev => ({
          ...prev,
          referredBy: referrerId,
          coins: prev.coins + 500,
        }));
        showNotification('🎁 Welcome bonus: +500 coins!');
      }
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(() => {
      if (Date.now() - lastSaveRef.current > 5000) {
        saveGameState(state);
        lastSaveRef.current = Date.now();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [state, loaded]);

  useEffect(() => {
    if (!loaded) return;
    const handler = () => saveGameState(state);
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [state, loaded]);

  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(() => {
      setState(prev => {
        if (prev.energy >= prev.maxEnergy) return prev;
        return { ...prev, energy: Math.min(prev.energy + 1, prev.maxEnergy) };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loaded]);

  useEffect(() => {
    if (!loaded || !state.autoTapper) return;
    const interval = setInterval(() => {
      setState(prev => {
        if (prev.energy <= 0) return prev;
        const pickaxe = PICKAXES[prev.pickaxeLevel];
        return {
          ...prev,
          coins: prev.coins + pickaxe.power,
          energy: prev.energy - 1,
          totalMined: prev.totalMined + pickaxe.power,
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loaded, state.autoTapper]);
  useEffect(() => {
    if (!loaded) return;
    const today = new Date().toISOString().slice(0, 10);
    if (state.lastDailyReward !== today) {
      const timer = setTimeout(() => {
        if (state.lastDailyReward !== today) {
          setState(prev => ({
            ...prev,
            coins: prev.coins + 500,
            lastDailyReward: today,
            dailyStreak: prev.dailyStreak + 1,
          }));
          showNotification(`🎁 Daily reward: +500 coins! Streak: ${state.dailyStreak + 1} days`);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  try {
    const showN = (m) => { setNotification(m); setTimeout(() => setNotification(''), 3000); };
    return (<div>{state.coins} {showN}</div>);
  } catch { }
}