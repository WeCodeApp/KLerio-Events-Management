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
            <label class="font-semibold" for="email">First Name *</label>
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
            <label class="font-semibold" for="email">Last Name *</label>
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
            <label class="font-semibold" for="email">Email Address *</label>
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
            <label class="font-semibold" for="password">Password *</label>
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
            class="bg-[#5E42D3] text-center w-full text-white h-10 rounded-md cursor-pointer active:scale-95 transition-transform duration-150"
            @click="handleSubmit"
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
    <div
      v-if="showModal"
      class="bg-slate-500/50 fixed inset-0 z-10 flex justify-center items-center"
    >
      <ConfirmationDialog
        :header="header"
        :subHeader="subHeader"
        routerUrl="login"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ConfirmationDialog from "@/components/SuccessModal.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { postUserData } from "@/services/userServices";

type UserData = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
};

const header = "Registration Successfully!";
const subHeader =
  "Your account has been successfully created. You can now log in to your account.";

const router = useRouter();
const showModal = ref<boolean>(false);
const userData = reactive<UserData>({
  firstName: null,
  lastName: null,
  email: null,
  password: null,
});

const moveToLogin = () => {
  router.push("/login");
};

const resetData = () => {
  userData.firstName = null;
  userData.lastName = null;
  userData.email = null;
  userData.password = null;
};

const handleSubmit = async () => {
  if (
    !userData.firstName ||
    !userData.lastName ||
    !userData.email ||
    !userData.password
  ) {
    console.warn("All fields are required.");
    return;
  }

  const data = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
  };

  try {
    await postUserData("http://localhost:3000/users", data);
    showModal.value = true;
    resetData();
  } catch (error) {
    console.error("Error during registration:", error);
  }
};
</script>
