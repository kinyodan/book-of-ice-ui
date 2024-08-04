<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      :short-title="$t('sidebar.shortTitle')"
      :title="$t('sidebar.title')"
    >
      <template slot-scope="props" slot="links">
        <sidebar-item
            :link="{
            name: $t('sidebar.binaryTrading'),
            icon: 'tim-icons icon-notes',
            path: '/reports/daily-reports'
          }"
        >
        </sidebar-item>        
      </template> 
    </side-bar>

    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>

      <div
        :class="{ content: !isFullScreenRoute }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <nuxt></nuxt>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!isFullScreenRoute"></content-footer>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';
  import SidebarShare from '@/components/Layout/SidebarSharePlugin';
  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }
  import DashboardNavbar from '@/components/Layout/DashboardNavbar.vue';
  import ContentFooter from '@/components/Layout/ContentFooter.vue';
  import DashboardContent from '@/components/Layout/Content.vue';
  import { SlideYDownTransition, ZoomCenterTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent,
      SlideYDownTransition,
      ZoomCenterTransition,
      SidebarShare,
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    computed: {
      isFullScreenRoute() {
        return this.$route.path === '/maps/full-screen'
      }
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      },
      initScrollbar() {
        let docClasses = document.body.classList;
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          // if we are on windows OS we activate the perfectScrollbar function
          initScrollbar('sidebar');
          initScrollbar('main-panel');
          initScrollbar('sidebar-wrapper');

          docClasses.add('perfect-scrollbar-on');
        } else {
          docClasses.add('perfect-scrollbar-off');
        }
      }
    },
    mounted() {
      this.initScrollbar();
    }
  };
</script>
<style lang="scss">
 
  .btn-link{
    color: #e14eca !important;
  }
  .sidebar .nav li > a{
    font-size: 0.72475rem !important;
  }

  .card-user-01 .card-body {
    min-height: 240px !important;
    max-height: 440px !important;
    overflow: scroll !important;
    overflow-x: hidden !important;
  }

  $scaleSize: 0.95;
  @keyframes zoomIn95 {
    from {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
    to {
      opacity: 1;
    }
  }

  .main-panel .zoomIn {
    animation-name: zoomIn95;
  }

  @keyframes zoomOut95 {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
  }

  .main-panel .zoomOut {
    animation-name: zoomOut95;
  }

  .el-table__row{
    color: black !important;
  }

  .el-table__row a{
    color: black !important;
  }

  $base-margin: 20px;
$blue: #345F90;
$tab-height: 35px;
$tab-border-radius: 35px;


.container{
	width: 75%;
	margin: 0rem 0rem;
}
h2{
	color: $blue;
	font-size: 24px;
	line-height: 1.25;
	font-family: "Roboto Slab", serif;
	margin-top: $base-margin;
	margin-bottom: $base-margin;
}


.tab-slider--nav{
	width: 100%;
	float: left;
	// margin-bottom: $base-margin;
}
.tab-slider--tabs{
	display: block;
	float: left;
	margin: 0;
	padding: 0;
	list-style: none;
	position: relative;
	border-radius: $tab-border-radius;
	overflow: hidden;
	background: #fff;
	height: $tab-height;
	user-select: none; 
	&:after{
		content: "";
		width: 50%;
		background: $blue;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transition: all 250ms ease-in-out;
		border-radius: $tab-border-radius;
	}
	&.slide:after{
		left: 50%;
	}
}

.tab-slider--trigger {
	font-size: 12px;
	line-height: 1;
	font-weight: bold;
	color: $blue;
	text-transform: uppercase;
	text-align: center;
	padding: 11px $base-margin;
	position: relative;
	z-index: 2;
	cursor: pointer;
	display: inline-block;
	transition: color 250ms ease-in-out;
	user-select: none; 
	&.active {
		color: #fff;
	}
}
.tab-slider--body{
	margin-bottom: $base-margin;
}


</style>
