/* 
渲染相关
*/
import * as THREE from 'three'
import Experience from '../Experience'
import GSAP from 'gsap'
import GUI from 'lil-gui'

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // this.gui = new GUI({
    //   container: document.querySelector('.hero-main'),
    // })
    this.obj = {
      colorObj: {
        r: 0,
        g: 0,
        b: 0,
      },
      intensity: 3,
    }

    this.setSunlight()
    // this.setPointLight()
    // this.setGUI()
  }
  // 太阳光 , 主要的影子
  setSunlight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 5)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 20
    this.sunLight.shadow.mapSize.set(2048, 2048)
    this.sunLight.shadow.normalBias = 0.05

    // const helpr = new THREE.CameraHelper(
    //   this.sunLight.shadow.camera,
    // )
    // this.scene.add(helpr)

    this.sunLight.position.set(-1.5, 7, 3)
    this.scene.add(this.sunLight)
    // 环境光 , 影子颜色的深淡
    this.ambientLight = new THREE.AmbientLight('#ffffff', 2)
    this.scene.add(this.ambientLight)
  }
  switchTheme(theme) {
    if (theme === 'dark') {
      GSAP.to(this.sunLight.color, {
        r: 0.1725,
        g: 0.2313,
        b: 0.6862,
      })
      GSAP.to(this.ambientLight.color, {
        r: 0.1725,
        g: 0.2313,
        b: 0.6862,
      })
      GSAP.to(this.sunLight, {
        intensity: 0.1,
      })
      GSAP.to(this.ambientLight, {
        intensity: 0.8,
      })
    } else {
      GSAP.to(this.sunLight.color, {
        r: 1,
        g: 1,
        b: 1,
      })
      GSAP.to(this.ambientLight.color, {
        r: 1,
        g: 1,
        b: 1,
      })
      GSAP.to(this.sunLight, {
        intensity: 5,
      })
      GSAP.to(this.ambientLight, {
        intensity: 2,
      })
    }
  }

  setGUI() {
    this.gui.addColor(this.obj, 'colorObj').onChange(() => {
      this.sunLight.color.copy(this.obj.colorObj)
      this.ambientLight.color.copy(this.obj.colorObj)
    })
    this.gui
      .add(this.obj, 'intensity', 0, 10)
      .onChange(() => {
        this.sunLight.intensity = this.obj.intensity
        this.ambientLight.intensity = this.obj.intensity
      })
  }
  // setPointLight() {
  //   this.pointLight = new THREE.PointLight(0xffffff, 1, 10)
  //   this.pointLight.position.set(10, 10, 15)
  //   this.scene.add(this.pointLight)
  // }
  resize() {}

  update() {}
}
