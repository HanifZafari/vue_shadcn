<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Become a Vue Dev'
  },
  subtitle: {
    type: String,
    default: 'Find the Vue job that fits your skills and needs'
  }
})
</script>

<template>
  <div className="relative overflow-hidden py-14 lg:py-32">
    <div aria-hidden="true" className="flex absolute -top-96 start-1/2 transform -translate-x-1/2">
      <!-- Gradient -->
      <div
        className="bg-gradient-to-r from-background/20 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]"
      ></div>
      <div
        className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background"
      ></div>
    </div>
    <div className="relative z-10 ">
      <div className="container">
        <div className="max-w-2xl text-center mx-auto">
          <div className="max-w-2xl">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {{ title }}
            </h1>
          </div>

          <div className="mt-5 max-w-3xl">
            <p className="text-xl text-muted-foreground">
              {{ subtitle }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
