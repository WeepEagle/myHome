/* 
渲染相关
*/

import * as THREE from 'three'
import Experience from './Experience'

export default class Renderer {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera

    this.setRenderer()
  }
  setRenderer() {
    this.renderer = new THREE.WebGL1Renderer({
      canvas: this.canvas,
      antialias: true,
    })
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.toneMapping = THREE.CineonToneMapping
    this.renderer.toneMappingExposure = 0.75
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setSize(
      this.sizes.width,
      this.sizes.height,
    )
    this.renderer.setPixelRatio(this.sizes.pixelRatio)
  }

  resize() {
    this.renderer.setSize(
      this.sizes.width,
      this.sizes.height,
    )
    this.renderer.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    // 整个屏幕(第一个屏幕)
    this.renderer.setViewport(
      0,
      0,
      this.sizes.width,
      this.sizes.height,
    )
    // 渲染场景 和 透视相机
    this.renderer.render(
      this.scene,
      this.camera.orthographicCamera,
      // this.camera.perspectiveCamera,
    )
    // // 第二个屏幕(右上角)
    // //.setScissorTest ( boolean : Boolean ) : undefined
    // // 启用或禁用剪裁检测. 若启用，则只有在所定义的裁剪区域内的像素才会受之后的渲染器影响。
    // this.renderer.setScissorTest(true)
    // // .setViewport ( x : Integer, y : Integer, width : Integer, height : Integer ) : undefined
    // // 将视口大小设置为(x, y)到 (x + width, y + height).
    // this.renderer.setViewport(
    //   this.sizes.width - this.sizes.width / 3,
    //   this.sizes.height - this.sizes.height / 3,
    //   this.sizes.width / 3,
    //   this.sizes.height / 3,
    // )

    // // .setScissor ( x : Integer, y : Integer, width : Integer, height : Integer ) : undefined
    // // 将剪裁区域设为(x, y)到(x + width, y + height) Sets the scissor area from
    // this.renderer.setScissor(
    //   this.sizes.width - this.sizes.width / 3,
    //   this.sizes.height - this.sizes.height / 3,
    //   this.sizes.width / 3,
    //   this.sizes.height / 3,
    // )

    // this.renderer.render(
    //   this.scene,
    //   this.camera.perspectiveCamera,
    // )

    // this.renderer.setScissorTest(false)
  }
}
