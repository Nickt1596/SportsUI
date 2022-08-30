<template>
  <q-page>
    <q-card flat>
      <q-card-section class="q-pl-lg">
        <div class="text-h6">Plans and Pricing</div>
      </q-card-section>
      <q-separator />
    </q-card>
    <div class="q-pa-lg">
      <div class="q-gutter-y-lg">
        <div class="row justify-center">
          <div class="col">
            <q-card>
              <q-card-section class="text-center">
                <div class="text-h6">Organization</div>
                <div class="text-subtitle">For large multi league organizations</div>
              </q-card-section>
              <q-card-section class="text-center q-pt-none">
                <div class="text-h6">$59/Month</div>
              </q-card-section>
              <q-card-section class="text-center q-pt-none">
                <q-btn
                  color="primary"
                  text-color="white"
                  label="Get Started"
                />
              </q-card-section>
            </q-card>
          </div>
          <div class="col q-pl-lg">
            <q-card>
              <q-card-section class="text-center">
                <div class="text-h6">League</div>
                <div class="text-subtitle">For Single Sport Leagues</div>
              </q-card-section>
              <q-card-section class="text-center q-pt-none">
                <div class="text-h6">$39/Month</div>
              </q-card-section>
              <q-card-section class="text-center q-pt-none">
                <q-btn
                  color="primary"
                  text-color="white"
                  label="Get Started"
                />
              </q-card-section>
            </q-card>
          </div>
          <div class="col q-pl-lg">
            <q-card>
              <q-card-section class="text-center">
                <div class="text-h6">Team</div>
                <div class="text-subtitle">For single teams</div>
              </q-card-section>
              <q-card-section class="text-center q-pt-none">
                <div class="text-h6">$9.99/Month</div>
              </q-card-section>
              <q-card-section class="text-center q-pt-none">
                <q-btn
                  color="primary"
                  text-color="white"
                  label="Get Started"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
<!--    Home Page-->
  </q-page>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>
