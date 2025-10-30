import { ref, type Ref } from 'vue';
import Whop from '@whop/sdk';

interface UseWhopReturn {
  sdk: Whop | null;
  currentUser: Ref<any>;
  error: Ref<string | null>;
  fetchUser: (userId: string) => Promise<void>;
  checkMembership: (userId: string) => Promise<boolean>;
}

export function useWhop(): UseWhopReturn {
  let sdk: Whop | null = null;
  
  try {
    const apiKey = process.env.WHOP_API_KEY;
    const appId = process.env.WHOP_APP_ID;
    
    if (apiKey && appId) {
      sdk = new Whop({
        apiKey,
        appID: appId,
      });
    } else {
      console.warn('WHOP_API_KEY or WHOP_APP_ID not set - running in demo mode');
    }
  } catch (err) {
    console.warn('Whop SDK initialization failed - template demo mode', err);
  }
  
  const currentUser = ref<any>(null);
  const error = ref<string | null>(null);

  async function fetchUser(userId: string): Promise<void> {
    try {
      error.value = null;
      
      if (!sdk) {
        currentUser.value = { id: 'demo', username: 'Demo User' };
        return;
      }
      
      const user = await sdk.users.retrieve(userId);
      currentUser.value = user;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      console.error('Whop SDK error:', err);
    }
  }

  async function checkMembership(userId: string): Promise<boolean> {
    try {
      error.value = null;
      const companyId = process.env.WHOP_COMPANY_ID;
      
      if (!sdk) {
        console.warn('Whop SDK not initialized - returning demo data');
        return false;
      }
      
      if (!companyId) {
        console.warn('WHOP_COMPANY_ID not set');
        return false;
      }
      
      const response = await sdk.users.checkAccess(companyId, { id: userId });
      return response.has_access || false;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      console.error('Whop SDK error:', err);
      return false;
    }
  }

  return { sdk, currentUser, error, fetchUser, checkMembership };
}
