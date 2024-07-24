<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Button from '@/components/ui/button/Button.vue'
</script>

<template>
  <div class="flex items-center justify-center md:h-[calc(100vh-20rem)] mt-10">
    <Card class="text-center py-10">
      <CardHeader>
        <CardDescription><v-icon name="hi-solid-location-marker" class="mr-2" /></CardDescription>

        <CardTitle
          class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
          >404</CardTitle
        >
        <CardDescription>Page not found</CardDescription>
      </CardHeader>
      <CardContent> Sorry, we coudn't find the page you're looking for </CardContent>
      <CardFooter>
        <Button class="flex flex-grow mx-20">
          <router-link to="/">Go back home</router-link>
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
