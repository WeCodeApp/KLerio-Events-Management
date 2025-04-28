<template>
  <div class="h-screen flex flex-col py-10 bg-[#f9fafb]">
    <div class="w-[50%] mx-auto">
      <div class="flex gap-10 mb-8 cursor-pointer">
        <img @click="moveToDashboard" src="@/assets/arrow_back.svg" alt="" />
        <div class="space-y-2">
          <h1 class="font-bold text-2xl text-slate-800">{{ eventId ? 'Update Event Details' : 'Create New Event' }}</h1>
          <p class="text-slate-500">
            Fill in the details below to create your event
          </p>
        </div>
      </div>
      <form @submit.prevent="handleSubmitEvent">
        <div class="bg-white border border-slate-200 rounded-md py-5 px-7">
          <div class="w-full flex flex-col mb-4 gap-2">
            <label for="event-name">Event Name *</label>
            <input
              v-model="eventData.eventName"
              class="border border-slate-300 rounded-md px-3 py-2 focus:border-[#5E42D3] focus:outline-[#5E42D3]"
              placeholder="Enter event name"
              type="text"
              id="event-name"
              required
            />
          </div>
          <div class="flex flex-col mb-4 gap-2">
            <label for="event-description">Description *</label>
            <textarea
              v-model="eventData.eventDescription"
              id="w3review"
              name="w3review"
              rows="4"
              cols="50"
              class="border border-slate-300 rounded-md px-3 py-2 focus:border-[#5E42D3] focus:outline-[#5E42D3]"
              placeholder="Enter event description"
              required
            />
          </div>
          <div class="flex space-x-5">
            <div class="w-full flex flex-col mb-4 gap-2">
              <label for="participants">Add Participants *</label>
              <div class="flex gap-2">
                <input
                  v-model="participantInput"
                  class="w-full border border-slate-300 rounded-md px-3 py-2 focus:border-[#5E42D3] focus:outline-[#5E42D3]"
                  placeholder="Enter participants"
                  type="text"
                  id="participants"
                />
                <button
                  type="button"
                  @click="addParticipant"
                  class="bg-slate-200 px-4 py-2 rounded-md cursor-pointer active:scale-95 transition-transform duration-150"
                >
                  <img src="@/assets/add.svg" alt="" />
                </button>
              </div>
              <div class="mt-2 flex flex-wrap gap-2">
                <div
                  v-for="(participant, idx) in eventData.participants"
                  :key="idx"
                  @click="removeParticipant(idx)"
                  class="cursor-pointer select-none bg-slate-100 rounded-full px-4 py-1 text-slate-700 text-sm transition hover:bg-red-200 hover:text-red-700"
                  style="border: 1px solid #cbd5e1"
                  title="Click to remove"
                >
                  {{ participant }}
                </div>
              </div>
            </div>
            <div class="flex flex-col mb-4 gap-2">
              <label for="event-date">Event Date *</label>
              <input
                v-model="eventData.eventDate"
                class="border border-slate-300 rounded-md px-3 py-2 focus:border-[#5E42D3] focus:outline-[#5E42D3]"
                type="date"
                id="event-date"
                required
              />
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="relative mt-5 bg-[#5E42D3] text-center px-5 text-white h-10 rounded-md cursor-pointer active:scale-95 transition-transform duration-150"
          >
            <div class="flex gap-2 items-center justify-center">
              <img src="@/assets/add.svg" alt="add" class="filter invert" />
              <span>Create Event</span>
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getEventById, postEventData, type CreateEventType } from "@/services/eventServices";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const eventId = route.query.id as string | undefined;
const router = useRouter();
const participantInput = ref<string>("");
const eventData = reactive<CreateEventType>({
  eventName: "",
  eventDescription: "",
  participants: [],
  eventDate: "",
});

const moveToDashboard = () => {
  router.push("/dashboard");
};

const addParticipant = () => {
  const name = participantInput.value.trim();
  if (name && !eventData.participants.includes(name)) {
    eventData.participants.push(name);
    participantInput.value = "";
  }
};

const removeParticipant = (index: number) => {
  eventData.participants.splice(index, 1);
};

const handleSubmitEvent = async (e: Event) => {
  e.preventDefault();
  console.log(eventData);
  if (eventData) {
    try {
      await postEventData(eventData);
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      router.push("/dashboard");
    }
  }
};

onMounted(async () => {
  // const eventId = route.query.id as string | undefined;
  if (eventId) {
    try {
      const event = await getEventById(eventId);
      if (event) {
        eventData.eventName = event.eventName;
        eventData.eventDescription = event.eventDescription;
        eventData.participants = event.participants;
        eventData.eventDate = event.eventDate;
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  }
});
</script>
