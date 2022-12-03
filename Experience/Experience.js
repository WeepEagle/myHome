/* 
THREE 的入口程序(单例设计模式)
*/

import * as THREE from 'three'

import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Resources from './Utils/Resources'
import assets from './Utils/assets'

import Camera from './Camera'
import Renderer from './Renderer'
import Theme from './Theme'

import World from './World/World'
import Controls from './World/Controls'
import Preloader from './Preloader'

export default class Experience {
  static instance

  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance
    }
    Experience.instance = this
    this.canvas = canvas
    this.sizes = new Sizes()
    this.time = new Time()
    this.resources = new Resources(assets)
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.theme = new Theme()
    this.world = new World()
    this.preloader = new Preloader()
    this.preloader.on('enablecontrols', () => {
      this.controls = new Controls()
    })

    this.time.on('update', () => {
      this.update()
    })
    this.sizes.on('resize', () => {
      this.resize()
    })
    // console.log(this)
  }
  update() {
    this.camera.update()
    this.renderer.update()
    this.world.update()
    this.renderer.resize()
  }
  resize() {
    this.camera.resize()
    this.renderer.resize()
    this.world.resize()
  }
}
