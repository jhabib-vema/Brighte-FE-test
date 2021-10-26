import { default as axios } from 'axios';
import { AxiosInstance, AxiosStatic, AxiosError, AxiosResponse } from 'axios';
import { API_URL_BASE } from '../constants';
import { Referral } from '../types/referral';

export interface ApiClientParams {
  baseURL?: string;
}

export type ApiClientParamsWithDeps = ApiClientParams & {
  axios: AxiosStatic;
};

const apiUrl = `${API_URL_BASE}`;

// NOTE: Create new API clients for different services
// Potentially call ReferralService instead?
export class ApiClient {
  private axios: AxiosInstance;

  constructor({ baseURL, axios }: ApiClientParamsWithDeps) {
    this.axios = axios.create({
      baseURL: baseURL || apiUrl,
    });
  }

  static withDeps = (): ApiClient => {
    const config = {
      axios,
    };

    return new ApiClient(config);
  };

  getReferralData = async () => {
    const result = await mapResult<Referral[]>(() => this.axios.get('/referrals'));
    return result;
  };

  updateReferral = async (id: number, payload: Referral) => {
    const result = await mapResult(() => this.axios.put(`/referrals/${id}`, payload));
    return result;
  };

  createReferral = async (payload: Referral) => {
    const result = await mapResult<Referral[]>(() => this.axios.post('/referrals', payload));
    return result;
  };

  deleteReferral = async (id: number) => {
    const result = await mapResult(() => this.axios.delete(`/referrals/${id}`));
    return result;
  };
}

export type MappedResult<T> =
  | {
      type: 'success';
      data: T;
    }
  | {
      type: 'error';
      message: string;
      status?: number;
    };

async function mapResult<T>(fn: () => Promise<AxiosResponse<T>>): Promise<MappedResult<T>> {
  try {
    const successResult = await fn();

    return {
      type: 'success' as const,
      data: successResult.data,
    };
  } catch (err) {
    let axiosError: AxiosError = err;

    return {
      type: 'error' as const,
      message: axiosError?.message,
      status: axiosError?.response?.status! as number,
    };
  }
}
