<script setup>
  const links = [
    {
      text: "Mail",
      link: "mailto:mohanadfrid733@gmail.com",
      icon: "mdi-gmail",
    },
    { text: "Number", link: "tel:01003295446", icon: "mdi-phone" },
    {
      text: "Linked in",
      link: "https://www.linkedin.com/in/mohanad-farid-485182218",
      icon: "mdi-linkedin",
    },
    {
      text: "Githup",
      link: "https://github.com/Mohanadfarid",
      icon: "mdi-github",
    },
  ];
</script>

<template>
  <div
    class="w-100 d-flex justify-center align-center"
    style="min-height: 90vh"
  >
    <v-row class="d-flex justify-center">
      <v-col cols="11" md="8" xl="6">
        <v-card
          class="bg-purple-lighten-1 elevation-10 animate__animated animate__fadeInUp"
          title="Memo Master"
          subtitle="Created by Mohanad Farid"
          variant="tonal"
        >
          <v-card-text>
            This project was developed for practice purposes using the following
            technologies: Vue
            <v-icon>mdi-vuejs</v-icon>
            , Vue Router
            <v-icon>mdi-vuejs</v-icon>
            , Pinia
            <v-icon>mdi-fruit-pineapple</v-icon>
            , and Vuetify
            <v-icon>mdi-vuetify</v-icon>
            .
          </v-card-text>
          <v-card-actions>
            <v-btn class="text-purple font-weight-bold" variant="elevated">
              Contact me via
              <v-menu activator="parent">
                <v-list>
                  <a
                    v-for="(link, index) in links"
                    :key="index"
                    :value="index"
                    class="text-purple contact-link"
                    :href="link.link"
                    target="_blank"
                  >
                    <v-list-item class="text-purple" :append-icon="link.icon">
                      <v-list-item-title>
                        {{ link.text }}
                      </v-list-item-title>
                    </v-list-item>
                  </a>
                </v-list>
              </v-menu>
            </v-btn>
            <v-btn class="font-weight-bold" variant="elevated">
              <a
                class="portfolio-link text-purple"
                href="https://mohanad-farid.netlify.app/"
                target="_blank"
              >
                more projects
              </a>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style>
  .portfolio-link,
  .contact-link {
    text-decoration: none;
  }
</style>
