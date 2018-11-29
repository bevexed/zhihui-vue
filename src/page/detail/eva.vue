<template>
  <div class="list-container">
    <h2 align="center" style="margin-top: .2rem">用户评论</h2>
    <dl class="list" id="J-feedback-list">
      <dd class="dd-padding" v-for="(value,index) in commentList">
        <div class="feedbackCard">

          <div class="user-wrapper">
            <div class="user-pic">
              <div class="imgbox" style="background: none;">
                <!--<img :src="`${ImgBaseUrl}${value.avatar}`" style="height: 100%;">-->
                <img :src="value.avatar" style="height: 100%;border-radius: 50%">
              </div>
            </div>
            <div class="user-info-text">
              <div class="userInfo">
                <span class="username">{{value.nickname}}</span>
              </div>
              <div class="score">
                <span class="stars">
                  <i class="text-icon icon-star" v-for="i in value.cost_effective"></i>
                </span>
                <span class="time">{{value.c_time}}</span>
              </div>
            </div>
          </div>
          <div class="comment">
            <div class="toggleContent">
              <p>
                {{value.content}}
              </p>
            </div>
          </div>
          <div class="pics">
            <span class="pic-container imgbox" style="background: none;" v-for="v in imgs[index]">
              <img :src="`${ImgBaseUrl}${v}`" style="width: 100%;">
            </span>
          </div>
          <div>
            <!--<a href="//i.meituan.com/poi/98800120" style="color:#666;font-size: .16rem">高温派对·海鲜烤肉火锅自助</a>-->
          </div>
          <div class="block-reply" v-if="value.reply_time">
            <div class="block-reply-head">商家回复：
              <span class="reply-time">{{value.reply_time}}</span>
            </div>
            <p v-html="value.reply_content"></p>
          </div>
        </div>
      </dd>
    </dl>

    <div v-if="commentList.length === 1" style="text-align: center;margin-top: .1rem">暂无</div>
    <div v-else style="text-align: center;margin-top: .1rem"
         @click="$router.push({name:'evaluation',params:{store_id:$route.params.id}})">查看更多
    </div>
  </div>
</template>

<script>
  import {commentList, ImgBaseUrl} from '../../api'

  export default {
    name: "evaluation",
    data() {
      return {
        imgs: [],
        ImgBaseUrl,
        commentList: [],
        page: 1,
        allLoaded: true,
        loading: false,//判断是否加载数据
        loading_more: true,//控制是否发送ajax请求
      }
    },
    methods: {
      async getCommentList() {
        let result = await commentList(this.$route.params.id, 1)
        if (result.code === 1) {
          this.commentList = result.info.list
          let pic = result.info.list.map(item => item.picture) // 过滤出pic
          console.log(`pic:${pic}`);
          this.imgs = pic.map(item => item.split(','))
          console.log(`imgs:${this.imgs}`);
        }
      },
    },
    created() {
      this.getCommentList()
    }

  }
</script>

<style scoped>
  .block-reply {
    color: #666;
    margin-top: .1rem;
    background-color: #F7F7F6;
    padding: .1rem;
    position: relative;
    border-radius: .06rem;
  }

  .block-reply-head {
    border-bottom: 1px solid #E0DDD7;
    font-size: .14rem;
    padding-bottom: .1rem;
  }

  .block-reply .reply-time {
    float: right;
    color: #999;
  }

  .block-reply p {
    margin-top: .1rem;
    font-size: .16rem;
    color: #ED852C;
  }

  p, h6 {
    line-height: 1.41;
    text-align: justify;
    margin: -.2em 0;
    word-break: break-all;
    font-size: .16rem;
  }

  .imgbox img {
    max-height: .5rem;
  }

  .list-container {
    position: relative;
  }

  dl.list:first-child {
    margin: 0;
    border-top: 0;
  }

  dl.list .dd-padding, dl.list dt, dl.list dd > .react {
    padding: .14rem .1rem;
  }

  dl.list dt, dl.list dd {
    margin: 0;
    border-bottom: 1px solid #DDD8CE;
    overflow: hidden;
    font-size: inherit;
    font-weight: 400;
    position: relative;
  }

  .feedbackCard .user-wrapper {
    position: relative;
  }

  .feedbackCard .user-pic {
    position: absolute;
    width: .37rem;
    height: .37rem;
    vertical-align: top;
  }

  .feedbackCard .user-info-text {
    margin-left: .8rem;
    font-size: .12rem;
    color: #999;
    vertical-align: top;
    height: .54rem;
    overflow: hidden;
  }

  .feedbackCard .userInfo {
    margin-bottom: .06rem;
    font-size: .12rem;
  }

  .text-icon.icon-star:after {
    content: '★';
  }

  .feedbackCard .score {
    margin-bottom: .2rem;
    font-size: .12rem;
  }

  .feedbackCard .stars {
    font-size: .14rem;
    margin-right: .2rem;
    vertical-align: bottom;
  }

  .stars {
    display: inline-block;
    color: #f90;
  }

  .stars i {
    margin-right: .1em;
    vertical-align: 0rem;
  }

  .text-icon {
    font-family: base_icon;
    display: inline-block;
    vertical-align: middle;
    font-style: normal;
  }

  .feedbackCard .time {
    float: right;
    color: #999;
  }

  .feedbackCard .serious-evaluation {
    position: absolute;
    width: .5rem;
    height: .5rem;
    top: -.09rem;
    right: .12rem;
  }

  .feedbackCard .comment {
    margin-top: .15rem;
  }

  .feedbackCard .comment {
    margin-bottom: .11rem;
    font-size: .15rem;
  }

  .text-icon {
    font-family: base_icon;
    display: inline-block;
    vertical-align: middle;
    font-style: normal;
  }

  .icon-ell:after {
    content: "...";
    display: inline;
  }

  .icon-toggle-arrow:after {
    content: '';
    display: inline-block;
    position: relative;
    top: -.2em;
    width: .5em;
    height: .5em;
    border-bottom: .015rem solid #C3C5C9;
    border-left: .015rem solid #C3C5C9;
    -webkit-transform: rotateZ(-45deg);
    -moz-transform: rotateZ(-45deg);
    -ms-transform: rotateZ(-45deg);
  }

  .icon-toggle-arrow {
    position: relative;
  }

  .feedbackCard .pics {
    margin-bottom: .13rem;
  }

  .feedbackCard .pics .pic-container {
    display: inline-block;
    width: .55rem;
    height: .55rem;
    margin-bottom: .14rem;
    overflow: hidden;
    text-align: center;
    vertical-align: top;
    margin-left: .05rem
  }


</style>
