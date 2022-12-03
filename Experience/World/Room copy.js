/* 
渲染相关
*/
import * as THREE from 'three'
import GSAP from 'gsap'
import Experience from '../Experience'

export default class Room {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.room = this.resources.items.room
    this.actualRoom = this.room.scene

    this.lerp = {
      current: 0,
      targetX: 0,
      targetY: 0,
      ease: 0.1,
    }

    this.setModel()
    this.setAnimation()
    this.onMouseMove()
  }

  setModel() {
    // 添加灯光的影子
    this.actualRoom.children.forEach(child => {
      child.castShadow = true
      child.receiveShadow = true
      // 物体是集合
      if (child instanceof THREE.Group) {
        child.children.forEach(groupChild => {
          groupChild.castShadow = true
          groupChild.receiveShadow = true
        })
      }
      // 给摆件添加玻璃材质
      if (child.name === '摆件玻璃罩') {
        child.material = new THREE.MeshPhysicalMaterial()
        child.material.roughness = 0
        child.material.color.set(0x549dd2)
        child.material.ior = 3
        child.material.transmission = 1
        child.material.opacity = 1
      }
      // 给屏幕添加视频
      if (child.name === '屏幕') {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        })
      }
    })

    this.scene.add(this.actualRoom)
    this.actualRoom.scale.set(0.1, 0.1, 0.1)
  }
  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom)
    this.clean = this.mixer.clipAction(
      this.room.animations[8],
    )
    this.clean.play()
  }
  onMouseMove() {
    window.addEventListener('mousemove', e => {
      // x 轴
      // -1  ~  1
      this.rotationX =
        (((e.clientX - window.innerWidth / 2) * 2) /
          window.innerWidth) *
        0.1
      this.lerp.targetX = this.rotationX

      // // y 轴
      // // -1  ~  1
      // this.rotationY =
      //   (((e.clientY - window.innerHeight / 2) * 2) /
      //     window.innerHeight) *
      //   0.1
      // this.lerp.targetY = this.rotationY
    })
  }
  resize() {}

  update() {
    // 动画的基准时间
    this.mixer.update(this.time.delta / 10000)
    // 房子偏转动画
    this.actualRoom.rotation.y = this.lerp.current
    // this.actualRoom.rotation.y = this.lerp.current
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.targetX,
      // this.lerp.targetY,
      this.lerp.ease,
    )
  }
}
