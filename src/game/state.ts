import { INITIAL_MAX_ENERGY } from './config';

export interface GameState {
  coins: number;
  energy: number;
  maxEnergy: number;
  pickaxeLevel: number;
  energyLevel: number;
  autoTapper: boolean;
  totalTaps: number;
  totalMined: number;
  completedTasks: string[];
  referredBy: string | null;
  referrals: string[];
  dailyStreak: number;
  lastDailyReward: string;
  createdAt: number;
  lastSaved: number;
}

export const defaultState: GameState = {
  coins: 0,
  energy: INITIAL_MAX_ENERGY,
  maxEnergy: INITIAL_MAX_ENERGY,
  pickaxeLevel: 0,
  energyLevel: 0,
  autoTapper: false,
  totalTaps: 0,
  totalMined: 0,
  completedTasks: [],
  referredBy: null,
  referrals: [],
  dailyStreak: 0,
  lastDailyReward: '',
  createdAt: Date.now(),
  lastSaved: Date.now(),
};

const STORAGE_KEY = 'tonminer_state_v1';

function getUserId(): string {
  const tg = window.Telegram?.WebApp;
  return String(tg?.initDataUnsafe?.user?.id || 'guest');
}

export function loadGameState(): GameState {
  try {
    const key = `${STORAGE_KEY}_${getUserId()}`;
    const raw = localStorage.getItem(key);
    if (!raw) return { ...defaultState, createdAt: Date.now(), lastSaved: Date.now() };
    const parsed = JSON.parse(raw);

    const state: GameState = { ...defaultState, ...parsed };

    const offlineMs = Math.min(Date.now() - (state.lastSaved || Date.now()), 4 * 60 * 60 * 1000);
    const offlineSeconds = Math.floor(offlineMs / 1000);
    state.energy = Math.min(state.energy + offlineSeconds, state.maxEnergy);

    if (state.autoTapper) {
      const autoTapMs = Math.min(offlineMs, 3 * 60 * 60 * 1000);
      const autoTaps = Math.floor(autoTapMs / 1000);
      const energyAvailable = Math.min(autoTaps, state.energy);
      if (energyAvailable > 0) {
        const power = getPickaxePower(state.pickaxeLevel);
        state.coins += energyAvailable * power;
        state.totalMined += energyAvailable * power;
        state.energy -= energyAvailable;
      }
    }

    return state;
  } catch (e) {
    return { ...defaultState, createdAt: Date.now(), lastSaved: Date.now() };
  }
}

function getPickaxePower(level: number): number {
  const powers = [1, 3, 10, 50, 200, 500, 1200, 3000, 8000, 20000];
  return powers[Math.min(level, powers.length - 1)];
}

export function saveGameState(state: GameState): void {
  try {
    const key = `${STORAGE_KEY}_${getUserId()}`;
    const toSave = { ...state, lastSaved: Date.now() };
    localStorage.setItem(key, JSON.stringify(toSave));
  } catch (e) {
    console.error('Failed to save game state', e);
  }
}

export function resetGameState(): void {
  try {
    const key = `${STORAGE_KEY}_${getUserId()}`;
    localStorage.removeItem(key);
  } catch (e) {}
}
