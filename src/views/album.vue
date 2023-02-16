<template>
    <div class="album">
        <el-row :gutter="10">
            <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
                <div class="fmtbox">
                    <div class="fmt">
                        <el-image :src="toplist.albumTopCover" fit="fill"></el-image>
                    </div>
                    <p class="zjname">{{ toplist.albumName }}</p>
                </div>

                <div class="nmovieList">
                    <div class="nmovie" v-for="(item, index) in dataList" :key="item.videoId" :id="11 + Number(index)"
                        @click="goDetail(item)">
                        <el-image v-if="item.videoCover != ''" :src="item.videoCover" fit="cover">
                            <div slot="placeholder" class="image-slot">
                                <el-image :src="require('../assets/his.png')"></el-image>
                            </div>
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                        <el-image v-else :src="require('../assets/his.png')"></el-image>
                        <p class="introduce">
                            <span class="i1">{{ item.videoName }}</span>
                        </p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- <audio controls="controls" hidden :src="require('../assets/music/point.mp3')" ref="ado"></audio> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            id: '',
            page: 1,
            dataList: [],
            kd: 0,
            img: '',
            name: '',
            index: 4,
            toplist: []
        }
    },
    mounted() {
        this.img = this.$route.query.fm
        this.id = this.$route.query.id
        this.name = this.$route.query.name
        this.getinfo(this.$route.query.id)
        this.gettop()
        this.clientHeight = document.documentElement.clientHeight;
        window.addEventListener("scroll", this.scrollBottom, true);
        let _this = this;
        // document.onkeydown = function (event) {
        //     if (_this.$route.name == 'album') {
        //         if (event.keyCode == 37) {
        //             _this.moveLeft();
        //         } else if (event.keyCode == 38) {
        //             _this.moveUp();
        //         } else if (event.keyCode == 39) {
        //             _this.moveRight();
        //         } else if (event.keyCode == 8) {
        //             _this.$router.go(-1)
        //         } else if (event.keyCode == 40) {
        //             _this.moveDown();
        //         } else if (event.keyCode == 13) {
        //             _this.activeClick();
        //         } else if (event.keyCode == 8) {
        //             this.$router.go(-1)
        //         }
        //     }
        // };
    },
    methods: {
        gosearch() {
            this.$router.push({ path: "/search" });
        }, gosx() {
            this.index = 2;
            this.$router.push({ path: "/classify" });
        },
        changeIndex(val) {
            this.index = val
            // switch (val) {
            this.$router.push({ path: '/', query: { album: val } })
            // case 2: this.getcoll(); break;
            // case 3: break;
            // case 4: this.getzj(); break;
            // case 5: this.getList('电视剧'); break;
            // case 6: this.getList('电影'); break;
            // case 7: this.getList('综艺'); break;
            // case 8: this.getList('动漫'); break;
            // case 9: this.getList('纪录片'); break;
            // }
        },
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
                this.kd = 1
            }
            if (this.kd > 0) {
                this.c.classList.remove("accs");
                this.kd--
                if (this.kd <= 0) {
                    this.kd = 1
                }
                this.c = document.getElementById(this.kd);
                this.c.classList.add("accs");
            }
            if (this.kd < 10) {
                this.activeClick()
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
            let d = top >= 0;
            if (d == false) {
                document.documentElement.scrollTop = document.getElementById(
                    this.kd
                ).offsetTop - intop;
            }
        },
        moveRight() {
            // this.$refs.ado.currentTime = 0
            // this.$refs.ado.play(); //播放
            console.log(this.kd)
            if (this.kd == 0) {
                this.c = document.getElementById(1);
                this.c.classList.add("accs");
                this.kd = 1
            } if (this.kd > 0) {
                this.c.classList.remove("accs");
                this.kd++
                if (this.kd > 10 + this.dataList.length) {
                    this.kd = 10 + this.dataList.length
                }
                this.c = document.getElementById(this.kd);
                this.c.classList.add("accs");
            }
            if (this.kd < 10) {
                this.activeClick()
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
        },
        moveUp() {
            // this.$refs.ado.currentTime = 0
            // this.$refs.ado.play(); //播放
            if (this.kd == 0) {
                this.c = document.getElementById(1);
                this.c.classList.add("accs");
                this.kd = 1
            }
            this.c.classList.remove("accs");

            if (this.kd > 16) {
                this.kd = this.kd - 6
            }
            else if (this.kd > 10 && this.kd < 16) {
                this.kd = 5
            }
            else if (this.kd <= 0) {
                this.kd = 1
            }
            this.c = document.getElementById(this.kd);
            this.c.classList.add("accs");
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
        },
        moveDown() {
            // this.$refs.ado.currentTime = 0
            // this.$refs.ado.play(); //播放
            if (this.kd == 0) {
                this.kd = 1
                this.c = document.getElementById(1);
                this.c.classList.add("accs");
            } else if (this.kd <= 10) {
                this.c.classList.remove("accs");
                this.kd = 11
                this.c = document.getElementById(this.kd);
                this.c.classList.add("accs");
            } else if (this.kd > 10) {
                console.log(10 + this.dataList.length)
                this.c.classList.remove("accs");
                this.kd = this.kd + 6
                if (this.kd > 10 + this.dataList.length) {
                    this.kd = 10 + this.dataList.length
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
        },
        goDetail(val) {
            this.$router.push({ path: '/details', query: { id: val.videoId } })
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
        gettop() {
            this.$http.get(`video/album/${this.id}`).then(res => {
                this.toplist = res.data.data
            })
        },
        getinfo() {
            this.$http.get(`video/getAlbumVideoPage?page=${this.page}&limit=30&albumId=${this.id}`).then(res => {
                if (this.page == 1) {
                    setTimeout(() => {
                        this.kd = 11
                        this.c = document.getElementById(this.kd);
                        this.c.classList.add("accs");
                    }, 100);
                    this.dataList = res.data.data.list
                } else {
                    res.data.data.list.map(val => {
                        this.dataList.push(val)
                    })
                }

            })
        }
    }
}
</script>

<style lang="scss">
.album {

    .el-input--prefix .el-input__inner {
        padding-left: 43px;
    }

    .el-input__icon {
        font-size: 30px;
        line-height: 55px;
    }

    .el-input__inner {
        border-radius: 30px;
        background: #efefef;
        border: none;
        color: #303030;
        font-size: 24px;
        height: 55px;
    }

    .el-input__inner {
        border-radius: 20px;
        background: #efefef;
    }

    .el-image {
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }

    .el-carousel,
    .el-carousel__container {
        height: 100%;
    }

    .el-carousel__indicators--labels li {
        height: 66px;
        line-height: 66px;
        text-align: left;
        background: url("../assets/swbg.png") no-repeat center;
    }

    .el-carousel__indicators--labels li button {
        display: inline-block;
        background: transparent;
        font-size: 28px;
        color: #fff;
    }

    .el-carousel__indicators--vertical {
        bottom: 0%;
        top: auto;

        .el-carousel__button {
            width: auto;
            height: auto;
        }
    }
}
</style>
<style lang="scss" scoped>
.nmovie:not(:nth-child(6n+1)) {
    margin-left: 2%;
}

.nmovieList {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 3%;
}

.nmovie {
    position: relative;
    // width: 14.86%;
    width: 15%;
    overflow: hidden;
    box-sizing: border-box;
    height: 38vh;
    // height: 203px;

    .introduce {
        position: absolute;
        bottom: 0%;
        color: #fff;
        background: rgba(32, 32, 32, 0.7);
        border-radius: 0 0 10px 10px;
        text-align: center;
        height: 4vh;
        // font-size: 12px;
        line-height: 4vh;
        width: 100%;
    }
}

.nmovie {
    margin-top: 1%;
}

.fmt {
    height: 24vh;

    .el-image {
        height: 100%;
        width: 100%;
    }
}

.fmtbox {
    position: relative;
}

.zjname {
    position: absolute;
    bottom: 1%;
    left: 20px;
    color: #fff;
}

.typeNavBar {
    display: flex;
    padding: 15px 0 30px 0;

    .tnr {
        margin-right: 39px;
    }

    .tnl {
        // align-items: center;
        display: flex;
        width: 68%;
        overflow-x: scroll;
        position: relative;
        height: 40px;
        padding: 6px 5px;
        margin-top: 2px;
    }

    .arrowdown {
        width: 28px;
        height: 28px;
    }

    span:not(:first-of-type) {
        margin-left: 21px;
    }

    span {
        padding: 0px 20px;
        // width: 56px;
        // height: 26px;
        // line-height: 26px;
        text-align: center;
        cursor: pointer;
        color: #333;
        font-size: 28px;
        white-space: nowrap;
        border-radius: 40px !important;
        // padding: 0 !important;
    }

    img {
        width: 40px;
        height: 37px;
    }
}
</style>