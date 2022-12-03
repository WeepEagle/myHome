/* 
渲染相关
*/
import * as THREE from 'three'
import GSAP from 'gsap'
import Experience from '../Experience'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'

export default class Room {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.room = this.resources.items.room
    this.actualRoom = this.room.scene
    this.roomChildren = {}
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    }
    this.lerpY = {
      current: 0,
      target: 0,
      ease: 0.1,
    }

    this.setModel()
    this.setAnimation()
    this.onMouseMove()
    this.setRectLight()
    // this.setSpotLight()
  }

  setModel() {
    // console.log(this.actualRoom)
    // 添加灯光的影子
    this.actualRoom.children.forEach(child => {
      // console.log(child);
      child.scale.set(0, 0, 0)
      this.roomChildren[child.name.toLowerCase()] = child
      child.castShadow = true
      child.receiveShadow = true
      // 物体是集合
      if (child instanceof THREE.Group) {
        child.children.forEach(groupChild => {
          groupChild.castShadow = true
          groupChild.receiveShadow = true
        })
      }
      // // 给摆件添加玻璃材质
      // if (child.name === '摆件玻璃罩') {
      //   child.material = new THREE.MeshPhysicalMaterial()
      //   child.material.roughness = 0
      //   child.material.color.set(0x549dd2)
      //   child.material.ior = 3
      //   child.material.transmission = 1
      //   child.material.opacity = 1
      // }
      // 给屏幕添加视频
      if (child.name === 'pinmu') {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        })
      }
      // 给窗户添加视频
      if (child.name === 'chuanghuboli') {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.window,
        })
      }
      // // 隐藏小地板 , 等到在放出来
      // if (child.name === 'Mini_Floor') {
      //   ;(child.position.x = -0.289),
      //     (child.position.z = 8.835)
      // }
      // // 隐藏邮筒 , 到时再放出来
      // if (child.name === 'Mailbox') {
      //   child.scale.set(0, 0, 0)
      // }

      // 小方块
      if (child.name == 'cube') {
        child.scale.set(1, 1, 1)
        child.position.set(0, -1.5, 0)
        child.rotation.y = Math.PI / 4
      }
    })

    this.scene.add(this.actualRoom)
    this.actualRoom.scale.set(0.1, 0.1, 0.1)
  }
  setRectLight() {
    // 发光的屏幕(平面光)
    const width = 0.7
    const height = 0.4
    const intensity = 5
    this.rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height,
    )
    this.rectLight.position.set(-4.71803, 9.3, -13.9658)
    this.rectLight.rotation.set(0, 3.92, 0)
    // this.rectLight.lookAt(0, 0, 0)
    this.actualRoom.add(this.rectLight)

    this.roomChildren['rectLight'] = this.rectLight

    // // 帮助你找到平面光
    // const rectLightHelper = new RectAreaLightHelper(
    //   this.rectLight,
    // )
    // this.rectLight.add(rectLightHelper)
  }

  setSpotLight() {
    const spotLight = new THREE.SpotLight(0xffffff)

    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x0000ff,
    })
    const targetObject = new THREE.Mesh(geometry, material)
    // const targetObject = new THREE.Object3D()
    // 目标
    targetObject.position.set(2.65, 5, -6)
    spotLight.target = targetObject
    this.actualRoom.add(targetObject)
    // 发光体
    spotLight.position.set(-4.71803, 9.5, -13.9658)
    // spotLight.map = new THREE.TextureLoader().load(url)

    spotLight.castShadow = true
    spotLight.power = 0.5
    spotLight.angle = 0.8

    // spotLight.shadow.mapSize.width = 10
    // spotLight.shadow.mapSize.height = 10

    // spotLight.shadow.camera.near = 0
    // spotLight.shadow.camera.far = 4
    // spotLight.shadow.camera.fov = 3
    this.actualRoom.add(spotLight)
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom)
    this.clean = this.mixer.clipAction(
      this.room.animations[10],
    )
    this.clean.play()
  }
  onMouseMove() {
    window.addEventListener('mousemove', e => {
      // x 轴
      // -1  ~  1
      this.rotation =
        (((e.clientX - window.innerWidth / 2) * 2) /
          window.innerWidth) *
        0.1
      this.lerp.target = this.rotation

      // y 轴
      // -1  ~  1
      this.rotationY =
        (((e.clientY - window.innerHeight / 2) * 2) /
          window.innerHeight) *
        0.05
      this.lerpY.target = this.rotationY
    })
  }
  resize() {}

  update() {
    // 动画的基准时间
    this.mixer.update(this.time.delta / 10000)

    // 房子偏转动画 横向
    this.actualRoom.rotation.y = this.lerp.current
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease,
    )

    // 房子偏转动画 竖向
    this.actualRoom.rotation.x = this.lerpY.current
    this.lerpY.current = GSAP.utils.interpolate(
      this.lerpY.current,
      this.lerpY.target,
      this.lerpY.ease,
    )
  }
}
