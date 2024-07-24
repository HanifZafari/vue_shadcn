<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const route = useRoute()

const mode = (route.params.mode as string) || 'add'
const jobId = (route.params.id as string) || ''

const formSchema = toTypedSchema(
  z.object({
    jobType: z.enum(['full-time', 'part-time', 'internship', 'remote']),
    jobName: z.string().min(2).max(100),
    jobDescription: z.string().min(10),
    salary: z.enum(['$50k-$100k', '$100k-$150k', '$150k-$200k', '$200+']),
    location: z.string().min(2).max(100),
    companyName: z.string().min(2).max(100),
    companyDescription: z.string().min(10).max(500),
    email: z.string().email(),
    phone: z.string().optional()
  })
)

interface JobDetails {
  jobType: 'full-time' | 'part-time' | 'internship' | 'remote'
  jobName: string
  jobDescription: string
  salary: '$50k-$100k' | '$100k-$150k' | '$150k-$200k' | '$200+'
  location: string
  companyName: string
  companyDescription: string
  email: string
  phone?: string
}

const defaultValues = ref<Partial<JobDetails>>({
  jobType: 'full-time',
  jobName: '',
  jobDescription: '',
  salary: '$50k-$100k',
  location: '',
  companyName: '',
  companyDescription: '',
  email: '',
  phone: ''
})

const { handleSubmit, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: defaultValues.value
})

onMounted(async () => {
  if (mode === 'edit' && jobId) {
    try {
      const res = await fetch(`http://localhost:4777/jobs/${jobId}`)
      const job = await res.json()
      setValues({
        jobType: job.type,
        jobName: job.title,
        jobDescription: job.description,
        salary: job.salary,
        location: job.location,
        companyName: job.company.name,
        companyDescription: job.company.description,
        email: job.company.contactEmail,
        phone: job.company.contactPhone || ''
      })
    } catch (error) {
      console.error('Failed to fetch job data:', error)
    }
  }
})

const onSubmit = handleSubmit(async (values) => {
  const jobData = {
    title: values.jobName,
    type: values.jobType,
    description: values.jobDescription,
    location: values.location,
    salary: values.salary,
    company: {
      name: values.companyName,
      description: values.companyDescription,
      contactEmail: values.email,
      contactPhone: values.phone
    }
  }

  try {
    const url =
      mode === 'edit' ? `http://localhost:4777/jobs/${jobId}` : 'http://localhost:4777/jobs'

    const method = mode === 'edit' ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jobData)
    })

    const data = await res.json()
    await router.push(`/jobs/${data.id}`)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <section class="container">
    <div class="mt-10 flex flex-col items-center">
      <h1
        class="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      >
        {{ mode === 'add' ? 'Add Job' : 'Edit Job' }}
      </h1>
      <form class="space-y-6 w-96" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="jobType" required>
          <FormItem>
            <FormLabel>Job Type</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Select a Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="full-time"> Full-time </SelectItem>
                    <SelectItem value="part-time"> Part-time </SelectItem>
                    <SelectItem value="internship"> Internship </SelectItem>
                    <SelectItem value="remote"> Remote </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="jobName">
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input type="text" placeholder="eg. Frontend Vue Developer" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="jobDescription">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Job Description" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="salary" required>
          <FormItem>
            <FormLabel>Salary Range</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Select a Salary range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="$50k-$100k"> $50k-$100k </SelectItem>
                    <SelectItem value="$100k-$150k"> $100k-$150k</SelectItem>
                    <SelectItem value="$150k-$200k"> $150k-$200k </SelectItem>
                    <SelectItem value="$200+"> $200+ </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="location">
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Company Location" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Company Info -->

        <FormField v-slot="{ componentField }" name="companyName">
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Company Name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="companyDescription">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Describe what your company does" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Email address for applicants"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="phone">
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Optional phone number for applicants"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  </section>
</template>
