import axios from 'axios';
import { clearTokens, getRefreshToken, saveTokens } from './auth';
import { API_BASE_URL } from './constants';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * TokenAdapter centralizes how access / refresh tokens are refreshed.
 * The mobile app should never handle raw secrets – only opaque JWTs
 * or session tokens returned by the backend.
 */
export class TokenAdapter {
  /**
   * Attempt to refresh tokens using the stored refresh token.
   * Returns a new TokenPair or null if refresh fails.
   */
  static async refreshFromStorage(): Promise<TokenPair | null> {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    try {
      const { data } = await axios.post<TokenPair>(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      if (!data?.accessToken || !data?.refreshToken) {
        return null;
      }

      await saveTokens(data.accessToken, data.refreshToken);
      return data;
    } catch {
      await clearTokens();
      return null;
    }
  }
}

