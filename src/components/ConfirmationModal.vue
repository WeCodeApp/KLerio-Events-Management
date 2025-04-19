<template>
  <div
    class="bg-white w-[350px] gap-5 px-3 py-5 rounded-md shadow-lg flex flex-col justify-center items-center"
  >
    <div class="w-20">
      <img src="@/assets/success-animation.gif" alt="" />
    </div>
    <h1 class="text-2xl font-bold">Registration Successful</h1>
    <p class="text-slate-500 text-center text-md">
      Your account has been successfully created. You can now log in to your
      account.
    </p>
    <button
      class="bg-[#5E42D3] text-center w-14 text-white h-10 rounded-md cursor-pointer"
      @click="handleOk"
    >
      OK
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const handleOk = () => {
  router.push("/login");
};
</script>
