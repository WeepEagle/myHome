/* 
加载素材相关
*/
import * as THREE from 'three'
import {EventEmitter} from 'events' // 类似全局事件总线
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import Experience from '../Experience'

export default class Resources extends EventEmitter {
  constructor(assets) {
    super()
    this.experience = new Experience()
    this.renderer = this.experience.renderer

    this.assets = assets

    this.items = {}
    this.queue = this.assets.length
    // this.loader === this.assets.length 说明素材加载完毕
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    // 解压缩
    this.loaders.dracoLoader = new DRACOLoader()
    // 解码后文件的存放路径
    this.loaders.dracoLoader.setDecoderPath('/draco/')
    // 给模型加载器挂载解压缩加载器
    this.loaders.gltfLoader.setDRACOLoader(
      this.loaders.dracoLoader,
    )
  }
  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === 'glbModel') {
        this.loaders.gltfLoader.load(asset.path, file => {
          this.singleAssetLoaded(asset, file)
        })
      } else if (asset.type === 'videoTexture') {
        this.video = {}
        this.videoTexture = {}
        // 视频标签
        this.video[asset.name] =
          document.createElement('video')
        this.video[asset.name].src = asset.path
        this.video[asset.name].playsInline = true
        this.video[asset.name].autoplay = true
        this.video[asset.name].loop = true
        this.video[asset.name].muted = true
        this.video[asset.name].play()
        // 视频纹理
        this.videoTexture[asset.name] =
          new THREE.VideoTexture(this.video[asset.name])
        this.videoTexture[asset.name].flipY = true
        this.videoTexture[asset.name].minFilter =
          THREE.NearestFilter
        this.videoTexture[asset.name].magFilter =
          THREE.NearestFilter
        this.videoTexture[
          asset.name
        ].generateMipmaps = false
        this.videoTexture[asset.name].encoding =
          THREE.sRGBEncoding
        this.singleAssetLoaded(
          asset,
          this.videoTexture[asset.name],
        )
      }
    }
  }
  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file
    this.loaded++
    // console.log(file)
    // this.loader === this.assets.length 说明素材加载完毕
    if (this.loaded === this.queue) {
      // console.log('素材加载完毕')
      this.emit('ready')
    }
  }
}
