<script setup lang="ts">
defineProps({
  subsection: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>
    <h3 v-if="subsection.title">{{ subsection.title }}</h3>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div
        v-for="item in subsection.tiles"
        :key="item.id"
        :class="'fr-col-12 ' + subsection.class"
      >
        <a class="item-card" :href="item.url">
          <div class="item-title">{{ item.name }}</div>
          <div class="item-description">
            {{ item.description }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-title {
  text-align: left;
  font-size: 20px;
}
.item-card {
  display: block;
  height: 100%;
  border: 1px solid #ebebeb;
  padding: 20px;
  text-align: left;
  min-height: 190px;
  border-bottom: 3px solid var(--border-action-high-blue-france);
  color: inherit;
  text-decoration: none;
}
.item-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  min-height: 50px;
}
.item-card:hover {
  cursor: pointer;
  background-color: #ebebeb;
}
.item-card:focus-visible {
  outline: 2px solid var(--border-action-high-blue-france);
  outline-offset: 2px;
}
</style>
