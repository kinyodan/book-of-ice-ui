<template>
  <card class="card-user">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="javascript:void(0)">
        <img class="avatar" src="img/emilyz.jpg" alt="..." />
        <h5 class="title">{{character_details.name}}</h5>
      </a>
      <p class="description" v-for="title in character_details.titles">
        {{title}}
      </p>
    </div>
    <p></p>
    <div class="card-description">

    </div>

    <div slot="footer" class="button-container">
      <base-button class="btn-facebook" icon round>
        <i class="fab fa-facebook"></i>
      </base-button>
      <base-button class="btn-twitter" icon round>
        <i class="fab fa-twitter"></i>
      </base-button>
      <base-button class="btn-google" icon round>
        <i class="fab fa-google-plus"></i>
      </base-button>
    </div>
  </card>
</template>
<script>
export default {
  props:[
      'character_details'
  ]
};
</script>
<style></style>
