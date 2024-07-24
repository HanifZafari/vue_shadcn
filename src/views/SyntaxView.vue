<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const name = ref('Tasks')
const tasks = ref(['task one', 'task two', 'task three'])
const newTask = ref('')

const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push(newTask.value)
    newTask.value = ''
  }
}

const delTask = (id: number) => {
  tasks.value.splice(id, 1)
}

// onMounted(async () => {
//   try {
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos')
//     const data = await response.json()
//     tasks.value = data.map((task: any) => task.title)
//   } catch (error) {
//     console.error(error)
//   }
// })
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl">{{ name }}</h1>

    <form @submit.prevent="addTask">
      <div class="flex w-full max-w-sm items-center gap-1.5 mt-10">
        <Input type="text" name="newTask" id="newTask" v-model="newTask" placeholder="Add Task" />
        <Button type="submit"> Add </Button>
      </div>
    </form>

    <Table class="mt-10">
      <TableHeader>
        <TableRow>
          <TableHead> Task Name </TableHead>
          <TableHead class="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(task, index) in tasks" :key="task">
          <TableCell class="font-medium">
            {{ task }}
          </TableCell>

          <TableCell class="text-right">
            <Button @click="delTask(index)">x</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
