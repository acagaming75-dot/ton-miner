// Game configuration - pickaxes, tasks, upgrades

export interface Pickaxe {
  level: number;
  name: string;
  emoji: string;
  power: number;
  cost: number;
  color: string;
}

export const PICKAXES: Pickaxe[] = [
  { level: 0, name: 'Wooden Pickaxe', emoji: '🪓', power: 1, cost: 0, color: '#8b6f47' },
  { level: 1, name: 'Stone Pickaxe', emoji: '⛏️', power: 3, cost: 200, color: '#9e9e9e' },
  { level: 2, name: 'Iron Pickaxe', emoji: '⚒️', power: 10, cost: 1000, color: '#b0bec5' },
  { level: 3, name: 'Gold Pickaxe', emoji: '🔨', power: 50, cost: 5000, color: '#ffd700' },
  { level: 4, name: 'Diamond Pickaxe', emoji: '💠', power: 200, cost: 20000, color: '#00e5ff' },
  { level: 5, name: 'Ruby Pickaxe', emoji: '🔴', power: 500, cost: 75000, color: '#ff1744' },
  { level: 6, name: 'Emerald Pickaxe', emoji: '💚', power: 1200, cost: 250000, color: '#00e676' },
  { level: 7, name: 'Crystal Pickaxe', emoji: '💎', power: 3000, cost: 750000, color: '#e040fb' },
  { level: 8, name: 'TON Pickaxe', emoji: '🚀', power: 8000, cost: 2000000, color: '#0088cc' },
  { level: 9, name: 'Cosmic Pickaxe', emoji: '🌌', power: 20000, cost: 5000000, color: '#7c4dff' },
];

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  icon: string;
  action?: 'link' | 'invite' | 'wallet' | 'daily';
  url?: string;
}

export const TASKS: Task[] = [
  {
    id: 'join_channel',
    title: 'Join TON Miner Channel',
    description: 'Follow our official channel',
    reward: 1000,
    icon: '📢',
    action: 'link',
    url: 'https://t.me/tonminer_official',
  },
  {
    id: 'join_group',
    title: 'Join Community Group',
    description: 'Chat with other miners',
    reward: 500,
    icon: '💬',
    action: 'link',
    url: 'https://t.me/tonminer_chat',
  },
  {
    id: 'connect_wallet',
    title: 'Connect TON Wallet',
    description: 'Link your TON wallet',
    reward: 2000,
    icon: '👛',
    action: 'wallet',
  },
  {
    id: 'invite_1',
    title: 'Invite 1 Friend',
    description: 'Share the game with a friend',
    reward: 500,
    icon: '🎯',
    action: 'invite',
  },
  {
    id: 'invite_5',
    title: 'Invite 5 Friends',
    description: 'Grow the mining community',
    reward: 5000,
    icon: '👥',
    action: 'invite',
  },
  {
    id: 'invite_10',
    title: 'Invite 10 Friends',
    description: 'Become a top recruiter',
    reward: 15000,
    icon: '🏆',
    action: 'invite',
  },
  {
    id: 'reach_10k',
    title: 'Earn 10,000 Coins',
    description: 'Mine your way to 10K',
    reward: 2000,
    icon: '💰',
  },
  {
    id: 'reach_100k',
    title: 'Earn 100,000 Coins',
    description: 'Reach the 100K milestone',
    reward: 10000,
    icon: '💎',
  },
  {
    id: 'tap_1000',
    title: 'Tap 1,000 Times',
    description: 'Show your dedication',
    reward: 1500,
    icon: '👆',
  },
];

// Referral rewards
export const REFERRAL_REWARD = 500; // Coins per referral
export const REFERRAL_WELCOME = 500; // Coins for the new user

// Daily reward
export const DAILY_REWARD_BASE = 500;

// Energy config
export const ENERGY_REGEN_RATE = 1; // 1 per second
export const INITIAL_MAX_ENERGY = 1000;
