<template>
  <div class="admin-form-container">
    <h2 class="form-title">{{ isEditing ? 'Edit Category' : 'Add New Category' }}</h2>
    
    <form @submit.prevent="saveCategory" class="category-form">
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
      
      <!-- Slug Field -->
      <div class="form-group">
        <label for="slug">Slug</label>
        <div class="slug-field">
          <input 
            id="slug"
            v-model="category.slug"
            type="text"
            class="form-control"
            required
          />
          <button type="button" @click="generateSlug" class="slug-button">Generate</button>
        </div>
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
      
      <!-- Active Status Field -->
      <div class="form-group">
        <div class="toggle-field">
          <input 
            id="is_active"
            v-model="category.is_active"
            type="checkbox"
            class="toggle-input"
          />
          <label for="is_active" class="toggle-label">Active</label>
        </div>
      </div>
      
      <!-- Display Order Field -->
      <div class="form-group">
        <label for="display_order">Display Order</label>
        <input 
          id="display_order"
          v-model="category.display_order"
          type="number"
          class="form-control"
          min="1"
        />
      </div>
      
      <!-- Form Actions -->
      <div class="form-actions">
        <button type="button" @click="resetForm" class="btn-cancel">Cancel</button>
        <button type="submit" class="btn-save">Save Category</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CategoryForm',
  props: {
    initialCategory: {
      type: Object,
      default: () => ({
        name: '',
        slug: '',
        description: '',
        icon: '',
        icon_color: '#007bff',
        banner_image: '',
        is_active: 1,
        display_order: 1
      })
    }
  },
  data() {
    return {
      category: { ...this.initialCategory },
      isEditing: false
    }
  },
  created() {
    // Check if we're editing an existing category
    this.isEditing = !!this.initialCategory.name
    
    // Create a deep copy of the initial category
    this.category = JSON.parse(JSON.stringify(this.initialCategory))
  },
  methods: {
    generateSlug() {
      // Generate slug from name - convert to lowercase and replace spaces with hyphens
      if (this.category.name) {
        this.category.slug = this.category.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
      }
    },
    handleIconUpload(event) {
      if (event.target.files.length > 0) {
        this.category.icon = event.target.files[0].name
        // In a real app, you would upload the file to the server here
      }
    },
    handleBannerUpload(event) {
      if (event.target.files.length > 0) {
        this.category.banner_image = event.target.files[0].name
        // In a real app, you would upload the file to the server here
      }
    },
    saveCategory() {
      // Emit save event with category data
      this.$emit('save', { ...this.category })
    },
    resetForm() {
      // Reset form to initial values or clear if adding new
      if (this.isEditing) {
        this.category = JSON.parse(JSON.stringify(this.initialCategory))
      } else {
        this.category = {
          name: '',
          slug: '',
          description: '',
          icon: '',
          icon_color: '#007bff',
          banner_image: '',
          is_active: 1,
          display_order: 1
        }
      }
      
      // Emit cancel event
      this.$emit('cancel')
    }
  }
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