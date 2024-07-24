<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { text: 'Home', path: '/' },
  { text: 'Jobs', path: '/jobs' },
  { text: 'Add Jobs', path: '/jobs/add' }
]

const isActive = computed(() => (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  if (path === '/jobs') {
    return route.path === '/jobs' || (route.path.startsWith('/jobs/') && route.path !== '/jobs/add')
  }
  return route.path === path
})
</script>
<template>
  <nav class="bg-primary">
    <div class="container py-4 flex flex-wrap items-center justify-between">
      <h1 class="text-2xl font-semibold text-secondary">
        <RouterLink to="/">Vue Jobs</RouterLink>
      </h1>
      <ul class="flex gap-10 text-lg font-medium text-gray-700">
        <li
          v-for="link in links"
          :key="link.path"
          :class="[
            'cursor-pointer transition-all rounded-xl ease-in-out',
            isActive(link.path)
              ? ' bg-gray-900 text-secondary outline px-2' // if active
              : 'text-secondary' // if inactive
          ]"
        >
          <RouterLink
            :to="link.path"
            class="block md:px-3 py-2"
            :class="{ 'hover:text-slate-200': !isActive(link.path) }"
          >
            {{ link.text }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
