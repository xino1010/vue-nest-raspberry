<template>
  <div class="card">
    <div class="content">
      <div class="row">
        <div class="col-xs-5">
          <div v-bind:class="['icon-big', light ? 'icon-success' : 'icon-gray', 'text-center']">
            <i v-bind:class="{'fas fa-lightbulb': light, 'far fa-lightbulb': !light}"></i>
          </div>
        </div>
        <div class="col-xs-7">
          <div class="numbers">
            <p>Light status</p>
            <div class="btn-group btn-toggle">
              <button
                  v-bind:class="['btn btn-sm btn-success', light ? 'active' : '']"
                  :disabled="light"
                  @click="toggleLight"
              >
                ON
              </button>
              <button
                  v-bind:class="['btn btn-sm btn-default', !light ? 'active' : '']"
                  :disabled="!light"
                  @click="toggleLight"
              >
                OFF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Action, Getter} from 'vuex-class';
  import {Component, Vue} from 'vue-property-decorator';
  import {DashboardTypes} from '../types/dashboard.types';

  @Component({
    name: 'light-state',
  })
  export default class LightState extends Vue {

    @Action(DashboardTypes.Light, {namespace: DashboardTypes.Store}) public toggleLight!: () => void;
    @Getter(DashboardTypes.Light, {namespace: DashboardTypes.Store}) public light!: boolean;

  }
</script>

<style scoped>

</style>