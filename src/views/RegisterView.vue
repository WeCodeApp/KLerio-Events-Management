<template>
  <div class="h-screen flex justify-center items-center bg-[#f9fafb]">
    <div class="border border-slate-300 rounded-md bg-white p-8 w-[450px]">
      <div class="text-center mb-5 space-y-1">
        <h1 class="text-2xl font-bold">Sign Up</h1>
        <p class="text-md text-slate-600">Create your PSA Event Account</p>
      </div>
      <div>
        <form @submit.prevent="handleSubmit">
          <div class="flex flex-col mb-4 gap-2">
            <label for="email">First Name</label>
            <input
              class="border border-slate-300 rounded-md px-3 py-2 focus:border-[#5E42D3] focus:outline-[#5E42D3]"
              placeholder="Enter your first name"
              type="text"
              id="firstName"
              v-model="userData.firstName"
              required
            />
          </div>
          <div class="flex flex-col mb-4 gap-2">
            <label for="email">Last Name</label>
            <input
              class="border border-slate-300 rounded-md px-3 py-2 focus:border-[#5E42D3] focus:outline-[#5E42D3]"
              placeholder="Enter your last name"
              type="text"
              id="lastName"
              v-model="userData.lastName"
              required
            />
          </div>
          <div class="flex flex-col mb-4 gap-2">
            <label for="email">Email Address</label>
            <input
              class="border border-slate-300 rounded-md px-3 py-2 focus:border-[#5E42D3] focus:outline-[#5E42D3]"
              placeholder="Enter your email"
              type="email"
              id="email"
              v-model="userData.email"
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
              v-model="userData.password"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-[#5E42D3] text-center w-full text-white h-10 rounded-md"
          >
            Sign Up
          </button>

          <div class="text-center mt-8 text-slate-600">
            <h1>
              Already have an account?
              <span class="text-[#5E42D3] cursor-pointer" @click="moveToLogin"
                >Log In</span
              >
            </h1>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

type UserData = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
};

const router = useRouter();
const userData = reactive<UserData>({
  firstName: null,
  lastName: null,
  email: null,
  password: null,
});

const moveToLogin = () => {
  router.push("/login");
};

const handleSubmit = () => {
  console.log(userData);
};
</script>
