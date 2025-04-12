<template>
  <div class="admin-form-container">
    <h2 class="form-title">Add New Category</h2>
    
    <form @submit.prevent="handleCreateCategory" class="category-form">
      <!-- Name Field -->
      <div class="form-group">
        <label for="name">Category Name</label>
        <input 
          id="name"
          v-model="category.name"
          type="text"
          class="form-control"
          required
        />
      </div>
      
      <!-- Description Field -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="category.description"
          class="form-control"
          rows="3"
        ></textarea>
      </div>
      
      <!-- Icon Field -->
      <div class="form-group">
        <label for="icon">Icon</label>
        <div class="file-field">
          <input 
            id="icon"
            type="file"
            @change="handleIconUpload"
            class="file-input"
            accept="image/*"
          />
          <span class="file-name">{{ category.icon || 'No file chosen' }}</span>
        </div>
      </div>
      
      <!-- Icon Color Field -->
      <div class="form-group">
        <label for="icon_color">Icon Color</label>
        <div class="color-picker">
          <input 
            id="icon_color"
            v-model="category.icon_color"
            type="text"
            class="form-control"
          />
          <input 
            type="color"
            v-model="category.icon_color"
            class="color-input"
          />
        </div>
      </div>
      
      <!-- Banner Image Field -->
      <div class="form-group">
        <label for="banner_image">Banner Image</label>
        <div class="file-field">
          <input 
            id="banner_image"
            type="file"
            @change="handleBannerUpload"
            class="file-input"
            accept="image/*"
          />
          <span class="file-name">{{ category.banner_image || 'No file chosen' }}</span>
        </div>
      </div>
      
      <!-- Display Order Field
      <div class="form-group">
        <label for="display_order">Display Order</label>
        <input 
          id="display_order"
          v-model="category.display_order"
          type="number"
          class="form-control"
          min="1"
        />
      </div> -->
      
      <!-- Form Actions -->
      <div class="form-actions">
        <button type="button" @click="resetForm" class="btn-cancel">Cancel</button>
        <button type="submit" class="btn-save"
        :disabled="adminStore.loading"
        >{{ adminStore.loading ? 'Saving...' : 'Save Category'}}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import { storeToRefs } from 'pinia';
import { object } from 'yup';
import { useToast } from 'vue-toastification';

const initialCategory = {
      name: '',
      description: '',
      icon: '',
      icon_color: '#007bff',
      banner_image: '',
      display_order: 1
    }

const category = ref({...initialCategory});

const resetForm = () => {
  Object.assign(category.value, JSON.parse(JSON.stringify(initialCategory)));
}

const adminStore = useAdminStore();
const { } = storeToRefs(adminStore);
const toast = useToast();

const handleBannerUpload = (event) => {
  const file = event.target.files[0];
  if(file){
    category.value.bannerFile = file;
    category.value.banner_image = file.name;
  }
}

const handleIconUpload = (event) => {
  const file = event.target.files[0];
  if(file){
    category.value.iconFile = file;
    category.value.icon = file.name
  }
}

const handleCreateCategory = async() => {
    const formData = new FormData();
    formData.append('name', category.value.name);
    formData.append('description', category.value.description);
    formData.append('icon_color', category.value.icon_color);
    
    if (category.value.iconFile) {
      formData.append('icon', category.value.iconFile);
    }
    
    if (category.value.bannerFile) {
      formData.append('banner_image', category.value.bannerFile);
    }

    const result = await adminStore.createCategory(formData);
    if (!result.success) {
    const messages = result.message;

    if (typeof messages === 'object' && messages !== null && !Array.isArray(messages)) {
      Object.values(messages).forEach((msgArray, index) => {
        msgArray.forEach((msg, innerIndex) => {
          setTimeout(() => toast.error(msg), (index + innerIndex) * 300);
        });
      });
    } else if (Array.isArray(messages)) {
      messages.forEach((msg, index) => {
        setTimeout(() => toast.error(msg), index * 300);
      });
    } else {
      toast.error(messages);
    }
    return
  }
  toast.success(result.message);
  resetForm();
    
}

</script>


<style scoped>
.admin-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
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
  border-color: #007bff;
  outline: none;
}

.slug-field {
  display: flex;
  gap: 10px;
}

.slug-button {
  padding: 0 15px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.slug-button:hover {
  background: #e5e5e5;
}

.file-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.file-input {
  padding: 8px 0;
}

.file-name {
  padding: 5px 10px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.color-picker {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-input {
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #ddd;
  cursor: pointer;
}

.toggle-field {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toggle-input {
  width: 18px;
  height: 18px;
}

.toggle-label {
  margin-bottom: 0;
  cursor: pointer;
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
  background: #007bff;
  border: 1px solid #007bff;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-save:hover {
  background: #0069d9;
}
</style>