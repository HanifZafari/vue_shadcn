<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Button from './ui/button/Button.vue'
</script>

<template>
  <div class="container mb-20 grid gap-10 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>For Developers</CardTitle>
        <CardDescription>Browse our Vue jobs and start your career today </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <RouterLink to="/jobs">Browse Jobs</RouterLink>
        </Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>For Employers </CardTitle>
        <CardDescription>List your job to find the perfect developer for the role </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <RouterLink to="/jobs/add">Add Job</RouterLink>
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
