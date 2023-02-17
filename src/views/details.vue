<template>
  <div class="contain" id="contain">
    <div class="zw"></div>
    <div class="mid">
      <el-row :gutter="10">
        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
          <div class="midbox">
            <div class="midl">
              <el-image v-if="list.cover != ''" :src="list.cover" fit="cover"></el-image>
              <el-image v-else :src="require('../assets/his.png')" fit="cover"></el-image>
            </div>
            <div class="midr">
              <p class="title">{{ list.name }}</p>
              <div class="twobox">
                <p class="type">
                  <!-- <span>热播</span> -->
                  <span style="font-size:24px" v-if="list.score != 0">{{ list.score }}</span>
                  <span style="font-size:24px" v-else>暂无评分</span>
                  <span v-if="list.typeNames != null" v-for="(item, index) in list.typeNames" :key="index">{{
                    item.typeName
                  }}·</span>
                  <span v-if="list.regionName != null">{{
                    list.regionName
                  }}·</span>
                  <span v-if="list.yearName != null">{{ list.yearName }}</span>
                </p>
                <div class="introducebox">
                  <p class="introduce">
                    {{ list.remark }}
                  </p>
                </div>
              </div>
              <div class="operate">
                <div class="favorite accs" id="1" v-if="collected == 0 || list.collected == undefined" @click="play()">
                  <el-image style="width: 28px; height: 28px;" :src="require('../assets/bofang.png')"></el-image>
                  <p>播放</p>
                </div>
                <div class="favorite" id="2" v-if="collected == 0 || list.collected == undefined" @click="collect(1)">
                  <el-image style="width: 25px; height: 24px;padding-bottom: 4px;"
                    :src="require('../assets/shoucang.png')"></el-image>
                  <p>收藏</p>
                </div>
                <div class="favorite" id="1" v-if="collected == 1" @click="play()">
                  <el-image style="width: 28px; height: 28px;" :src="require('../assets/bofang.png')"></el-image>
                  <p>播放</p>
                </div>
                <div class="favorite" id="2" v-if="collected == 1" @click="collect(0)">
                  <el-image style="width: 25px; height: 24px;padding-bottom: 4px;"
                    :src="require('../assets/favpriteact.png')"></el-image>
                  <p>收藏</p>
                </div>
              </div>
            </div>
          </div>
          <div class="slect">
            <div class="xuanji">在线播放</div>
            <!-- <div class="xuanji2"></div> -->
            <!-- <div class="xuanji3">全36集·会员看全集</div> -->
          </div>
          <div class="juji">
            <button v-for="(item, index) in list.resources" class="btn" :key="index" :id="3 + Number(index)"
              @click="goDetail(item)">
              <span>{{ list.name }}</span>
              <span class="wl">{{
                item.originName
              }}</span>
            </button>
          </div>
          <div class="tuijie">
            <p class="tjfy">为你推荐</p>
            <div class="tjlist">
              <div class="tjbox" v-for="(item, index) in list.recommends" :id="3 + list.resources.length + index"
                :key="item.videoId" @click="godetails(item)">
                <el-image style="width:100%" v-if="item.cover != ''" :src="item.cover" fit="cover"></el-image>
                <el-image v-else style="width:100%" :src="require('../assets/his.png')" fit="cover"></el-image>
                <p>{{ item.name }}</p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <audio controls="controls" hidden :src="require('../assets/music/point.mp3')" ref="ado"></audio> -->
  </div>
</template>
<script>
import navbar from "@/views/components/navbar";
import Cookies from "js-cookie";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      list: [],
      js: 0,
      userInfo: [],
      kd: 0,
      collected: 0,
      resourcesId: '',
      viewingTime: '',
      id: '',
      isAddHot:''
    };
  },
  mounted() {
    this.getUserInfo();
    this.id = this.$route.query.id
    if(this.$route.query.isAddHot){
      this.isAddHot = this.$route.query.isAddHot
    }
    let mi = localStorage.getItem('movieId')
    if (mi === this.id) {
      this.viewingTime = localStorage.getItem('movieTime')
      this.resourcesId = localStorage.getItem('resourcesId')
      this.getinfo(this.$route.query.id);
    } else {
      this.viewingTime = ''
      this.resourcesId = ''
      this.getinfo(this.$route.query.id);
    }
    document.documentElement.scrollTop = 0;
    let _this = this;
    this.kd = 1;
    document.onkeydown = function (event) {
      if (_this.$route.name == 'details') {
        if (event.keyCode == 37) {
          _this.moveLeft();
        } else if (event.keyCode == 38) {
          _this.moveUp();
        } else if (event.keyCode == 39) {
          _this.moveRight();
        } else if (event.keyCode == 8) {
          _this.$router.go(-1);
        } else if (event.keyCode == 40) {
          _this.moveDown();
        } else if (event.keyCode == 13) {
          _this.activeClick();
        } else if (event.keyCode == 8) {
          this.$router.go(-1)
        }
      }
    };
  },
  methods: {
    activeClick() {
      document.getElementById(this.kd).click();
      return;
    },
    moveLeft() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 0) {
        this.c = document.getElementById(this.kd);
        this.c.classList.remove("accs");
        this.kd--;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }
    },
    moveRight() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      console.log(this.kd);
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 0) {
        if (this.kd >= this.list.resources.length + this.list.recommends.length + 2) {
          return
        }
        this.c = document.getElementById(this.kd);
        this.c.classList.remove("accs");
        this.kd++;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }
    },
    moveUp() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      }
      if (this.kd >= 1 && this.kd <= 2) {
        this.c = document.getElementById(this.kd);
        this.c.classList.remove("accs");
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd >= 2 && this.kd <= 7) {
        this.c.classList.remove("accs");
        this.kd = 2;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd > 9 && this.kd <= 2 + this.list.resources.length) {
        this.c.classList.remove("accs");
        this.kd = this.kd - 7;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd > 2 + this.list.resources.length) {
        this.c.classList.remove("accs");
        this.kd = 2 + Number(this.list.resources.length);
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }
    },
    moveDown() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      let c = 7
      if (this.list.resources.length % 7 == 0) {
        c = 7
      } else {
        c = this.list.resources.length % 7
      }
      console.log(c)
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 0 && this.kd <= 2) {
        this.c = document.getElementById(this.kd);
        this.c.classList.remove("accs");
        this.kd = 3;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd >= 3 && this.kd <= 1 + this.list.resources.length - c) {
        console.log('我w')
        this.c.classList.remove("accs");
        this.kd = this.kd + 7;
        if (this.kd > 2 + this.list.resources.length) {
          this.kd = 2 + this.list.resources.length
        }
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd > 1 + this.list.resources.length - c && this.kd <= 2 + this.list.resources.length) {
        this.c.classList.remove("accs");
        this.kd = 3 + this.list.resources.length;
        if (this.kd > this.list.resources.length + this.list.recommends.length + 2) {
          this.kd = 2 + this.list.resources.length;
        }
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd == this.list.resources.length + this.list.recommends.length + 2) {
        return
      }
    },
    getUserInfo() {
      let c = Cookies.get("token");
      if (c != undefined) {
        this.$http.get(`/user?token=${c}`).then((res) => {
          this.userInfo = res.data.data;
        });
      }
    },
    bc() {
      this.$router.go(-1);
    },
    collect(val) {
      var _this = this
      console.log(this.collected)
      this.$http.post(`/collect/video/${this.$route.query.id}`).then((res) => {
        if (_this.collected == 0) {
          console.log('0')
          _this.collected = 1
        } else if (_this.collected == 1) {
          console.log('1')
          _this.collected = 0
        }
        // this.$forceUpdate()
        setTimeout(() => {
          this.c = document.getElementById(1);
          this.c.classList.remove("accs");
          this.c = document.getElementById(this.kd);
          this.c.classList.remove("accs");
          this.kd = 2;
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
        }, 5);

      });
    },
    godetails(val) {
      localStorage.clear()
      this.$router.push({ path: "/details", query: { id: val.videoId } });
      this.getinfo(this.$route.query.id);
      document.documentElement.scrollTop = 0;
    },
    goDetail(val) {
      console.log(val)
      let c = Cookies.get("membership");
      if (this.list.membership == 1) {
        if (c > 0) {
          this.sendit(val.originId, val.url)
          // window.location.href = val.url;
        } else {
          this.$message.error("当前剧集为VIP才可观看");
        }
      } else {
        // window.location.href = val.url;
        this.sendit(val.originId, val.url)
      }
    },
    play() {
      this.sendit(this.list.resources[0].originId, this.list.resources[0].url)
      window.location.href = this.list.resources[0].url
    },
    sendit(val, url) {
      this.$http.post('video/resources/visit', { originId: val, token: Cookies.get('token') || '' }).then(res => {
        let date = new Date()
        this.viewingTime = this.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        localStorage.setItem('movieTime', this.viewingTime)
        localStorage.setItem('movieId', this.id)
        localStorage.setItem('resourcesId', val)
        window.location.href = url;
      })
    },
    formatDate(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },
    padLeftZero(str) {
      return ('00' + str).substr(str.length)
    },
    getinfo(id) {
      this.$http.get(`/video/getInfo?videoId=${id}&resourcesId=${this.resourcesId}&viewingTime=${this.viewingTime}&isAddHot=${this.isAddHot}`).then((res) => {
        this.list = res.data.data;
        if (res.data.code == 0) {
          this.collected = res.data.data.collected
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.zw{
    height:36px;
    width: 100%;
  }
.midbox {
  display: flex;
  justify-content: space-between;
  padding: 0 0;

  .el-image {
    border-radius: 10px;
  }

  .midl {
    // width: 50%;
    width: 20%;
    position: relative;

    .el-image {
      // width: 100%;
      height: 100%;
    }
  }

  .midr {
    // width: 45%;
    width: 78.4%;

    .title {
      color: #303030;
      font-size: 50px;
      padding-bottom: 30px;
    }

    .twobox {
      background: #efefef;
      border-radius: 10px;
    }

    .type {

      color: #2A2A32;
      padding-left: 2%;
      padding-top: 23px;

      span:nth-child(1) {
        // margin-left: 10px;
      }

      span {
        padding: 7px 5px;
        border-radius: 10px;
        font-size: 22px;
      }
    }

    .introducebox {
      // padding: 30px 27px 33px 25px;
      margin: 0 5% 4.9% 2%;
      border-radius: 10px;
      padding: 14px 0px 26px 10px;
      // padding: 30px 27px 33px 25px;
    }

    .introduce {
      color: #202020;
      font-size: 24px;
      display: -webkit-box; //对象作为弹性伸缩盒子模型显示
      overflow: hidden; //溢出隐藏
      -webkit-box-orient: vertical; //设置伸缩盒子对象的子元素的排列方式
      -webkit-line-clamp: 2; //设置 块元素包含的文本行数
    }
  }
}

.operate {
  display: flex;

  // justify-content: space-between;
  // margin-top: 45px;
  .accs {
    // background: #f17666;
    // outline: none !important;
  }
}

.favorite:nth-child(2) {
  margin-left: 37px;
}

.favorite,
.fullscreen {
  width: 90px;
  height: 90px;
  text-align: center;
  align-items: center;
  color: #303030;
  font-size: 24px;
  border-radius: 10px;
  background: #F7F7F7;

  .el-image {
    padding-top: 12px;
  }
}

.fullscreen {
  margin: 0 20px;
}

.vip {
  margin-left: 10%;

  .img {
    // width: 430px;
    height: 136px;
  }
}

.introducep {
  position: absolute;
  bottom: 4%;
  left: 0;

  .i1 {
    font-size: 28px;
    color: #303030;
    padding: 18pt;
  }

  .i2 {
    font-size: 24px;
    color: #303030;
  }
}

.slect {
  display: flex;
  height: 40px;
  line-height: 40px;
  padding-top: 38px;

  .xuanji {
    color: #303030;
    font-size: 40px;
    position: relative;

  }

  .xuanji2 {
    width: 1px;
    height: 36px;
    background: rgba($color: #fff, $alpha: 0.1);
    margin-top: 2px;
    margin-left: 50px;
    margin-right: 50px;
  }

  .xuanji3 {
    font-size: 24px;
    color: #b3b2c5;
  }
}

.juji::-webkit-scrollbar,
.tjlist::-webkit-scrollbar {
  display: none;
}

.juji {
  width: 100%;
  // display: flex;
  // overflow: scroll;
  overflow-y: hidden;
  overflow-x: auto;
  // white-space: nowrap;
  padding: 20px 0;
  border-radius: 10px;

  .btn {
    width: 12.8%;
    padding: 10px 0;
    border-radius: 10px;
    font-size: 18px;
    color: #202020;
    border: none;
    background: rgb(243, 243, 243);
    font-weight: bold;

    span {
      display: block;
    }

    span:nth-child(2) {
      font-size: 16px;
    }
  }
  // .btn:not(:first-of-type) {
  //   margin-left: 16px;
  // }
  .btn {
    margin: 8px;
  }
}

.jjtab {
  margin-top: 30px;
  color: #fff;
  display: flex;
  height: 60px;
}

.jjact {
  color: #f3f3f3;
}

.jjtablist {
  position: relative;
  font-size: 28px;
  cursor: pointer;
}

.jjtablist:not(:first-of-type) {
  margin-left: 16px;
}

.jjactlist {
  position: absolute;
  left: 20px;
  bottom: 14px;
  width: 30px;
  height: 6px;
  background: #ffde05;
  border-radius: 3px;
}

.tuijie {
  padding: 40px 0;

  .tjfy {
    font-size: 40px;
    color: #303030;
    padding-bottom: 30px;
  }

  .tjlist {
    width: 100%;

    // display: flex;
    // overflow: scroll;
    overflow-x: scroll;
    // overflow-y: hidden;
    white-space: nowrap;
    padding: 20px 0;
  }

  .tjbox:not(:first-of-type) {
    margin-left: 40px;
  }

  .tjbox:first-of-type {
    margin-left: 10px;
  }

  .tjbox {
    border-radius: 10px;
    display: inline-block;
    width: 14.7%;
    text-align: center;
    color: #fff;
    position: relative;
    height: 317px;

    .el-image {
      height: 100%;
      width: 100%;
    }

    p {
      text-align: left;
      padding: 10px 10px 0 10px;
      // padding: 10px 4.5% 0 4.5%;
      font-size: 28px;
      // overflow: hidden;
      position: absolute;
      bottom: 0%;
      left: 0;
      color: #fff;
      background: rgba(32, 32, 32, 0.7);
      border-radius: 0 0 10px 10px;
      text-align: center;
      height: 4vh;
      line-height: 4vh;
      width: 91%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .el-image {
      border-radius: 10px;
    }
  }
}

.juji .btn .wl {
  color: #202020;
  opacity: 0.5;
}

.vip3 {
  width: 62px;
  height: 40px;
  vertical-align: top;
}

// @media screen and (max-width: 1280px) {
//   .title {
//     font-size: 30px !important;
//     padding-bottom: 2% !important;
//   }

//   .juji .btn span {
//     font-size: 24px;
//   }

//   .juji .btn .wl {
//     font-size: 14px !important;
//   }

//   .midbox .midr .type span {
//     padding: 5px 10px;
//     border-radius: 5px;
//     font-size: 12px;
//     margin: 0 10px;
//   }

//   .operate {
//     .favorite {
//       height: 90px !important;
//       font-size: 14px !important;
//       width: 90px !important;

//       .el-image {
//         padding-top: 12.5px !important;
//       }
//     }
//   }

//   .vip3 {
//     width: 66px;
//     height: 34px;
//     vertical-align: middle;
//     margin-left: 10px;
//   }

//   .vip .img {
//     height: 80px;
//   }

//   .introduce {
//     font-size: 14px !important;
//   }

//   .slect .xuanji {
//     font-size: 30px;
//   }

//   .slect .xuanji .hx {
//     position: absolute;
//     background: #3030;
//     border-radius: 3px;
//     bottom: -18%;
//     left: 35%;
//   }

//   .juji {
//     margin-top: 3%;
//   }
// }

//over
.imgvip {
  width: 76px;
  height: 36px;
  position: absolute;
  top: 0;
  right: 0;
}

@media screen and (max-width: 1280px) {
  .midbox .midr .title {
    font-size: 25px;
    padding-bottom: 5px;
  }
  .tuijie {
    padding: 0px 0;
}
  .midbox .midr .type {
    color: #2A2A32;
    padding-left: 2%;
    padding-top: 11px;
  }
  .midbox .midr .type span {
    padding: 7px 5px;
    border-radius: 10px;
    font-size: 12px;
}
.tuijie .tjbox p{
  font-size: 20px;
}
.midbox .midr .introduce {
    font-size: 14px;
}
.midbox .midr .introducebox{
    margin: 0 5% 2% 2%;
    border-radius: 10px;
    padding: 14px 0px 26px 10px;
}
.zw{
    height:0px
  }
  .slect {
    display: flex;
    height: 30px !important;
    line-height: 30px !important;
    padding-top: 19px !important;

    .xuanji {
      font-size: 30px !important;
    }
  }

  .tjfy {
    font-size: 30px !important;
    padding-bottom: 0px !important;
  }

  .tjbox {
    height: 240px !important;

    p {
      padding: 10px 4.5% 0 4.5% !important;
    }
  }
}
</style>