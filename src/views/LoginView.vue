<template>
  <div class="h-screen flex justify-center items-center bg-[#f9fafb]">
    <div class="border border-slate-300 rounded-md bg-white p-8 w-[450px]">
      <div class="text-center mb-5 space-y-1">
        <div class="flex justify-center mb-3">
          <img
            src="@/assets/calendar.svg"
            alt="calendar"
            class="bg-[#5E42D3] p-4 rounded-full"
          />
        </div>
        <h1 class="text-2xl font-bold">Welcome</h1>
        <p class="text-md text-slate-600">Sign in to your PSA Event Account</p>
      </div>
      <div>
        <form @submit.prevent="handleSubmit">
          <div class="flex flex-col mb-4 gap-2">
            <label for="email">Email Address</label>
            <input
              class="border border-slate-300 rounded-md px-3 py-2 focus:border-[#5E42D3] focus:outline-[#5E42D3]"
              placeholder="Enter your email"
              type="email"
              id="email"
              v-model="email"
              required
            />
          </div>
          <div class="flex flex-col mb-10 gap-2">
            <label for="password">Password</label>
            <input
              class="border border-slate-300 rounded-md px-3 py-2 focus:border-[#5E42D3] focus:outline-[#5E42D3]"
              placeholder="Enter your password"
              type="password"
              id="password"
              v-model="password"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-[#5E42D3] text-center w-full text-white h-10 rounded-md"
          >
            Log In
          </button>

          <div class="text-center mt-8 text-slate-600">
            <h1>
              Don't have an account?
              <span
                class="text-[#5E42D3] cursor-pointer"
                @click="moveToRegister"
                >Sign Up</span
              >
            </h1>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref<string | null>(null);
const password = ref<string | null>(null);

const moveToRegister = () => {
  router.push("/register");
};

const handleSubmit = () => {
  console.log(email.value, password.value);
};
</script>
