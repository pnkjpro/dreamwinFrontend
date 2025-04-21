<template>
    <div class="approval-dashboard">
      <div class="dashboard-header">
        <h2>Customer Payment Requests</h2>
        <!-- <div class="filter-controls">
          <select v-model="statusFilter" class="status-filter">
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by name or UPI ID"
            class="search-input"
          />
        </div> -->
      </div>
  
      <div class="table-container">
        <table class="requests-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>UPI ID</th>
              <th>Action</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="allTransactions.length === 0">
              <td colspan="6" class="no-results">
                No requests found matching your filters.
              </td>
            </tr>
            <tr v-for="(request, index) in allTransactions" :key="index" :class="'status-' + request.approved_status">
              <td style="text-transform: capitalize;">{{ request.name }}</td>
              <td>{{ request.upi_id }}</td>
              <td style="text-transform: capitalize;">{{ request.action }}</td>
              <td>₹{{ request.amount }}</td>
              <td>
                <span class="status-badge" :class="'status-' + request.approved_status">
                  {{ request.approved_status }}
                </span>
              </td>
              <td class="action-buttons">
                <button 
                  v-if="request.approved_status === 'pending'"
                  @click="handleStatusApproval(request, 'approved')" 
                  class="btn-approve"
                >
                  Approve
                </button>
                <button 
                  v-if="request.approved_status === 'pending'"
                  @click="handleStatusApproval(request, 'rejected')" 
                  class="btn-reject"
                >
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="hasMoreLoad" class="mt-6 text-center">
          <button @click="fetchTransactions" 
                  class="px-8 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all transform hover:scale-105"
                  :disabled="adminStore.loading">
            <span v-if="adminStore.loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
            <span v-else class="flex items-center justify-center">
              Load More
              <font-awesome-icon icon="chevron-down" class="ml-2" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref, computed, onMounted } from 'vue';
    import { useAdminStore } from '@/stores/adminStore';
    import { storeToRefs } from 'pinia';
    import { useToast } from 'vue-toastification';

    const toast = useToast();
    const hasMoreLoad = ref(true);
    const page = ref(1);
    const adminStore = useAdminStore();
    const { allTransactions } = storeToRefs(adminStore);

    onMounted(() => {
      fetchTransactions();
    })
    
    const fetchTransactions = async() => {
      const result = await adminStore.fetchTransactions(page.value);
      if(!result.success){
        toast.error("failed to fetch transactions");
      } else {
        console.log("pagination: ", result.pagination);
        if(result.pagination){
          page.value = page.value + 1;
        } else {
          hasMoreLoad.value = false;
        }
      }

    }

    const handleStatusApproval = async(request, approval) => {
      const result = await adminStore.statusApproval(request, approval)
      if(!result.success){
        toast.error(result.message);
      }
      toast.success(result.message);
    }

    
</script>

  
  <style scoped>
  .approval-dashboard {
    font-family: 'Inter', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .dashboard-header h2 {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
  }
  
  .filter-controls {
    display: flex;
    gap: 12px;
  }
  
  .status-filter, .search-input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .search-input {
    width: 240px;
  }
  
  .table-container {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .requests-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .requests-table th, .requests-table td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  .requests-table th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #555;
  }
  
  .status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .status-pending {
    background-color: #fff8e1;
    color: #f57c00;
  }
  
  .status-approved {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .status-rejected {
    background-color: #ffebee;
    color: #c62828;
  }
  
  tr.status-rejected {
    background-color: #fff5f5;
  }
  
  tr.status-approved {
    background-color: #f5fff8;
  }
  
  .action-buttons {
    display: flex;
    gap: 8px;
  }
  
  .btn-approve, .btn-reject, .btn-reset {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .btn-approve {
    background-color: #4caf50;
    color: white;
  }
  
  .btn-approve:hover {
    background-color: #43a047;
  }
  
  .btn-reject {
    background-color: #f44336;
    color: white;
  }
  
  .btn-reject:hover {
    background-color: #e53935;
  }
  
  .btn-reset {
    background-color: #607d8b;
    color: white;
  }
  
  .btn-reset:hover {
    background-color: #546e7a;
  }
  
  .no-results {
    text-align: center;
    padding: 24px;
    color: #666;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    border-radius: 8px;
    padding: 24px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  
  .modal-content h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: #333;
  }
  
  .modal-form {
    margin: 16px 0;
  }
  
  .modal-form label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }
  
  .modal-form textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    resize: vertical;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }
  
  .btn-cancel, .btn-confirm {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
  }
  
  .btn-cancel {
    background-color: #f5f5f5;
    color: #555;
  }
  
  .btn-cancel:hover {
    background-color: #e0e0e0;
  }
  </style>