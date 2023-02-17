<template>
  <div class="contain classify">
    <el-row :gutter="10">
      <el-col :xs="3" :sm="4" :md="4" :lg="4" :xl="4" :offset="1" style="position:relative">
        <div style="color:rgb(239,239,239)">1</div>
        <div class="allfenlei">
          <button v-for="(item, index) in typeList.category" :key="item.categoryId" :id="1 + Number(index)"
            :class="{ activeNav: activeType == item.categoryId }" @click="selectCategory(item.categoryId)">
            {{ item.name }}
          </button>
        </div>
      </el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
        <div class="rightbox">
          <div class="typebox" v-if="typeList != []">
            <div class="type">
              <div class="typel">
                <p>全部类型</p>
              </div>
              <div class="typer" id="typer1">
                <button v-for="(item, index) in typeList.type" :id="1 + typeList.category.length + Number(index)"
                  :class="{ actives: activeType2 == item.typeId }" :key="item.typeId" @click="selectType(item.typeId)">
                  {{ item.name }}
                </button>
              </div>
            </div>
            <div class="type">
              <div class="typel">
                <p>全部地区</p>
              </div>
              <div class="typer" id="typer2">
                <button :id="1 + typeList.category.length + typeList.type.length + Number(index)"
                  v-for="(item, index) in typeList.region" :key="item.regionId"
                  :class="{ actives: activeType3 == item.regionId }" @click="selectRegion(item.regionId)">
                  {{ item.name }}
                </button>
              </div>
            </div>
            <div class="type">
              <div class="typel">
                <p>全部年代</p>
              </div>
              <div class="typer" id="typer3">
                <button
                  :id="1 + typeList.category.length + typeList.type.length + typeList.region.length + Number(index)"
                  v-for="(item, index) in typeList.year" :key="item.yearId"
                  :class="{ actives: activeType4 == item.years }" @click="selectYear(item.years)">
                  {{ item.years }}
                </button>
              </div>
            </div>
            <div class="type">
              <div class="typel">
                <p>默认排序</p>
              </div>
              <div class="typer">
                <button
                  :id="1 + typeList.category.length + typeList.type.length + typeList.region.length + typeList.year.length"
                  :class="{ actives: activeType5 == 1 }" @click="selectpx(1, 1)">
                  最热
                </button>
                <button
                  :id="2 + typeList.category.length + typeList.type.length + typeList.region.length + typeList.year.length"
                  :class="{ actives: activeType5 == 3 }" @click="selectpx(2)">
                  最新
                </button>
                <button
                  :id="3 + typeList.category.length + typeList.type.length + typeList.region.length + typeList.year.length"
                  :class="{ actives: activeType5 == 4 }" @click="selectpx(3)">
                  评分
                </button>
              </div>
            </div>
          </div>
          <div class="mid">
            <div class="list" v-for="(item, index) in dataList" :key="item.id"
              :id="4 + typeList.category.length + typeList.type.length + typeList.region.length + typeList.year.length + Number(index)"
              @click="godetails(item)">
              <el-image v-if="item.cover != ''" :src="item.cover" fit="cover">
                <div slot="placeholder" class="image-slot">
                  <el-image :src="require('../assets/his.png')"></el-image>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <el-image v-else :src="require('../assets/his.png')" fit="cover"></el-image>
              <el-image class="vip3" v-if="item.membership == 1" :src="require('../assets/vip4.png')"></el-image>
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
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
      activeType: 0,
      activeType2: "",
      activeType3: "",
      activeType4: "全部",
      activeType5: 1,
      typeList: [],
      page: 1,
      dataList: [],
      clientHeight: 0,
      userInfo: [],
      kd: 0,
      nlb: '',
      nlx: ''
    };
  },
  watch: {
    '$route': function (e) {
      if (e.name != classify) {
        window.removeEventListener("scroll", this.scrollBottom, true);
      }
    }
  },
  activated() {
    this.kd = 1
    this.page = 1
    if (this.$route.query.lb != undefined) {
      console.log(this.$route.query)
      this.nlb = this.$route.query.lb
      this.activeType2 = this.$route.query.id
      if (this.$route.query.lb == '电视剧') {
        this.kd = 1
      } if (this.$route.query.lb == '电影') {
        this.kd = 2
      } if (this.$route.query.lb == '综艺') {
        this.kd = 3
      } if (this.$route.query.lb == '动漫') {
        this.kd = 4
      }
    }
    this.getType();
    this.getUserInfo();
  },
  mounted() {
    this.clientHeight = document.documentElement.clientHeight;
    window.addEventListener("scroll", this.scrollBottom, true);
    let _this = this;
    document.onkeydown = function (event) {
      if (_this.$route.name == 'classify') {
        if (event.keyCode == 37) {
          _this.moveLeft();
        } else if (event.keyCode == 38) {
          _this.moveUp();
        } else if (event.keyCode == 39) {
          _this.moveRight();
        } else if (event.keyCode == 8) {
          _this.$router.go(-1)
        } else if (event.keyCode == 40) {
          _this.moveDown();
        } else if (event.keyCode == 13) {
          _this.activeClick();
        } else if (event.keyCode == 8) {
          this.$router.go(-1)
        }
      }
    };
   setTimeout(() => {
     this.c = document.getElementById(1);
     this.c.classList.add("accs");
     this.kd = 1;
   }, 100);
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
      } else if (this.kd == 1 + this.typeList.category.length ||
        this.kd == 1 + this.typeList.category.length + this.typeList.type.length ||
        this.kd == 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length ||
        this.kd == 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
        this.c.classList.remove("accs");
        this.kd = 1
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
        this.page = 1
        this.activeClick()
      } else if (this.kd >= 1 + this.typeList.category.length) {
        this.c.classList.remove("accs");
        this.kd--;
        if (this.kd >= 1 + this.typeList.category.length && this.kd < 1 + this.typeList.category.length + this.typeList.type.length) {
          let el2 = document.getElementById(this.kd);
          let viewPortWidth2 = document.getElementById("typer1").clientWidth;
          let offsetLeft2 = el2.offsetLeft;
          let scrollLeft2 = document.getElementById("typer1").scrollLeft;
          let intop2 = el2.offsetWidth;
          let dd = offsetLeft2 > scrollLeft2 && offsetLeft2 + intop2 < scrollLeft2 + viewPortWidth2;
          if (dd == false) {
            document.getElementById("typer1").scrollLeft = offsetLeft2 - 30;
          }
        }
        if (this.kd >= 1 + this.typeList.category.length + this.typeList.type.length && this.kd < 1 + this.typeList.category.length + this.typeList.type.length
          + this.typeList.region.length) {
          let el2 = document.getElementById(this.kd);
          let viewPortWidth2 = document.getElementById("typer2").clientWidth;
          let offsetLeft2 = el2.offsetLeft;
          let scrollLeft2 = document.getElementById("typer2").scrollLeft;
          let intop2 = el2.offsetWidth;
          let dd = offsetLeft2 > scrollLeft2 && offsetLeft2 + intop2 < scrollLeft2 + viewPortWidth2;
          if (dd == false) {
            document.getElementById("typer2").scrollLeft = offsetLeft2 - 30;
          }
        }
        if (this.kd >= 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length &&
          this.kd < 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
          let el2 = document.getElementById(this.kd);
          let viewPortWidth2 = document.getElementById("typer3").clientWidth;
          let offsetLeft2 = el2.offsetLeft;
          let scrollLeft2 = document.getElementById("typer3").scrollLeft;
          let intop2 = el2.offsetWidth;
          let dd = offsetLeft2 > scrollLeft2 && offsetLeft2 + intop2 < scrollLeft2 + viewPortWidth2;
          if (dd == false) {
            document.getElementById("typer3").scrollLeft = offsetLeft2 - 30;
          }
        }
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }
      // if (this.kd > 6 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
      var el = document.getElementById(this.kd);
      const viewPortHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      const offsetTop = el.offsetTop;
      const scrollTop = document.documentElement.scrollTop;
      const top = offsetTop - scrollTop;
      const intop = el.offsetHeight;
      let d = top >= 0;
      if (d == false) {
        document.documentElement.scrollTop = document.getElementById(
          this.kd
        ).offsetTop;
      }
      // console.log(element.offsetHeight);
      // }
    },
    moveRight() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      var c = 3 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length + this.dataList.length
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      }
      if (this.kd >= 0 && this.kd < 1 + this.typeList.category.length) {
        this.c.classList.remove("accs");
        this.kd = 1 + this.typeList.category.length;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd >= 1 + this.typeList.category.length) {
        this.c.classList.remove("accs");
        this.kd++;
        if (this.kd >= 1 + this.typeList.category.length && this.kd < 1 + this.typeList.category.length + this.typeList.type.length) {
          let el = document.getElementById(this.kd);
          let viewPortWidth = document.getElementById("typer1").clientWidth;
          let offsetLeft = el.offsetLeft;
          let scrollLeft = document.getElementById("typer1").scrollLeft;
          let intop = el.offsetWidth;
          let d = offsetLeft + intop > scrollLeft && offsetLeft + intop < scrollLeft + viewPortWidth;
          if (d == false) {
            document.getElementById("typer1").scrollLeft = offsetLeft - 10;
          }
        }
        if (this.kd >= 1 + this.typeList.category.length + this.typeList.type.length && this.kd < 1 + this.typeList.category.length + this.typeList.type.length
          + this.typeList.region.length) {
          let el = document.getElementById(this.kd);
          let viewPortWidth = document.getElementById("typer2").clientWidth;
          let offsetLeft = el.offsetLeft;
          let scrollLeft = document.getElementById("typer2").scrollLeft;
          let intop = el.offsetWidth;
          let d = offsetLeft + intop > scrollLeft && offsetLeft + intop < scrollLeft + viewPortWidth;
          if (d == false) {
            document.getElementById("typer2").scrollLeft = offsetLeft - 10;
          }
        } if (this.kd >= 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length &&
          this.kd < 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
          let el = document.getElementById(this.kd);
          let viewPortWidth = document.getElementById("typer3").clientWidth;
          let offsetLeft = el.offsetLeft;
          let scrollLeft = document.getElementById("typer3").scrollLeft;
          let intop = el.offsetWidth;
          let d = offsetLeft + intop > scrollLeft && offsetLeft + intop < scrollLeft + viewPortWidth;
          if (d == false) {
            document.getElementById("typer3").scrollLeft = offsetLeft - 10;
          }
        }
        if (this.kd > c) {
          this.kd = c
        }
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }

      var el = document.getElementById(this.kd);
      const viewPortHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      const offsetTop = el.offsetTop;
      const scrollTop = document.documentElement.scrollTop;
      const top = offsetTop - scrollTop;
      const intop = el.offsetHeight;
      let d = top + intop <= viewPortHeight;
      if (d == false) {
        document.documentElement.scrollTop = document.getElementById(
          this.kd
        ).offsetTop;
      }
      // console.log(element.offsetHeight);
      // }
    },
    changeleft() {
      document.getElementById("typer1").scrollLeft = 0
    }, changeleft2() {
      document.getElementById("typer2").scrollLeft = 0
    }, changeleft3() {
      document.getElementById("typer3").scrollLeft = 0
    },
    moveUp() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      let c = 0
      c = 3 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length + this.dataList.length
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 1 && this.kd < this.typeList.category.length + 1) {
        this.c.classList.remove("accs");
        this.kd--;
        this.activeClick()
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd >= 1 + this.typeList.category.length && this.kd < 1 + this.typeList.category.length + this.typeList.type.length) {
        this.c.classList.remove("accs");
        this.kd = 1 + this.typeList.category.length;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
        this.changeleft()
        this.changeleft2()
        this.changeleft3()
      } else if (this.kd >= 1 + this.typeList.category.length + this.typeList.type.length && this.kd < 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length) {
        this.c.classList.remove("accs");
        this.kd = 1 + this.typeList.category.length;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
        this.changeleft()
        this.changeleft2()
        this.changeleft3()
      } else if (this.kd >= 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length && this.kd < 1 +
        this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
        this.c.classList.remove("accs");
        this.kd = 1 + this.typeList.category.length + this.typeList.type.length
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
        this.changeleft()
        this.changeleft2()
        this.changeleft3()
      } else if (this.kd >= 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length && this.kd <=
        3 +
        this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
        this.c.classList.remove("accs");
        this.kd = 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
        this.changeleft()
        this.changeleft2()
        this.changeleft3()
      } else if (this.kd >= 3 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length && this.kd <
        this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length + 9) {
        this.c.classList.remove("accs");
        this.kd = 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd >= this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length + 6 && this.kd <
        c) {
        this.c.classList.remove("accs");
        this.kd = this.kd - 6;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }
      // if (this.kd > 6 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
      var el = document.getElementById(this.kd);
      const viewPortHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      const offsetTop = el.offsetTop;
      const scrollTop = document.documentElement.scrollTop;
      const top = offsetTop - scrollTop;
      const intop = el.offsetHeight;
      let d = top >= 0;
      if (d == false) {
        document.documentElement.scrollTop = document.getElementById(
          this.kd
        ).offsetTop - intop;
      }
      // console.log(element.offsetHeight);
      // }
    },
    moveDown() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      //4-8 9-29 30-32 33-77 78-79
      let c = 0
      c = 3 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length + this.dataList.length
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
        //4-8 9-27 28-30 31-69 70-71
      } else if (this.kd > 0 && this.kd < 1 + this.typeList.category.length) {
        this.c.classList.remove("accs");
        this.kd++;
        this.activeClick()
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd >= 1 + this.typeList.category.length && this.kd < 1 + this.typeList.category.length + this.typeList.type.length) {
        this.c.classList.remove("accs");
        this.kd = 1 + this.typeList.category.length + this.typeList.type.length;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd >= 1 + this.typeList.category.length + this.typeList.type.length && this.kd < 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length) {
        this.c.classList.remove("accs");
        this.kd = 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd >= 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length && this.kd < 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
        this.c.classList.remove("accs");
        this.kd = 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd >= 1 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length && this.kd <=
        3 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
        this.c.classList.remove("accs");
        this.kd = 4 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd >= 3 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length && this.kd <= c) {
        this.c.classList.remove("accs");
        this.kd = this.kd + 6;
        if (this.kd > c) {
          this.kd = c
        }
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }

      var el = document.getElementById(this.kd);
      const viewPortHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      const offsetTop = el.offsetTop;
      const scrollTop = document.documentElement.scrollTop;
      const top = offsetTop - scrollTop;
      const intop = el.offsetHeight;
      let d = top + intop <= viewPortHeight;
      if (d == false) {
        document.documentElement.scrollTop = document.getElementById(
          this.kd
        ).offsetTop - intop;
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
    godetails(val) {
      this.$router.push({ path: "/details", query: { id: val.id } });
    },
    scrollBottom() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        // 滚动到底部，逻辑代码
        //事件处理
        this.page++;
        this.getinfo();
        return;
        // 这这里可以写一些业务逻辑，请求数据等
      }
    },
    selectpx(val) {
      this.page = 1;
      this.activeType5 = val;
      this.getinfo();
    },
    selectYear(val) {
      this.page = 1;
      this.activeType4 = val;
      this.getinfo();
    },
    selectRegion(val) {
      this.page = 1;
      this.activeType3 = val;
      this.getinfo();
    },
    selectType(val) {
      this.page = 1;
      this.activeType2 = val;
      this.getinfo();
    },
    selectCategory(val) {
      this.page = 1;
      this.activeType = val;
      this.getinfo();
    },
    getinfo() {
      this.$http
        .get(
          `/video/page?page=${this.page}&limit=30&regionId=${this.activeType3}&sort=${this.activeType5}&categoryId=${this.activeType}&typeId=${this.activeType2}&years=
        ${this.activeType4}`,
          {
            page: this.page,
            // [string]	是	页码
            limit: 30,
            // [string]	是	条数
            sort: this.activeType5,
            // [string]		排序	展开
            categoryId: this.activeType,
            // [string]		类别标识
            typeId: this.activeType2,
            // [string]		类型标识
            years: this.activeType4,
            // [string]		年份标识
            regionId: this.activeType3,
            // [string]		地区标识复制
          }
        )
        .then((res) => {
          if (this.page == 1) {
            this.dataList = res.data.data.list;
          } else {
            res.data.data.list.map((val) => {
              this.dataList.push(val);
            });
          }
        });
    },
    getType() {
      this.$http.get("/video/category/classify").then((res) => {
        this.typeList = res.data.data;
        this.typeList.region.unshift({ regionId: "", name: "全部" })
        this.typeList.type.unshift({ typeId: "", name: "全部" })
        this.typeList.year.unshift({ yearId: "", years: "全部" })
        this.activeType = this.typeList.category[0].categoryId
        this.typeList.category.map(val => {
          if (val.name == this.nlb) {
            this.activeType = val.categoryId
          }
        })
        this.page = 1
        this.getinfo();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.classify {
  // background: #efefef;
}

.rightbox {
  min-height: 93vh;
  margin: 29px 29px;
}

.typebox {
  background: #fff;
  margin-bottom: 29px;
  border-radius: 10px;

  .type {
    display: flex;
    font-size: 1.2rem;
    padding: 10px 0;

    .typel {
      color: #FE9D3E;
      // font-weight: bold;
      height: 1rem;
      line-height: 1.8rem;
      width: 75px;
      padding-left: 10px;

      p {
        background: #F9F9F9;
        width: 75px;
        border-radius: 20px;
        text-align: center;
        padding: 3px 0;
      }

      ;
    }

    .typer {
      width: calc(100% - 55px);
      // margin-left: 20px;
      display: flex;
      overflow-x: scroll;
      padding: 6px 9px;
      position: relative;

      // line-height: 1.8em;
      button {
        background: transparent;
        color: #202020;
        font-size: 1rem;
        border: none;
        cursor: pointer;
        padding: 0 20px;
        font-family: 'sc' !important;
        // width: 128px;
        box-shadow: none;
        white-space: nowrap;
      }
    }
  }
}

.mid {
  background: rgba($color: #fff, $alpha: 0.1);
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
}

.list:not(:nth-child(6n+1)) {
  margin-left: 2%;
}

.list:nth-child(n+7) {
  margin-top: 10px;
}

.list {
  position: relative;
  width: 14.75%;

  .el-image {
    border-radius: 10px;
    height: 100%;
  }

  p {
    // font-size: 12px;
    position: absolute;
    bottom: 0%;
    left: 0;
    color: #fff;
    background: rgba(32, 32, 32, 0.7);
    border-radius: 0 0 10px 10px;
    text-align: center;
    height: 4vh;
    line-height: 4vh;
    width: 100%;
  }
}

.actives {
  color: #FE9D3E !important;
}

.vip3 {
  width: 45px;
  height: 27px;
  position: absolute;
  top: 8.6%;
  right: 8%;
}

@media screen and (max-width: 1280px) {
  .vip3 {
    width: 45px;
    height: 27px;
    top: 11%;
    right: 8%;
    border-radius: none !important;
  }
}

.allfenlei {
  position: fixed;
  height: 100vh;
  width: 16.66667%;
  background: #fff;
  border-radius: 10px;

  button:first-of-type {
    border-radius: 10px 10px 0 0;
  }

  button {
    display: block;
    background: transparent;
    border: none;
    width: 100%;
    font-size: 24px;
    padding: 19px 0;
  }
}

.activeNav {
  color: #FE9D3E;
  background: #FBF0E5 !important;
}
</style>