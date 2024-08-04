<template>
  <div class="websocket-mesages">
    <h1>WebSocket Chat</h1>
    <div>
      <h2>Messages</h2>
      <ul>
        <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import ApiService from '~/services/ApiService';

export default {
  name: 'TradeResult',
  props: {
    clientId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const socket = ref(null);
    const message = ref('');
    const messages = ref([]);

    const connectWebSocket = () => {
      socket.value = new WebSocket(`ws://localhost:8000/ws/${props.clientId}`);

      socket.value.onopen = () => {
        console.log('WebSocket connection established');
      };

      socket.value.onmessage = (event) => {
        console.log('WebSocket onmessage established');
        const newMessage = event.data;
        messages.value.push(newMessage);
      };

      socket.value.onclose = () => {
        console.log('WebSocket connection closed');
      };

      socket.value.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };

    onMounted(() => {
      connectWebSocket();
    });

    onUnmounted(() => {
      if (socket.value) {
        socket.value.close();
      }
    });

    watch(() => props.clientId, () => {
      if (socket.value) {
        socket.value.close();
      }
      connectWebSocket();
    });

    return {
      message,
      messages,
      //sendMessage,
    };
  },
};
</script>

<style scoped>
.websocket-mesages {
  color: black !important;

}
.card h1, .card h2, .card h3, .card h4, .card h5, .card h6, .card p{
    color: black;
  }
/* Add any necessary styles here */
</style>
