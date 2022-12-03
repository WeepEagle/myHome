/* 
渲染相关
*/
import * as THREE from 'three'
import GSAP from 'gsap'
import Experience from '../Experience'

export default class Floor {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    this.setFloor()
    this.setFloor2()
    this.setCircles()
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100)
    this.materail = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      // side: THREE.DoubleSide,
    })
    this.plane = new THREE.Mesh(
      this.geometry,
      this.materail,
    )
    this.plane.rotation.x = -Math.PI / 2
    this.plane.position.y = -0.3
    // 此物体显示投射的影子
    this.plane.receiveShadow = true
    this.scene.add(this.plane)
  }

  setFloor2() {
    this.geometry2 = new THREE.PlaneGeometry(100, 100)
    this.materail2 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      // side: THREE.DoubleSide,
    })
    this.plane2 = new THREE.Mesh(
      this.geometry2,
      this.materail2,
    )
    // this.plane.rotation.x = -Math.PI / 2
    this.plane2.position.z = -10
    // 此物体显示投射的影子
    this.plane2.receiveShadow = true
    this.scene.add(this.plane2)
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry(4, 64)
    const materail = new THREE.MeshStandardMaterial({
      color: 0xe5a1aa,
    })
    const materail2 = new THREE.MeshStandardMaterial({
      color: 0x8395cd,
    })
    const materail3 = new THREE.MeshStandardMaterial({
      color: 0x7ad0ac,
    })
    this.circleFirst = new THREE.Mesh(geometry, materail)
    this.circleSecond = new THREE.Mesh(geometry, materail2)
    this.circleThird = new THREE.Mesh(geometry, materail3)

    this.circleFirst.position.y = -0.29
    this.circleSecond.position.y = -0.28
    this.circleThird.position.y = -0.27
    this.circleFirst.scale.set(0, 0, 0)
    this.circleSecond.scale.set(0, 0, 0)
    this.circleThird.scale.set(0, 0, 0)
    this.circleFirst.rotation.x = -Math.PI / 2
    this.circleSecond.rotation.x = -Math.PI / 2
    this.circleThird.rotation.x = -Math.PI / 2
    this.circleFirst.receiveShadow = true
    this.circleSecond.receiveShadow = true
    this.circleThird.receiveShadow = true

    this.scene.add(
      this.circleFirst,
      this.circleSecond,
      this.circleThird,
    )
  }

  resize() {}

  update() {}
}
