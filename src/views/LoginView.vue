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
            <label class="font-semibold" for="email">Email Address</label>
            <input
              class="border border-slate-300 rounded-md px-3 py-2 focus:border-[#5E42D3] focus:outline-[#5E42D3]"
              placeholder="Enter your email"
              type="email"
              id="email"
              v-model="email"
              required
            />
          </div>
          <div class="flex flex-col mb-5 gap-2">
            <label class="font-semibold" for="password">Password</label>
            <input
              class="border border-slate-300 rounded-md px-3 py-2 focus:border-[#5E42D3] focus:outline-[#5E42D3]"
              placeholder="Enter your password"
              type="password"
              id="password"
              v-model="password"
              required
            />
          </div>
          <span v-if="isEmailValidate" class="text-sm text-red-600"
            >Invalid email or password</span
          >
          <button
            type="submit"
            class="mt-5 bg-[#5E42D3] text-center w-full text-white h-10 rounded-md cursor-pointer active:scale-95 transition-transform duration-150"
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
    <div
      v-if="showModal"
      class="bg-slate-500/50 fixed inset-0 z-10 flex justify-center items-center"
    >
      <ConfirmationDialog
        :header="header"
        :subHeader="subHeader"
        routerUrl="dashboard"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ConfirmationDialog from "@/components/SuccessModal.vue";
import { getUserData } from "@/services/userServices";
import { ref } from "vue";
import { useRouter } from "vue-router";

const header = "Login Successfully!";
const subHeader = "You have successfully logged into your account.";

const router = useRouter();
const showModal = ref<boolean>(false);
const email = ref<string | null>(null);
const password = ref<string | null>(null);
const isEmailValidate = ref<boolean>(false);

const moveToRegister = () => {
  router.push("/register");
};

const handleSubmit = async () => {
  const response = await getUserData();

  const user = response.find(
    (user: { email: string; password: string }) =>
      user.email === email.value && user.password === password.value
  );

  if (user) {
    console.log("Login successful");
    isEmailValidate.value = false;
    showModal.value = true;
  } else {
    console.log("Invalid email or password");
    isEmailValidate.value = true;
  }
};
</script>
