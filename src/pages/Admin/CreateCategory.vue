<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Category Management</h1>
        <p class="mt-2 text-gray-600">Create, edit, and manage quiz categories</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Create/Edit Category Form -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900">
              {{ isEditing ? 'Edit Category' : 'Add New Category' }}
            </h2>
            <button
              v-if="isEditing"
              @click="cancelEdit"
              class="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Name Field -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input 
                id="name"
                v-model="category.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter category name"
                required
              />
            </div>
            
            <!-- Description Field -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                v-model="category.description"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                rows="3"
                placeholder="Enter category description"
              ></textarea>
            </div>
            
            <!-- Icon Field -->
            <div>
              <label for="icon" class="block text-sm font-medium text-gray-700 mb-2">
                Category Icon
              </label>
              <div class="space-y-2">
                <div class="flex items-center space-x-3">
                  <label class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    Choose File
                    <input 
                      id="icon"
                      type="file"
                      @change="handleIconUpload"
                      class="hidden"
                      accept="image/*"
                    />
                  </label>
                  <span class="text-sm text-gray-600">
                    {{ category.icon || 'No file chosen' }}
                  </span>
                </div>
                <p class="text-xs text-blue-600">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Recommended: 200x200px, max 200KB for optimal performance
                </p>
              </div>
            </div>
            
            <!-- Form Actions -->
            <div class="flex justify-end space-x-3 pt-4">
              <button 
                type="button" 
                @click="resetForm" 
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {{ isEditing ? 'Cancel' : 'Reset' }}
              </button>
              <button 
                type="submit" 
                :disabled="adminStore.loading"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg v-if="adminStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ adminStore.loading ? 'Saving...' : (isEditing ? 'Update Category' : 'Create Category') }}
              </button>
            </div>
          </form>
        </div>

        <!-- Categories List -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Existing Categories</h2>
          
          <div class="space-y-3 max-h-96 overflow-y-auto">
            <div
              v-for="(cat, index) in sortableCategories"
              :key="cat.id"
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center space-x-3">
                <span class="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {{ index + 1 }}
                </span>
                <div>
                  <h3 class="font-medium text-gray-900">{{ cat.name }}</h3>
                  <p class="text-sm text-gray-500" v-if="cat.description">{{ cat.description }}</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-2">
                <!-- Sort Controls -->
                <div class="flex space-x-1">
                  <button 
                    @click="moveUp(index)" 
                    :disabled="index === 0"
                    class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move up"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                  </button>
                  <button 
                    @click="moveDown(index)" 
                    :disabled="index === sortableCategories.length - 1"
                    class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move down"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex space-x-1">
                  <button 
                    @click="editCategory(cat)"
                    class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                    title="Edit category"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button 
                    @click="confirmDeleteCategory(cat)"
                    class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete category"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Save Order Button -->
          <div class="mt-6 pt-4 border-t border-gray-200">
            <button 
              @click="updateSorting"
              :disabled="adminStore.loading"
              class="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg v-if="adminStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Save Category Order
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
          </div>
          <div class="text-center">
            <h3 class="text-lg font-medium text-gray-900 mb-2">Delete Category</h3>
            <p class="text-sm text-gray-500 mb-4">
              Are you sure you want to delete "<span class="font-medium">{{ categoryToDelete?.name }}</span>"? This action cannot be undone.
            </p>
          </div>
          <div class="flex justify-end space-x-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="deleteCategory"
              :disabled="adminStore.loading"
              class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg v-if="adminStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted, ref } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import { useMainStore } from '@/stores/mainStore';

const initialCategory = {
  name: '',
  description: '',
  icon: '',
  display_order: 1
}

const category = ref({...initialCategory});
const isEditing = ref(false);
const editingCategoryId = ref(null);
const showDeleteModal = ref(false);
const categoryToDelete = ref(null);

const resetForm = () => {
  Object.assign(category.value, JSON.parse(JSON.stringify(initialCategory)));
  isEditing.value = false;
  editingCategoryId.value = null;
}

const cancelEdit = () => {
  resetForm();
}

const adminStore = useAdminStore();
const mainStore = useMainStore();
const { categories } = storeToRefs(mainStore);
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

// =================== CRUD Operations ==================

const editCategory = (cat) => {
  category.value = {
    name: cat.name,
    description: cat.description || '',
    icon: '', // Reset file input
    display_order: cat.display_order || 1
  };
  isEditing.value = true;
  editingCategoryId.value = cat.id;
  
  // Scroll to form
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const confirmDeleteCategory = (cat) => {
  categoryToDelete.value = cat;
  showDeleteModal.value = true;
}

const deleteCategory = async () => {
  if (!categoryToDelete.value) return;
  
  const result = await adminStore.deleteCategory(categoryToDelete.value.id);
  
  if (result.success) {
    toast.success(result.message || "Category deleted successfully!");
    mainStore.fetchCategories();
  } else {
    toast.error(result.message || "Failed to delete category.");
  }
  
  showDeleteModal.value = false;
  categoryToDelete.value = null;
}

onMounted(() => {
  mainStore.fetchCategories();
})

const handleIconUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validate file size (200KB = 200 * 1024 bytes)
    if (file.size > 200 * 1024) {
      toast.error("File size should not exceed 200KB");
      event.target.value = '';
      return;
    }
    
    category.value.iconFile = file;
    category.value.icon = file.name;
  }
}

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('name', category.value.name);
  formData.append('description', category.value.description);
  
  if (category.value.iconFile) {
    formData.append('icon', category.value.iconFile);
  }

  let result;
  
  if (isEditing.value) {
    result = await adminStore.updateCategory(editingCategoryId.value, formData);
  } else {
    result = await adminStore.createCategory(formData);
  }

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
    return;
  }
  
  toast.success(result.message || `Category ${isEditing.value ? 'updated' : 'created'} successfully!`);
  resetForm();
  mainStore.fetchCategories();
}

</script>