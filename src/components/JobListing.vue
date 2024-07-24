<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Button from './ui/button/Button.vue'

import type { Job } from '../types'
import { computed, ref } from 'vue'

const props = defineProps<{
  job: Job
}>()

const showFullDescription = ref(false)

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

const truncatedDescription = computed(() => {
  let description = props.job.description

  if (!showFullDescription.value) {
    description = description.substring(0, 90) + '...'
  }

  return description
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardDescription class="capitalize">{{ job.type }}</CardDescription>

      <CardTitle>{{ job.title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <div>
        {{ truncatedDescription }}
        <p class="text-green-800 cursor-pointer" @click="toggleDescription">
          {{ showFullDescription ? 'less' : 'see more' }}
        </p>
      </div>
      <p class="mt-10 text-green-800 font-bold">{{ job.salary }} / Year</p></CardContent
    >
    <CardFooter>
      <div class="flex justify-between w-full items-center">
        <p>{{ job.location }}</p>
        <Button>
          <RouterLink :to="`/jobs/${job.id}`">Read more</RouterLink>
        </Button>
      </div>
    </CardFooter>
  </Card>
</template>
