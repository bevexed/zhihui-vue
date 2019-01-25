import Vue from 'vue'

Vue.directive('anchor', {
  inserted: function (el, binding) {
    el.ontouchend = scroll
    el.onclick = scroll

    function scroll() {
      // clearInterval(T1)
      let top = document.querySelector('#anchor-' + binding.value).offsetTop;
      let scroll = document.documentElement.scrollTop;
      if (top === scroll) return false
      let T1 = setInterval(() => {
        scrollToBottom()
      }, 10);

      function scrollToBottom() {
        scroll += (top - scroll) / 20
        document.documentElement.scrollTop = scroll;
        document.body.scrollTop = scroll
        if (Math.abs(scroll - top) <= 20) {
          document.documentElement.scrollTop = top
          document.body.scrollTop = top
          clearInterval(T1)
        }

      }
    }
  }
});
