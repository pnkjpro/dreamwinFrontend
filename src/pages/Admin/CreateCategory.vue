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
          <span class="text-xs text-blue-500">Note: Icon size 200x200 and should not exceed 200 Kb for better frontload.</span>
        </div>
      </div>
      
      <!-- Form Actions -->
      <div class="form-actions">
        <button type="button" @click="resetForm" class="btn-cancel">Cancel</button>
        <button type="submit" class="btn-save"
        :disabled="adminStore.loading"
        >{{ adminStore.loading ? 'Saving...' : 'Save Category'}}</button>
      </div>
    </form>
  </div>
  <h2 class="form-title mt-10">Reorder Categories</h2>
<div class="sortable-list">
  <div
    v-for="(cat, index) in sortableCategories"
    :key="cat.id"
    class="sortable-item"
  >
    <span>{{ index + 1 }}. {{ cat.name }}</span>
    <div class="sort-controls">
      <button @click="moveUp(index)" :disabled="index === 0">⬆️</button>
      <button @click="moveDown(index)" :disabled="index === sortableCategories.length - 1">⬇️</button>
    </div>
  </div>
</div>

<!-- Save Order Button -->
<div class="form-actions">
  <button class="btn-save" @click="updateSorting">Save Order</button>
</div>

</template>

<script setup>
import { computed, watch, onMounted, ref } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import { storeToRefs } from 'pinia';
import { object } from 'yup';
import { useToast } from 'vue-toastification';
import { useMainStore } from '@/stores/mainStore';

const initialCategory = {
      name: '',
      description: '',
      icon: '',
      // icon_color: '#007bff',
      // banner_image: '',
      display_order: 1
    }

const category = ref({...initialCategory});

const resetForm = () => {
  Object.assign(category.value, JSON.parse(JSON.stringify(initialCategory)));
}

const adminStore = useAdminStore();
const mainStore = useMainStore();
const { categories } = storeToRefs(mainStore);
const { } = storeToRefs(adminStore);
const toast = useToast();


// =================== update sorting ==================
const sortableCategories = ref([]);

watch(categories, (newVal) => {
  sortableCategories.value = Array.isArray(newVal) ? [...newVal] : [];
}, { immediate: true });

const moveUp = (index) => {
  if (index > 0) {
    const items = sortableCategories.value;
    [items[index - 1], items[index]] = [items[index], items[index - 1]];
  }
}

const moveDown = (index) => {
  if (index < sortableCategories.value.length - 1) {
    const items = sortableCategories.value;
    [items[index], items[index + 1]] = [items[index + 1], items[index]];
  }
}

const updateSorting = async () => {
  const sortedPayload = sortableCategories.value.map((cat, idx) => ({
    id: cat.id,
    display_order: idx + 1
  }));

  const result = await adminStore.updateCategorySorting(sortedPayload);
  if (result.success) {
    toast.success("Category order updated!");
    mainStore.fetchCategories();
  } else {
    toast.error("Failed to update sorting.");
  }
};


// =====================================================

const handleBannerUpload = (event) => {
  const file = event.target.files[0];
  if(file){
    category.value.bannerFile = file;
    category.value.banner_image = file.name;
  }
}

onMounted(()=>{
  mainStore.fetchCategories();
})

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
    // formData.append('icon_color', category.value.icon_color);
    
    if (category.value.iconFile) {
      formData.append('icon', category.value.iconFile);
    }
    
    // if (category.value.bannerFile) {
    //   formData.append('banner_image', category.value.bannerFile);
    // }

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
.sortable-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f9f9f9;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.sort-controls button {
  margin-left: 4px;
  padding: 4px 8px;
  font-size: 14px;
  cursor: pointer;
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