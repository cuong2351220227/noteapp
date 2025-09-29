<template>
  <v-card class="note-card" :class="{ 'pinned': note.is_pinned }">
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <v-card-title class="text-h6 mb-2">{{ note.title }}</v-card-title>
        <v-btn
          icon
          @click="$emit('toggle-pin', note)"
          :color="note.is_pinned ? 'warning' : 'grey'"
        >
          <v-icon>mdi-pin</v-icon>
        </v-btn>
      </div>

      <v-card-subtitle class="mb-3">
        {{ formatDate(note.created_at) }}
      </v-card-subtitle>

      <div class="note-content mb-4">
        {{ note.content }}
      </div>

      <div v-if="note.categories && note.categories.length" class="mb-2">
        <v-chip-group>
          <v-chip
            v-for="category in note.categories"
            :key="category.id"
            size="small"
            color="primary"
            variant="outlined"
          >
            {{ category.name }}
          </v-chip>
        </v-chip-group>
      </div>

      <div v-if="note.tags && note.tags.length">
        <v-chip-group>
          <v-chip
            v-for="tag in note.tags"
            :key="tag.id"
            size="small"
            color="secondary"
            variant="outlined"
          >
            {{ tag.name }}
          </v-chip>
        </v-chip-group>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        icon
        variant="text"
        color="primary"
        @click="$emit('edit', note)"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        icon
        variant="text"
        color="error"
        @click="$emit('delete', note.id)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'NoteCard',
  
  props: {
    note: {
      type: Object,
      required: true
    }
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.note-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.note-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.note-card.pinned {
  border: 2px solid rgba(255, 193, 7, 0.5);
}

.note-content {
  max-height: 150px;
  overflow: hidden;
  position: relative;
}

.note-content::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: linear-gradient(transparent, white);
}
</style>