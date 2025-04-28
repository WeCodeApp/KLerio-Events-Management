<template>
  <div class="flex flex-col items-center bg-[#f9fafb] min-h-screen">
    <div class="w-full max-w-5xl flex justify-end mt-6">
      <button
        class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-100 transition"
        @click="showProfileDialog = true"
      >
        <img src="@/assets/group.svg" alt="Profile" class="w-6 h-6" />
        <span class="font-medium text-slate-700">Profile</span>
      </button>
    </div>
    <div class="flex items-center justify-between w-full max-w-5xl my-5">
      <div class="flex items-center gap-5">
        <div
          class="w-12 h-12 bg-[#5E42D3] rounded-full flex items-center justify-center cursor-pointer"
        >
          <img src="@/assets/group.svg" alt="" />
        </div>
        <div>
          <h1 class="font-bold text-2xl text-slate-800">My Events</h1>
          <p class="text-slate-500">
            Organize and oversee your events effortlessly
          </p>
        </div>
      </div>
      <div>
        <button
          class="relative bg-[#5E42D3] text-center px-5 text-white h-10 rounded-md cursor-pointer active:scale-95 transition-transform duration-150"
          @click="moveToCreateEvent"
        >
          <div class="flex gap-2 items-center justify-center">
            <img src="@/assets/add.svg" alt="add" class="filter invert" />
            <span>Create Event</span>
          </div>
        </button>
      </div>
    </div>

    <div
      v-if="showProfileDialog"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <div class="bg-white rounded-lg shadow-lg p-8 min-w-[320px]">
        <div class="flex flex-col items-center">
          <img src="@/assets/group.svg" alt="Profile" class="w-16 h-16 mb-4" />
          <div class="font-bold text-lg mb-2">Your Profile</div>
          <div class="text-slate-600 mb-6">{{ userEmail || "No email" }}</div>
          <button
            class="w-full bg-[#5E42D3] text-white py-2 rounded-md mb-2 hover:bg-[#4b36a8] transition"
            @click="handleLogout"
          >
            Logout
          </button>
          <button
            class="w-full bg-slate-100 text-slate-700 py-2 rounded-md hover:bg-slate-200 transition"
            @click="showProfileDialog = false"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <div class="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
      <!-- Total Events -->
      <div
        class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex flex-col items-center"
      >
        <div class="text-3xl font-bold text-[#5E42D3]">{{ totalEvents }}</div>
        <div class="mt-2 text-slate-600 font-medium">Total Events</div>
      </div>
      <!-- Total Participants -->
      <div
        class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex flex-col items-center"
      >
        <div class="text-3xl font-bold text-slate-500">
          {{ totalParticipants }}
        </div>
        <div class="mt-2 text-slate-600 font-medium">Total Participants</div>
      </div>
      <!-- Upcoming Events -->
      <div
        class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex flex-col items-center"
      >
        <div class="text-3xl font-bold text-slate-500">
          {{ upcomingEvents }}
        </div>
        <div class="mt-2 text-slate-600 font-medium">Upcoming Events</div>
      </div>
    </div>

    <div class="w-full max-w-5xl">
      <div
        class="rounded-md overflow-hidden border border-slate-200 pb-5 px-3 bg-white w-full"
      >
        <table class="w-full table-fixed">
          <colgroup>
            <col style="width: 30%" />
            <col style="width: 40%" />
            <col style="width: 20%" />
            <col style="width: 15%" />
          </colgroup>
          <thead>
            <tr class="text-slate-700">
              <th
                class="py-3 px-4 border-b border-b-slate-300 font-semibold text-left"
              >
                Event
              </th>
              <th
                class="py-3 px-4 border-b border-b-slate-300 font-semibold text-left"
              >
                Participants
              </th>
              <th
                class="py-3 px-4 border-b border-b-slate-300 font-semibold text-left"
              >
                Event Date
              </th>
              <th
                class="py-3 px-4 border-b border-b-slate-300 font-semibold text-left"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(event, idx) in eventData"
              :key="idx"
              class="hover:bg-slate-50 transition"
            >
              <td class="py-4 px-4 border-b border-b-slate-300 align-top">
                <div>
                  <div class="font-medium text-slate-800 text-base">
                    {{ event.eventName }}
                  </div>
                  <div class="text-slate-500 text-sm mt-1">
                    {{ event.eventDescription }}
                  </div>
                </div>
              </td>
              <td class="py-4 px-4 border-b border-b-slate-300 align-top">
                <span v-if="Array.isArray(event.participants)">
                  <span
                    v-for="(p, pIdx) in event.participants"
                    :key="pIdx"
                    class="inline-block bg-slate-100 rounded-full px-3 py-1 text-slate-700 text-xs mr-1 mb-1"
                    style="border: 1px solid #cbd5e1"
                  >
                    {{ p }}
                  </span>
                </span>
                <span v-else>
                  {{ event.participants }}
                </span>
              </td>
              <td
                class="py-4 px-4 border-b border-b-slate-300 text-slate-700 align-top"
              >
                {{ formatDate(event.eventDate) }}
              </td>
              <td class="py-4 px-4 border-b border-b-slate-300 align-top">
                <div class="flex gap-3">
                  <button
                    class="hover:bg-slate-100 p-2 rounded transition cursor-pointer"
                    title="Edit"
                    @click="editEvent(event.id)"
                  >
                    <img
                      src="@/assets/pencil_box.svg"
                      alt="Edit"
                      class="w-5 h-5"
                    />
                  </button>
                  <button
                    class="hover:bg-red-50 p-2 rounded transition cursor-pointer"
                    title="Delete"
                    @click="confirmDelete(event.id)"
                  >
                    <img
                      src="@/assets/delete.svg"
                      alt="Delete"
                      class="w-5 h-5"
                    />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="eventData.length === 0">
              <td colspan="4" class="py-6 text-center text-slate-400">
                No events found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  deleteEventData,
  getEventData,
  type CreateEventType,
} from "@/services/eventServices";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const eventData = ref<CreateEventType[]>([]);
const showProfileDialog = ref(false);
const userEmail = ref<string | null>(null);

const totalEvents = computed(() => eventData.value.length);

const totalParticipants = computed(() =>
  eventData.value.reduce(
    (sum, event) =>
      sum + (Array.isArray(event.participants) ? event.participants.length : 0),
    0
  )
);

const upcomingEvents = computed(() => {
  const today = new Date();
  return eventData.value.filter((event) => {
    if (!event.eventDate) return false;
    return new Date(event.eventDate) >= today;
  }).length;
});

// Helper to get cookie value by name
function getCookie(name: string): string | null {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return value ? decodeURIComponent(value.split("=")[1]) : null;
}

// Helper to delete cookie by name
function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

const handleLogout = () => {
  deleteCookie("user_email");
  showProfileDialog.value = false;
  router.push("/login");
};

const moveToCreateEvent = () => {
  router.push("/create-event");
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const fetchEvents = async () => {
  try {
    const response = await getEventData();
    eventData.value = response;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

const editEvent = (eventId: string | undefined) => {
  if (eventId) {
    router.push({ path: "/create-event", query: { id: eventId } });
  }
};

const confirmDelete = (eventId: string | undefined) => {
  if (window.confirm("Are you sure you want to delete the event?")) {
    deleteEvent(eventId);
  }
};

const deleteEvent = async (eventId: string | undefined) => {
  try {
    await deleteEventData(eventId);
    eventData.value = eventData.value.filter((event) => event.id !== eventId);
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};

onMounted(() => {
  fetchEvents();
  userEmail.value = getCookie("user_email");
});
</script>
