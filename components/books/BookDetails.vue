<template>
  <card>
    <span v-if="loading_characters">
    <loading-panel></loading-panel>
    </span>
    <div v-else>
    <h5 slot="header" class="title">{{book_details.name}}</h5>
      <div class="row">
        <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Authors </h5>
        <span v-for="author in book_details.authors" class="col-md-8">
          <div>  {{author}}</div>
        </span>
        <div class="col-md-8">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">ISBN: <span class="col-md-8"> {{book_details.isbn }}</span></h5>
        </div>
        <div class="col-md-8">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Publisher: <span class="col-md-8"> {{book_details.publisher }}</span></h5>
        </div>

        <div class="col-md-8">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Released: <span class="col-md-8"> {{$moment(book_details.released) }}</span></h5>
        </div>

      </div>
      <hr style="background: white">
      <div class="row">
        <div class="col-md-8">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Media Type: <span class="col-md-8">{{book_details.mediaType}}</span> </h5>
        </div>
        <div class="col-md-6">
          <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Number Of Pages: <span class="col-md-8">{{book_details.numberOfPages}}</span> </h5>
        </div>
      </div>
    <hr style="background: white">

      <div class="row">
          <div class="col-md-6">
            <h5 slot="header" class="title" style="padding-left: 20px;padding-right: 20px;">Country: <span class="col-md-8">{{book_details.country}}</span> </h5>
          </div>
      </div>
    <hr style="background: white">
    </div>
    <h5>Book characters</h5>
    <span v-if="loading_characters">
    <loading-panel></loading-panel>
    </span>
    <div class="" v-else><book-details-table :book_details="book_details" :characters_list="characters_list" > </book-details-table></div>

  </card>

</template>
<script>
import BookDetailsTable from "~/components/books/BookDetailsTable";
import EditProfileForm from "~/components/UserProfile/EditProfileForm";
import UserCard from "~/components/UserProfile/UserCard";
import LoadingPanel from "~/components/LoadingPanel";

export default {
  props:[
    'book_details',
    'characters_list',
    'loading_characters',
  ],
  components: {
    EditProfileForm,
    UserCard,
    BookDetailsTable,
    LoadingPanel,
  },
  data() {
    return {
      user: {
        company: 'Creative Code Inc.',
        username: 'michael23',
        email: '',
        firstName: 'Mike',
        lastName: 'Andrew',
        address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
        city: 'New York',
        country: 'USA',
        postalCode: '',
        aboutMe: `Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.`
      }
    };
  },
  created() {
  },
  methods: {
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.user));
    }
  }
};
</script>
<style></style>
