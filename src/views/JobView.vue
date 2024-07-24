<script setup lang="ts">
import type { Job } from '@/types'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Button from '@/components/ui/button/Button.vue'
import { Badge } from '@/components/ui/badge'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import NotFound from '@/components/NotFound.vue'

const route = useRoute()
const router = useRouter()

const jobId = route.params.id

const job = ref<Job | null>(null)

const isLoading = ref<boolean>(false)
const isError = ref<boolean>(false)

// modal
const isOpen = ref(false)

const toggleModal = () => {
  isOpen.value = true
}

const deleteJob = async () => {
  const url = `http://localhost:4777/jobs/${jobId}`

  console.log(url)

  const response = await fetch(url, {
    method: 'DELETE'
  })

  console.log('clicked me')

  if (response.ok) {
    router.push('/jobs')
  } else {
    console.error('Failed to delete job')
  }
}

const editJob = async (id: string) => {
  await router.push(`/jobs/edit/${id}`)
}

onMounted(async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`http://localhost:4777/jobs/${jobId}`)
    job.value = response.data
  } catch (error) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="isLoading" class="text-center text-gray-500 py-6">Loading ...</div>
  <!-- Breadcrumbs -->
  <Breadcrumb v-if="!isError" class="container pt-10">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/"> Home </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/Jobs"> Jobs </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage> {{ job?.title }}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>

  <NotFound v-if="isError" />

  <!-- Content -->
  <div v-else class="container grid grid-cols-1 lg:grid-cols-3 pt-10 gap-10">
    <!-- Main Content -->
    <main class="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardDescription>{{ job?.type }}</CardDescription>
          <CardTitle
            class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
            >{{ job?.title }}</CardTitle
          >
        </CardHeader>
        <CardFooter>
          <v-icon name="hi-solid-location-marker" class="mr-2" />
          {{ job?.location }}
        </CardFooter>
      </Card>

      <Card class="mt-10">
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          {{ job?.description }}
        </CardContent>
        <CardFooter>
          <Badge class="mr-2">Salary</Badge>
          {{ job?.salary }} / Year
        </CardFooter>
      </Card>
    </main>

    <!-- Add your sidebar content here -->
    <aside class="bg-gray-100 p-4">
      <Card>
        <CardHeader>
          <CardDescription>Company Details</CardDescription>
          <CardTitle>{{ job?.company.name }}</CardTitle>
        </CardHeader>
        <CardContent>
          <v-icon name="hi-solid-location-marker" class="mr-2" />
          {{ job?.location }}

          <p class="mt-5">{{ job?.company.description }}</p>

          <div class="mt-5">
            <Badge class="mb-2">Email</Badge>

            <p class="bg">{{ job?.company.contactEmail }}</p>
          </div>
          <div class="mt-5">
            <Badge class="mb-2">Company Number</Badge>

            <p>{{ job?.company.contactPhone }}</p>
          </div>
        </CardContent>
        <CardFooter> </CardFooter>
      </Card>

      <Card class="mt-5">
        <CardHeader>
          <CardTitle>Manage Job</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-4">
          <Button
            variant="secondary"
            class="bg-green-700 hover:bg-green-700/80 text-white"
            @click="job?.id ? editJob(job.id) : null"
            >Edit Job</Button
          >
          <Button variant="destructive" @click="toggleModal">Delete Job</Button>
        </CardContent>
      </Card>
    </aside>

    <!-- Confrim Delete Modal -->
    <AlertDialog v-model:open="isOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click.prevent="deleteJob">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
