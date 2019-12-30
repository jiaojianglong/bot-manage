import Vue from 'vue'
import Router from 'vue-router'
import QAData from "@/components/qa_data"
import QAInfo from "@/components/question_info"
import WXClient from "@/components/wx_client"
import WXBot from "@/components/wx_bot"
import WXBotDetail from "@/components/wx_bot_detail"
import WXFriend from "@/components/wx_friend"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/qa_data',
      name: 'QAData',
      component: QAData
    },
    {
      path: '/qa_info',
      name: 'QAInfo',
      component: QAInfo
    },
    {
      path: '/wx/client',
      name: 'WXClient',
      component: WXClient
    },
    {
      path: '/wx/bot',
      name: 'WXBot',
      component: WXBot
    },
    {
      path: '/wx/bot/detail',
      name: 'WXBotDetail',
      component: WXBotDetail
    },
    {
      path: '/wx/friend',
      name: 'WXFriend',
      component: WXFriend
    }
  ]
})
