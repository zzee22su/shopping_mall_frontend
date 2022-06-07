<template>
  <div class="mb-3 row">
    <nav class="navMenu" :style="[userStyles.navMenu, menuDirection, menuWidth] ">
      <template v-if="links.length">
      <h1>My Account </h1>
      <router-link :to="link.url" v-for="link in links"  :key="link.id">{{ link.text }}</router-link>
      </template>
      <slot v-else />
    </nav>
    <router-view/>

  </div>
</template>

<script>
import styles from '@/assets/sass/variables.scss'
import utilities from '@/js/utilities'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'slider',
  props: {
    width: {
      type: Number,
      required: false,
      default: 250
    },
    format: {
      type: String,
      required: false,
      default: 'overlay',
      validator: (value) => ['push', 'full', 'overlay'].indexOf(value) > -1
    },
    direction: {
      type: String,
      required: false,
      default: 'left',
      validator: (value) => ['left', 'right'].indexOf(value) > -1
    },
    opacity: {
      type: Number,
      required: false,
      default: 0
    },
    links: {
      type: Array,
      required: false,
      default: () => ([])
    },
    customStyles: {
      type: Object,
      required: false,
      deep: true,
      default: () => ({})
    }
  },
  data () {
    const defaultStyles = {
      'navMenu': {},
      'navIcon': {}
    }
    return {
      styles: styles,
      menuWidth: {
        'width': 0
      },
      userStyles: Object.assign({}, defaultStyles, this.customStyles)
    }
  },
  watch: {
    customStyles () {
      this.userStyles = Object.assign({}, this.userStyles, this.customStyles)
    }
  },
  computed: {
    menuDirection () {
      return this.direction === 'right'
        ? { 'right': 0 }
        : { 'left': 0 }
    },
    iconDirection () {
      return { 'float': this.direction }
    },
    app () {
      return document.getElementById('app')
    }
  },
  mounted () {
    if (!this.app) {
      console.warn(`[Slider] The format was set to '${this.format}', but there is no element with an id 'app'. Add id='app' to the element to move.`)
    }
    this.openMenu ();
  },

  methods: {
    openMenu () {
      const width = `${this.width}px`
      const marginDirection = `margin-${this.direction}`
      this.menuWidth = {
        'width': this.format === 'full' ? '100%' : width
      }
      if (this.app && this.format === 'push') {
        this.app.style[marginDirection] = width
        this.app.style.transition = `${marginDirection} .5s`
      }
       if (this.opacity) {
         document.body.style.background = utilities.hexToRGB(styles['background-color'], this.opacity)
       }
    },
  }
}
</script>

<style lang="scss" scoped></style>