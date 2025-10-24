import { ref, type Ref } from 'vue';

interface UseWhopReturn {
  sdk: any;
  currentUser: Ref<any>;
  error: Ref<string | null>;
  fetchUser: () => Promise<void>;
  checkMembership: () => Promise<boolean>;
}

export function useWhop(): UseWhopReturn {
  let sdk: any = null;
  
  try {
    import('@whop/api').then(({ WhopClientSdk }) => {
      sdk = WhopClientSdk();
    });
  } catch (err) {
    console.warn('Whop SDK not available - template demo mode');
  }
  
  const currentUser = ref<any>(null);
  const error = ref<string | null>(null);

  async function fetchUser(): Promise<void> {
    try {
      error.value = null;
      
      if (!sdk) {
        currentUser.value = { id: 'demo', username: 'Demo User' };
        return;
      }
      
      const response = await sdk.users.getCurrentUser();
      
      if ('_error' in response && response._error) {
        throw response._error;
      }
      
      currentUser.value = response.user;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      console.error('Whop SDK error:', err);
    }
  }

  async function checkMembership(): Promise<boolean> {
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
      
      const response = await sdk.access.checkIfUserHasAccessToCompany({ companyId });
      
      if ('_error' in response && response._error) {
        throw response._error;
      }
      
      return response.hasAccess || false;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      console.error('Whop SDK error:', err);
      return false;
    }
  }

  return { sdk, currentUser, error, fetchUser, checkMembership };
}
