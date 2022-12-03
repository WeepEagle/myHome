/* 
渲染相关
*/
import ASScroll from '@ashthornton/asscroll'
import GSAP from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Experience from '../Experience'

export default class Controls {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.sizes = this.experience.sizes
    this.camera = this.experience.camera
    this.floor = this.experience.world.floor.plane
    this.room = this.experience.world.room.actualRoom
    this.room.children.forEach(child => {
      if (child.type === 'RectAreaLight') {
        this.rectLight = child
      }
    })
    this.circleFirst =
      this.experience.world.floor.circleFirst
    this.circleSecond =
      this.experience.world.floor.circleSecond
    this.circleThird =
      this.experience.world.floor.circleThird
    GSAP.registerPlugin(ScrollTrigger)

    document.querySelector('.page').style.overFlow =
      'visible'

    // 混合平滑滚动设置
    // this.setSmoothScroll()
    // 所有动画的设置
    this.setScrollTrigger()
  }

  // copy的代码
  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      ease: 0.3,
      disableRaf: true,
    })

    GSAP.ticker.add(asscroll.update)

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    })

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value
          return
        }
        return asscroll.currentPos
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      fixedMarkers: true,
    })

    asscroll.on('update', ScrollTrigger.update)
    ScrollTrigger.addEventListener(
      'refresh',
      asscroll.resize,
    )

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          '.gsap-marker-start, .gsap-marker-end, [asscroll]',
        ),
      })
    })
    return asscroll
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll()
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // GSAP.matchMedia({
      // PC
      '(min-width:969px)': () => {
        // 重置尺寸
        this.room.scale.set(0.1, 0.1, 0.1)
        ;(this.rectLight.width = 0.7),
          (this.rectLight.height = 0.4),
          // first section ------------------------------------------------------------
          (this.firstMoveTimeline = GSAP.timeline({
            scrollTrigger: {
              trigger: '.first-move',
              start: 'top top',
              end: 'bottom bottom',
              // markers: true,
              scrub: 0.6,
              // pin: true,
              // 实时刷新
              invalidateOnRefresh: true,
            },
          }).to(this.room.position, {
            x: () => this.sizes.width * 0.00175,
          }))

        // second section ------------------------------------------------------------
        this.secondMoveTimeline = GSAP.timeline({
          scrollTrigger: {
            trigger: '.second-move',
            // markers: true,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            // pin: true,
            // 实时刷新
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.scale,
            {
              x: 0.4,
              y: 0.4,
              z: 0.4,
            },
            // 相同标识的动画同时进行
            'same',
          )
          .to(
            this.rectLight,
            {
              width: 0.7 * 4,
              height: 0.4 * 4,
            },
            // 相同标识的动画同时进行
            'same',
          )
          .to(
            this.room.position,
            {
              x: () => 0,
              y: () => 0.2,
              z: () => this.sizes.height * 0.013,
            },
            'same',
          )
        // third section ------------------------------------------------------------
        this.thirdMoveTimeline = GSAP.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            // markers: true,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            // pin: true,
            // 实时刷新
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.floor.position,
            {
              // x: 0,
              y: -10,
              // z: 0,
            },
            'same',
          )
          .to(
            this.circleFirst.position,
            {
              // x: 0,
              y: -9,
              // z: 0,
            },
            'same',
          )
          .to(
            this.camera.orthographicCamera.position,
            {
              x: 0,
              y: 0,
              z: 0,
            },
            'same',
          )
          .to(
            this.camera.orthographicCamera.rotation,
            {
              x: () => 0,
              y: () => -Math.PI / 6,
            },
            'same',
          )
          .to(
            this.room.position,
            {
              x: -2,
              y: -6,
              z: 3.2,
            },
            'same',
          )
          .to(
            this.room.scale,
            {
              x: 0.4,
              y: 0.4,
              z: 0.4,
            },
            'same',
          )
          .to(
            this.rectLight,
            {
              width: 0.7 * 4,
              height: 0.4 * 4,
            },
            // 相同标识的动画同时进行
            'same',
          )
      },
      // mobile
      '(max-width:968px)': () => {
        // 重置
        this.room.scale.set(0.07, 0.07, 0.07)
        this.room.position.set(0, 0, 0)
        ;(this.rectLight.width = 0.7 * 0.7),
          (this.rectLight.height = 0.4 * 0.7),
          // first section ------------------------------------------------------------
          (this.firstMoveTimeline = GSAP.timeline({
            scrollTrigger: {
              trigger: '.first-move',
              start: 'top top',
              end: 'bottom bottom',
              // markers: true,
              scrub: 0.6,
              // pin: true,
              // 实时刷新
              invalidateOnRefresh: true,
            },
          })
            .to(
              this.room.scale,
              {
                x: 0.1,
                y: 0.1,
                z: 0.1,
              },
              'same',
            )
            .to(
              this.rectLight,
              {
                width: 0.7,
                height: 0.4,
              },
              'same',
            ))

        // second section ------------------------------------------------------------
        this.secondMoveTimeline = GSAP.timeline({
          scrollTrigger: {
            trigger: '.second-move',
            // markers: true,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            // pin: true,
            // 实时刷新
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.scale,
            {
              x: 0.25,
              y: 0.25,
              z: 0.25,
            },
            'same',
          )
          .to(
            this.rectLight,
            {
              width: 0.7 * 2.5,
              height: 0.4 * 2.5,
            },
            'same',
          )
          .to(
            this.room.position,
            {
              y: -2.5,
            },
            'same',
          )
          .to(
            this.floor.position,
            {
              y: -5,
            },
            'same',
          )
          .to(
            this.circleFirst.position,
            {
              // x: 0,
              y: -4,
              // z: 0,
            },
            'same',
          )

        // third section ------------------------------------------------------------
        this.thirdMoveTimeline = GSAP.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            // markers: true,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            // pin: true,
            // 实时刷新
            invalidateOnRefresh: true,
          },
        }).to(this.room.position, {
          x: -2.5,
          y: -4,
        })
      },
      // all
      all: () => {
        // 圆角 和 进度条动画
        this.sections =
          document.querySelectorAll('.section')
        this.sections.forEach(section => {
          // section 进度条的父亲
          this.progressWrapper = section.querySelector(
            '.progress-wrapper',
          )
          // section 进度条
          this.progressBar =
            section.querySelector('.progress-bar')

          if (section.classList.contains('right')) {
            // 顶部圆角动画
            GSAP.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                // 标记为 section
                trigger: section,
                // section 的 top 在屏幕 bottom 时开始
                start: 'top bottom',
                // section 的 top 在屏幕 top 时结束
                end: 'top top',
                // markers: true,
                scrub: 0.6,
              },
            })
            // 底部圆角动画
            GSAP.to(section, {
              borderBottomLeftRadius: 1000,
              scrollTrigger: {
                // 标记为 section
                trigger: section,
                // section 的 top 在屏幕 bottom 时开始
                start: 'bottom bottom',
                // section 的 top 在屏幕 top 时结束
                end: 'bottom top',
                // markers: true,
                scrub: 0.6,
              },
            })
          } else {
            // 顶部圆角动画
            GSAP.to(section, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                // 标记为 section
                trigger: section,
                // section 的 top 在屏幕 bottom 时开始
                start: 'top bottom',
                // section 的 top 在屏幕 top 时结束
                end: 'top top',
                // markers: true,
                scrub: 0.6,
              },
            })
            // 底部圆角动画
            GSAP.to(section, {
              borderBottomRightRadius: 1000,
              scrollTrigger: {
                // 标记为 section
                trigger: section,
                // section 的 top 在屏幕 bottom 时开始
                start: 'bottom bottom',
                // section 的 top 在屏幕 top 时结束
                end: 'bottom top',
                // markers: true,
                scrub: 0.6,
              },
            })
          }

          // 圆形地面动画
          // first section ------------------------------------------------------------
          this.firstMoveTimeline = GSAP.timeline({
            scrollTrigger: {
              trigger: '.first-move',
              start: 'top top',
              end: 'bottom bottom',
              // markers: true,
              scrub: 0.6,
              // pin: true,
              // 实时刷新
              invalidateOnRefresh: true,
            },
          }).to(
            this.circleFirst.scale,
            {
              x: 3,
              y: 3,
              z: 3,
            },
            'same',
          )

          // second section ------------------------------------------------------------
          this.secondMoveTimeline = GSAP.timeline({
            scrollTrigger: {
              trigger: '.second-move',
              // markers: true,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              // pin: true,
              // 实时刷新
              invalidateOnRefresh: true,
            },
          })

          // third section ------------------------------------------------------------
          this.thirdMoveTimeline = GSAP.timeline({
            scrollTrigger: {
              trigger: '.third-move',
              // markers: true,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              // pin: true,
              // 实时刷新
              invalidateOnRefresh: true,
            },
          })
          // 进度条动画
          GSAP.from(this.progressBar, {
            scaleY: 0,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.4,
              pin: this.progressWrapper,
              pinSpacing: false,
            },
          })
        })

        ////////////////////////////////////////////以下暂时没用

        // Mini Platform Animations
        this.thirdMoveTimeline = GSAP.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            // markers: true,
            start: 'center center',
            end: 'bottom bottom',
            scrub: 0.6,
            // 实时刷新
            invalidateOnRefresh: true,
          },
        })
        this.room.children.forEach(child => {
          if (child.name === 'Mini_Floor') {
            GSAP.to(child.position, {
              x: -5.44,
              z: 13.65,
              duration: 0.3,
            })
          }
          if (child.name === 'Mailbox') {
            GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.3,
            })
          }
        })
      },
    })
  }

  resize() {}

  update() {}
}
