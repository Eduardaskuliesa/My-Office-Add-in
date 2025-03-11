import apiClient from "./axios";

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  company?: string;
  email: string;
  phoneNumber: string;
  totalOrders: number;
  totalSpend: number;
  totalSpendAfterTax: number;
  registerDate: string;
  rewardPoints?: string;
  extrafields?: string;
  createdAt: string;
  updatedAt: string;
  orders?: any[];
}

export interface CustomerResponse {
  success: boolean;
  data?: Customer;
  message?: string;
  errorType?: string;
  searchedEmail?: string;
  statusCode?: number;
  requestUrl?: string;
}

const customerApi = {
  getCustomerInfo: async (email: string): Promise<CustomerResponse> => {
    try {
      const requestUrl = `/api/customer/${email}`;
      const response = await apiClient.get(requestUrl);
      return response.data;
    } catch (error) {
      const errorResponse: CustomerResponse = {
        success: false,
        message: error.response?.data?.message || "Failed to fetch customer data",
        requestUrl: `/api/customer/${email}`,
        statusCode: error.response?.status || 0,
        errorType: error.response?.data?.errorType || "UNKNOWN_ERROR",
        searchedEmail: email,
      };

      return errorResponse;
    }
  },
};

export default customerApi;
