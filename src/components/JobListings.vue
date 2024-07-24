<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import JobListing from './JobListing.vue'
import type { Job } from '../types'
import Button from './ui/button/Button.vue'

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false
  }
})

interface State {
  jobs: Job[]
  isLoading: boolean
}

const state = reactive<State>({
  jobs: [],
  isLoading: false
})

onMounted(async () => {
  try {
    state.isLoading = true
    const response = await axios.get('http://localhost:4777/jobs')

    state.jobs = response.data
  } catch (error) {
    console.error('Error fetching jobs', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <section>
    <h1
      class="scroll-m-20 mb-16 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center"
    >
      Browse Jobs
    </h1>

    <!-- Loader -->
    <div v-if="state.isLoading" class="text-center text-gray-500 py-6">Loading ...</div>

    <!-- Cards -->
    <div class="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      <JobListing
        v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
        :key="job.id"
        :job="job"
      />
    </div>
    <div v-if="showButton" class="text-center py-10">
      <Button><router-link to="/jobs">View All Jobs</router-link></Button>
    </div>
  </section>
</template>
