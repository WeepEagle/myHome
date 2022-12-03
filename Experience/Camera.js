/* 
相机相关
*/

import * as THREE from 'three'
import Experience from './Experience'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    // 透视相机
    this.createPerspectiveCamera()
    // 正交相机
    this.createOrthographicCamera()
    // 控制器(鼠标拖动)
    this.setOrbitControls()
  }
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      15,
      this.sizes.aspect,
      0.1,
      1000,
    )
    this.scene.add(this.perspectiveCamera)
    this.perspectiveCamera.position.set(0, 15, 15)
    // this.perspectiveCamera.rotation.x = -Math.PI / 6
  }
  /* 
  构造器
    OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
    left — 摄像机视锥体左侧面。
    right — 摄像机视锥体右侧面。
    top — 摄像机视锥体上侧面。
    bottom — 摄像机视锥体下侧面。
    near — 摄像机视锥体近端面。
    far — 摄像机视锥体远端面。
  */
  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -50,
      50,
    )

    this.orthographicCamera.position.set(0, 5.65, 10)
    this.orthographicCamera.rotation.x = -Math.PI / 6

    // this.orthographicCamera = new THREE.PerspectiveCamera(
    //   35,
    //   this.sizes.aspect,
    //   0.1,
    //   1000,
    // )

    this.scene.add(this.orthographicCamera)

    // 显示透视相机
    // this.helper = new THREE.CameraHelper(
    //   this.orthographicCamera,
    // )
    // this.scene.add(this.helper)

    // 每个网格的尺寸
    // const size = 20
    // 网格的个数(20 X 20)
    // const divisions = 20
    // 网格
    // const gridHelper = new THREE.GridHelper(size, divisions)
    // this.scene.add(gridHelper)
    // 坐标轴
    // const axesHelper = new THREE.AxesHelper(10)
    // this.scene.add(axesHelper)
  }
  setOrbitControls() {
    this.controls = new OrbitControls(
      this.perspectiveCamera,
      this.canvas,
    )
    this.controls.enableDamping = true
    // 镜头开启拉远拉进
    this.controls.enableZoom = false
  }
  resize() {
    // 更新透视相机
    this.perspectiveCamera.aspect = this.sizes.aspect
    this.perspectiveCamera.updateProjectionMatrix()
    // 更新正交相机
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2
    this.orthographicCamera.top = this.sizes.frustrum / 2
    this.orthographicCamera.bottom =
      -this.sizes.frustrum / 2
    this.orthographicCamera.updateProjectionMatrix()
  }

  update() {
    this.controls.update()

    // 透视相机相关
    // this.helper.matrixWorldNeedsUpdate = true
    // this.helper.update()
    // this.helper.position.copy(
    //   this.orthographicCamera.position,
    // )
    // this.helper.rotation.copy(
    //   this.orthographicCamera.rotation,
    // )
  }
}
