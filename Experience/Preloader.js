/* 
渲染相关
*/
// import * as THREE from 'three'
import GSAP from 'gsap'
import Experience from './Experience'
import { EventEmitter } from 'events'
import convert from './Utils/covertDivsToSpans'

export default class Preloader extends EventEmitter {
  constructor() {
    super()
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes
    this.resources = this.experience.resources
    this.camera = this.experience.camera
    this.world = this.experience.world

    this.device = this.sizes.device

    this.sizes.on('switchdevice', device => {
      this.device = device
    })

    this.world.on('worldready', () => {
      this.setAssets()
      this.playIntro()
    })
  }
  setAssets() {
    convert(document.querySelector('.intro-text'))
    convert(document.querySelector('.hero-main-title'))
    convert(
      document.querySelector('.hero-main-description'),
    )
    convert(
      document.querySelector('.hero-second-subheading'),
    )
    convert(document.querySelector('.first-sub'))
    convert(document.querySelector('.second-sub'))
    this.room = this.experience.world.room.actualRoom
    this.roomChildren =
      this.experience.world.room.roomChildren
    // console.log(this.roomChildren)
  }
  firstIntro() {
    return new Promise(resolve => {
      this.timeline = GSAP.timeline()
      this.timeline.set('.animatedis', {
        y: 0,
        yPercent: 100,
      })
      this.timeline.to('.preloader', {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document
            .querySelector('.preloader')
            .classList.add('.hidden')
        },
      })

      if (this.device === 'desktop') {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: 'back.out(2.5)',
            duration: 0.7,
          })
          .to(this.room.position, {
            x: -1,
            ease: 'power1.out',
            duration: 0.7,
          })
      } else {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: 'back.out(2.5)',
            duration: 0.7,
          })
          .to(this.room.position, {
            z: -1,
            ease: 'power1.out',
            duration: 0.7,
          })
      }
      this.timeline
        .to('.intro-text .animatedis', {
          yPercent: 0,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        })
        .to(
          '.arrow ',
          {
            opacity: 1,
          },
          'arrow',
        )
        .to(
          '.toggle-bar ',
          {
            opacity: 1,
            onComplete: resolve,
          },
          'arrow',
        )
    })
  }
  secondIntro() {
    return new Promise(resolve => {
      this.secondTimeline = GSAP.timeline()

      this.secondTimeline
        .to(
          '.intro-text .animatedis',
          {
            yPercent: 100,
            stagger: 0.05,
            ease: 'back.in(1.7)',
          },
          'fadeout',
        )
        .to(
          '.arrow ',
          {
            opacity: 0,
          },
          'fadeout',
        )
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 1,
            ease: 'power1.out',
            // duration: 0.7,
          },
          'same',
        )
        .to(
          this.roomChildren.cube.rotation,
          {
            y: 3 * Math.PI + Math.PI / 4,
          },
          'same',
        )
        .to(
          this.roomChildren.cube.scale,
          {
            x: 20,
            y: 20,
            z: 20,
          },
          'same',
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            y: 6.5,
          },
          'same',
        )
        .to(
          this.roomChildren.cube.position,
          {
            x: 0.638,
            y: 8.561,
            z: 1.324,
          },
          'same',
        )

        .set(this.roomChildren.body.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .set(this.roomChildren.chuanghu.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .set(this.roomChildren.chuanghuboli.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .set(this.roomChildren.rectLight.scale, {
          x: 10,
          y: 10,
          z: 10,
        })
        .to(
          this.roomChildren.cube.position,
          {
            x: -1.638,
            y: -18.561,
            z: -50.324,
          },
          'small',
        )
        .to(
          this.roomChildren.cube.scale,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          'small',
        )
        .to(
          '.hero-main-title .animatedis',
          {
            yPercent: 0,
            stagger: 0.01,
            ease: 'back.out(1.7)',
          },
          'titleAnimation',
        )
        .to(
          '.hero-main-description .animatedis',
          {
            yPercent: 0,
            stagger: 0.01,
            ease: 'back.out(1.7)',
          },
          'titleAnimation',
        )
        .to(
          '.first-sub .animatedis',
          {
            yPercent: 0,
            stagger: 0.01,
            ease: 'back.out(1.7)',
          },
          'titleAnimation',
        )
        .to(
          '.second-sub .animatedis',
          {
            yPercent: 0,
            stagger: 0.01,
            ease: 'back.out(1.7)',
          },
          'titleAnimation',
        )
        // 弹出动画
        .to(this.roomChildren.chuanghu.scale, {
          x: 0,
          y: 0,
          z: 0,
          ease: 'power1.out',
          duration: 0.5,
        })
        .to(
          this.roomChildren.kongtiao.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          'tanchu1',
        )
        .to(
          this.roomChildren.zhuozi.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          'tanchu1',
        )
        .to(
          this.roomChildren.rectLight.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          'tanchu1',
        )
        .to(
          this.roomChildren.saodijieshouqi.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          'tanchu1',
        )

        .to(
          this.roomChildren.yizitui.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          'tanchu1',
        )
        // 弹出动画2
        .to(
          this.roomChildren.pinmuzhuji.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          'tanchu2',
        )
        .to(
          this.roomChildren.pinmu.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          'tanchu2',
        )
        .to(
          this.roomChildren.shubiaodian.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          'tanchu2',
        )
        .to(
          this.roomChildren.meigui.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          'tanchu2',
        )
        // 弹出动画3
        .to(
          this.roomChildren.jianpanshubiao.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          'tanchu3',
        )

        // 靠背 扫地机动画
        .to(
          this.roomChildren.saodiji.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(5)',
            duration: 0.5,
          },
          'chair',
        )

        .to(
          this.roomChildren.kaobei.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
          },
          'chair',
        )
        .to(
          this.roomChildren.kaobei.rotation,
          {
            y: 4 * Math.PI + Math.PI / 4,
            ease: 'power2.out',
            duration: 1,
            onComplete: resolve,
          },
          'chair',
        )
        .to('.arrow ', {
          opacity: 1,
          onComplete: resolve,
        })
    })
  }
  onScroll(e) {
    if (e.deltaY > 0) {
      window.removeEventListener(
        'wheel',
        this.scrollOnceEvent,
      )
      this.playSecondIntro()
    }
  }

  onTouch(e) {
    console.log(e)
    this.initalY = e.touches[0].clientY
  }
  onTouchMove(e) {
    console.log(e)
    let currentY = e.touches[0].clientY
    let difference = this.initalY - currentY
    if (difference > 0) {
      this.removeEventListeners()
      this.playSecondIntro()
    }
    this.initalY = null
  }

  removeEventListeners() {
    window.removeEventListener(
      'wheel',
      this.scrollOnceEvent,
    )
    window.removeEventListener(
      'touchstart',
      this.touchStart,
    )
    window.removeEventListener('touchmove', this.touchMove)
  }

  async playIntro() {
    await this.firstIntro()
    this.moveFlag = true
    this.scrollOnceEvent = this.onScroll.bind(this)
    this.touchStart = this.onTouch.bind(this)
    this.touchMove = this.onTouchMove.bind(this)
    window.addEventListener('wheel', this.scrollOnceEvent)
    window.addEventListener('touchstart', this.touchStart)
    window.addEventListener('touchmove', this.touchMove)
  }
  async playSecondIntro() {
    this.moveFlag = false
    this.scaleFlag = true
    await this.secondIntro()
    this.emit('enablecontrols')
  }
  move() {
    if (this.device === 'desktop') {
      this.room.position.set(-1, 0, 0)
    } else {
      this.room.position.set(0, 0, -1)
    }
  }
  scale() {
    this.roomChildren.rectLight.width = 0
    this.roomChildren.rectLight.height = 0
    if (this.device === 'desktop') {
      this.room.scale.set(0.1, 0.1, 0.1)
    } else {
      this.room.position.set(0.7, 0.7, 0.7)
    }
  }
  update() {
    if (this.moveFlag) {
      this.move()
    }
    if (this.scaleFlag) {
      this.scale()
    }
  }
}
