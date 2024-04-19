<template>
  <div class="pagination-controls">
    <button class="pagination-button" @click="changePage(1)" :disabled="currentPage === 1">
      <i class="fas fa-angle-double-left"></i>
    </button>
    <button class="pagination-button" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
      <i class="fas fa-angle-left"></i>
    </button>

    <template v-if="totalPages <= 7">
      <button v-for="page in totalPages" :key="page" class="pagination-button" @click="changePage(page)"
        :class="{ active: currentPage === page }">
        {{ page }}
      </button>
    </template>

    <template v-else>
      <button v-if="currentPage > 4" class="pagination-button" @click="changePage(1)">1</button>
      <span v-if="currentPage > 4" class="pagination-ellipsis">...</span>

      <button v-for="page in visiblePages" :key="page" class="pagination-button" @click="changePage(page)"
        :class="{ active: currentPage === page }">
        {{ page }}
      </button>

      <span v-if="currentPage < totalPages - 3" class="pagination-ellipsis">...</span>
      <button v-if="currentPage < totalPages - 3" class="pagination-button" @click="changePage(totalPages)">{{ totalPages }}</button>
    </template>

    <button class="pagination-button" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
      <i class="fas fa-angle-right"></i>
    </button>
    <button class="pagination-button" @click="changePage(totalPages)" :disabled="currentPage === totalPages">
      <i class="fas fa-angle-double-right"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const visiblePages = computed(() => {
      const startPage = Math.max(props.currentPage - 2, 1);
      const endPage = Math.min(startPage + 4, props.totalPages);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    });

    const changePage = (page: number) => {
      emit('change', page);
    };

    return {
      visiblePages,
      changePage,
    };
  },
});
</script>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  background-color: #f0f0f0;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-button:hover {
  background-color: #e0e0e0;
}

.pagination-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pagination-button.active {
  background-color: #007bff;
  color: #fff;
}

.pagination-ellipsis {
  margin: 0 5px;
  color: #777;
}
</style>