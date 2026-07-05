// Telegram WebApp type shim
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            photo_url?: string;
          };
          start_param?: string;
        };
        colorScheme: 'light' | 'dark';
        themeParams: any;
        HapticFeedback?: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        MainButton: any;
        BackButton: any;
        openTelegramLink: (url: string) => void;
        openLink: (url: string) => void;
        shareUrl?: (url: string, text: string) => void;
      };
    };
  }
}

export {};
