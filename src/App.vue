<template>
  <v-app>
    <TheMessage />
    <TheHeader />
    <v-main>
      <v-container>
        <router-view
          class="my-5"
        />
      </v-container>
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import TheFooter from '@/components/TheFooter';
import TheHeader from '@/components/TheHeader';
import TheMessage from '@/components/TheMessage';

export default {
  name: 'App',
  components: {
    TheFooter,
    TheHeader,
    TheMessage,
  },
};
</script>

<style lang="scss">
textarea {
  margin-bottom: 10px;
}
</style>
