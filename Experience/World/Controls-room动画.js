/* 
渲染相关
*/
import * as THREE from 'three'
import GSAP from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Experience from '../Experience'

export default class Room {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.sizes = this.experience.sizes
    this.camera = this.experience.camera
    this.room = this.experience.world.room.actualRoom
    GSAP.registerPlugin(ScrollTrigger)

    this.setPath()
  }
  setPath() {
    this.timeline = new GSAP.timeline()
    // room 随滚轮向右边移动
    this.timeline.to(this.room.position, {
      x: () => this.sizes.width * 0.00175,
      scrollTrigger: {
        trigger: '.first-move',
        markers: true,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        // 实时刷新
        invalidateOnRefresh: true,
      },
    })
  }

  resize() {}

  update() {}
}
