<template>
    <div class="variant-form-container">
      <h2 class="form-title">{{ isEditing ? 'Edit Quiz Variant' : 'Create Quiz Variant' }}</h2>
      
      <form @submit.prevent="saveVariant" class="variant-form">
        <!-- Quiz ID Field -->
        <div class="form-group">
          <label for="quiz_id">Quiz ID</label>
          <input 
            id="quiz_id"
            v-model.number="variant.quiz_id"
            type="number"
            class="form-control"
            :disabled="isEditing"
            required
          />
        </div>
        
        <!-- Entry Fee Field -->
        <div class="form-group">
          <label for="entry_fee">Entry Fee</label>
          <div class="input-with-prefix">
            <span class="input-prefix">$</span>
            <input 
              id="entry_fee"
              v-model.number="variant.entry_fee"
              type="number"
              class="form-control"
              min="0"
              required
            />
          </div>
        </div>
        
        <!-- Total Prize Field -->
        <div class="form-group">
          <label for="prize">Total Prize Pool</label>
          <div class="input-with-prefix">
            <span class="input-prefix">$</span>
            <input 
              id="prize"
              v-model.number="variant.prize"
              type="number"
              class="form-control"
              min="0"
              required
            />
          </div>
        </div>
        
        <!-- Slot Limit Field -->
        <div class="form-group">
          <label for="slot_limit">Slot Limit</label>
          <input 
            id="slot_limit"
            v-model.number="variant.slot_limit"
            type="number"
            class="form-control"
            min="1"
            required
          />
        </div>
        
        <!-- Status Field -->
        <div class="form-group">
          <label for="status">Status</label>
          <select
            id="status"
            v-model="variant.status"
            class="form-control"
            required
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <!-- Prize Contents Section -->
        <div class="prize-contents-section">
          <h3 class="section-title">Prize Distribution</h3>
          <p class="section-desc">Allocate prizes for each position (total: ${{ totalPrizeAmount }})</p>
          
          <div class="prize-grid">
            <div v-for="position in 10" :key="`prize-${position}`" class="prize-item">
              <label :for="`prize_${position}`">#{{ position }}</label>
              <div class="input-with-prefix">
                <span class="input-prefix">$</span>
                <input 
                  :id="`prize_${position}`"
                  v-model.number="prizeContents[position]"
                  type="number"
                  class="form-control prize-input"
                  min="0"
                  @input="updatePrizeContents"
                />
              </div>
            </div>
          </div>
          
          <div class="prize-summary" :class="{ 'prize-mismatch': isPrizeMismatch }">
            <div class="prize-allocation">
              <span>Total Allocated:</span>
              <span>${{ totalPrizeAmount }}</span>
            </div>
            <div v-if="isPrizeMismatch" class="prize-warning">
              <i class="warning-icon">⚠️</i>
              <span>Total allocated prizes must equal the total prize pool</span>
            </div>
          </div>
        </div>
        
        <!-- Form Actions -->
        <div class="form-actions">
          <button type="button" @click="resetForm" class="btn-cancel">Cancel</button>
          <button 
            type="submit" 
            class="btn-save"
            :disabled="isPrizeMismatch"
          >
            Save Variant
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'QuizVariantForm',
    props: {
      initialVariant: {
        type: Object,
        default: () => ({
          quiz_id: null,
          entry_fee: 0,
          prize: 0,
          slot_limit: 100,
          status: 'draft',
          prize_contents: {}
        })
      }
    },
    data() {
      return {
        variant: {
          quiz_id: null,
          entry_fee: 0,
          prize: 0,
          slot_limit: 100,
          status: 'draft',
          prize_contents: {}
        },
        prizeContents: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
          10: 0
        },
        isEditing: false
      }
    },
    computed: {
      totalPrizeAmount() {
        return Object.values(this.prizeContents).reduce((sum, value) => sum + (value || 0), 0);
      },
      isPrizeMismatch() {
        return this.variant.prize > 0 && this.totalPrizeAmount !== this.variant.prize;
      }
    },
    created() {
      // Check if we're editing an existing variant
      this.isEditing = !!this.initialVariant.quiz_id;
      
      // Create a deep copy of the initial variant
      this.variant = JSON.parse(JSON.stringify(this.initialVariant));
      
      // Populate prize contents from initial data
      if (this.variant.prize_contents) {
        for (let position = 1; position <= 10; position++) {
          this.prizeContents[position] = this.variant.prize_contents[position] || 0;
        }
      }
    },
    methods: {
      updatePrizeContents() {
        // Update the prize_contents object whenever inputs change
        this.variant.prize_contents = { ...this.prizeContents };
      },
      saveVariant() {
        if (this.isPrizeMismatch) {
          return; // Don't save if prize amounts don't match
        }
        
        // Update prize contents before emitting
        this.updatePrizeContents();
        
        // Emit save event with variant data
        this.$emit('save', { ...this.variant });
      },
      resetForm() {
        // Reset form to initial values or clear if adding new
        if (this.isEditing) {
          this.variant = JSON.parse(JSON.stringify(this.initialVariant));
          
          // Reset prize contents
          if (this.variant.prize_contents) {
            for (let position = 1; position <= 10; position++) {
              this.prizeContents[position] = this.variant.prize_contents[position] || 0;
            }
          }
        } else {
          this.variant = {
            quiz_id: null,
            entry_fee: 0,
            prize: 0,
            slot_limit: 100,
            status: 'draft',
            prize_contents: {}
          };
          
          // Clear prize contents
          for (let position = 1; position <= 10; position++) {
            this.prizeContents[position] = 0;
          }
        }
        
        // Emit cancel event
        this.$emit('cancel');
      }
    }
  }
  </script>
  
  <style scoped>
  .variant-form-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 24px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    margin-bottom: 24px;
    color: #333;
    font-size: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #555;
  }
  
  .form-control {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.2s;
  }
  
  .form-control:focus {
    border-color: #4a90e2;
    outline: none;
  }
  
  .input-with-prefix {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .input-prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-right: none;
    border-radius: 4px 0 0 4px;
    height: 40px;
    color: #666;
  }
  
  .input-with-prefix .form-control {
    border-radius: 0 4px 4px 0;
  }
  
  .prize-contents-section {
    margin-top: 30px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 6px;
  }
  
  .section-title {
    margin-bottom: 10px;
    color: #333;
    font-size: 1.2rem;
  }
  
  .section-desc {
    margin-bottom: 20px;
    color: #666;
    font-size: 0.9rem;
  }
  
  .prize-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 20px;
  }
  
  .prize-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .prize-item label {
    font-weight: 500;
    color: #555;
    font-size: 0.9rem;
  }
  
  .prize-input {
    padding: 8px 10px;
  }
  
  .prize-summary {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    background-color: #edfaef;
    border-radius: 4px;
    margin-top: 16px;
  }
  
  .prize-mismatch {
    background-color: #fdecec;
  }
  
  .prize-allocation {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
  }
  
  .prize-warning {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #e53935;
    font-size: 0.9rem;
  }
  
  .warning-icon {
    font-size: 1rem;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 30px;
  }
  
  .btn-cancel {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #555;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .btn-cancel:hover {
    background: #e5e5e5;
  }
  
  .btn-save {
    padding: 10px 20px;
    background: #4a90e2;
    border: 1px solid #4a90e2;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .btn-save:hover {
    background: #3a80d2;
  }
  
  .btn-save:disabled {
    background: #b0c7e2;
    border-color: #b0c7e2;
    cursor: not-allowed;
  }
  </style>