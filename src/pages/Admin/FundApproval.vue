<template>
    <div class="approval-dashboard">
      <div class="dashboard-header">
        <h2>Customer Payment Requests</h2>
        <div class="filter-controls">
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
        </div>
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
            <tr v-if="filteredRequests.length === 0">
              <td colspan="6" class="no-results">
                No requests found matching your filters.
              </td>
            </tr>
            <tr v-for="(request, index) in filteredRequests" :key="index" :class="'status-' + request.update_approved_status">
              <td>{{ request.name }}</td>
              <td>{{ request.upi_id }}</td>
              <td>{{ request.action }}</td>
              <td>₹{{ formatAmount(request.amount) }}</td>
              <td>
                <span class="status-badge" :class="'status-' + request.update_approved_status">
                  {{ capitalize(request.update_approved_status) }}
                </span>
              </td>
              <td class="action-buttons">
                <button 
                  v-if="request.update_approved_status === 'pending'"
                  @click="approveRequest(request)" 
                  class="btn-approve"
                >
                  Approve
                </button>
                <button 
                  v-if="request.update_approved_status === 'pending'"
                  @click="rejectRequest(request)" 
                  class="btn-reject"
                >
                  Reject
                </button>
                <button v-if="request.update_approved_status !== 'pending'"
                  @click="resetStatus(request)" 
                  class="btn-reset"
                >
                  Reset
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal for confirmation -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h3>{{ modalTitle }}</h3>
          <p>{{ modalMessage }}</p>
          <div class="modal-form" v-if="modalAction === 'reject'">
            <label for="rejection-reason">Reason for rejection:</label>
            <textarea 
              id="rejection-reason" 
              v-model="rejectionReason"
              rows="3"
              placeholder="Please provide a reason for rejection..."
            ></textarea>
          </div>
          <div class="modal-actions">
            <button @click="cancelModal" class="btn-cancel">Cancel</button>
            <button @click="confirmModal" class="btn-confirm" :class="modalAction === 'approve' ? 'btn-approve' : 'btn-reject'">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomerRequestApproval',
    data() {
      return {
        requests: [
          // Sample data - replace with API calls in production
          { name: 'Rahul Sharma', upi_id: 'rahul@oksbi', action: 'Withdrawal', amount: 5000, update_approved_status: 'pending' },
          { name: 'Priya Patel', upi_id: 'priya@ybl', action: 'Withdrawal', amount: 2500, update_approved_status: 'approved' },
          { name: 'Amit Kumar', upi_id: 'amit@paytm', action: 'Refund', amount: 1200, update_approved_status: 'rejected' },
          { name: 'Neha Singh', upi_id: 'neha@icici', action: 'Withdrawal', amount: 3000, update_approved_status: 'pending' },
          { name: 'Vikram Joshi', upi_id: 'vikram@hdfc', action: 'Refund', amount: 800, update_approved_status: 'pending' }
        ],
        statusFilter: 'all',
        searchQuery: '',
        showModal: false,
        modalTitle: '',
        modalMessage: '',
        modalAction: '',
        selectedRequest: null,
        rejectionReason: ''
      };
    },
    computed: {
      filteredRequests() {
        return this.requests.filter(request => {
          // Apply status filter
          if (this.statusFilter !== 'all' && request.update_approved_status !== this.statusFilter) {
            return false;
          }
          
          // Apply search filter (case insensitive)
          if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            return request.name.toLowerCase().includes(query) || 
                   request.upi_id.toLowerCase().includes(query);
          }
          
          return true;
        });
      }
    },
    methods: {
      formatAmount(amount) {
        return amount.toLocaleString('en-IN');
      },
      capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      approveRequest(request) {
        this.selectedRequest = request;
        this.modalTitle = 'Approve Request';
        this.modalMessage = `Are you sure you want to approve the ${request.action.toLowerCase()} request of ₹${this.formatAmount(request.amount)} for ${request.name}?`;
        this.modalAction = 'approve';
        this.showModal = true;
      },
      rejectRequest(request) {
        this.selectedRequest = request;
        this.modalTitle = 'Reject Request';
        this.modalMessage = `Are you sure you want to reject the ${request.action.toLowerCase()} request of ₹${this.formatAmount(request.amount)} for ${request.name}?`;
        this.modalAction = 'reject';
        this.rejectionReason = '';
        this.showModal = true;
      },
      resetStatus(request) {
        this.selectedRequest = request;
        this.modalTitle = 'Reset Status';
        this.modalMessage = `Are you sure you want to reset this request back to pending status?`;
        this.modalAction = 'reset';
        this.showModal = true;
      },
      cancelModal() {
        this.showModal = false;
        this.selectedRequest = null;
        this.rejectionReason = '';
      },
      confirmModal() {
        if (!this.selectedRequest) return;
        
        if (this.modalAction === 'approve') {
          this.selectedRequest.update_approved_status = 'approved';
          // In production, make API call to update status
          // this.updateRequestStatus(this.selectedRequest.id, 'approved');
        } else if (this.modalAction === 'reject') {
          this.selectedRequest.update_approved_status = 'rejected';
          // In production, make API call to update status with reason
          // this.updateRequestStatus(this.selectedRequest.id, 'rejected', this.rejectionReason);
        } else if (this.modalAction === 'reset') {
          this.selectedRequest.update_approved_status = 'pending';
          // In production, make API call to reset status
          // this.updateRequestStatus(this.selectedRequest.id, 'pending');
        }
        
        // Close modal
        this.showModal = false;
        this.selectedRequest = null;
        this.rejectionReason = '';
      },
      // In production, implement these methods to call your API
      // updateRequestStatus(requestId, status, reason = '') {
      //   // Make API call to update request status
      //   // Example: axios.put(`/api/requests/${requestId}`, { status, reason })
      // }
    }
  };
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