<template>
    <div>
    <el-row :gutter="20">
        <el-col :span="3" style="margin-bottom: 20px">
            <el-card>
                <el-image
                        style="width:100%;"
                        :src="supervisor"
                        :fit="contain"></el-image>
                <el-link type="primary"
                         :href="'http://supervisor.'+baseHost"
                         target="_blank"
                         style="line-height:30px; text-align: center; width:100%">Supervisor
                </el-link>
            </el-card>
        </el-col>

        <el-col :span="3">
            <el-card>
                <el-image
                        style="width:100%;display: inline-block"
                        :src="filebrowser"
                        :fit="contain"></el-image>
                <el-link type="primary"
                         :href="'http://file.'+baseHost"
                         target="_blank"
                         style="line-height:30px; text-align: center; width:100%">File Browser
                </el-link>
            </el-card>
        </el-col>
        <el-col :span="3">
            <el-card>
                <el-image
                        style="width:100%;display: inline-block"
                        :src="mongoweb"
                        :fit="contain"></el-image>
                <el-link type="primary"
                         :href="'http://mongoweb.'+baseHost"
                         target="_blank"
                         style="line-height:30px; text-align: center; width:100%">Admin Mongo
                </el-link>
            </el-card>
        </el-col>
        <el-col :span="3">
            <el-card>
                <el-image
                        style="width:100%;display: inline-block"
                        :src="sshweb"
                        :fit="contain"></el-image>
                <el-link type="primary"
                         :href="'http://ssh.'+baseHost"
                         target="_blank"
                         style="line-height:30px; text-align: center; width:100%">Web SSH
                </el-link>
            </el-card>
        </el-col>
        <el-col :span="3">
            <el-card>
                <el-image
                        style="width:100%;display: inline-block"
                        :src="omv"
                        :fit="contain"></el-image>
                <el-link type="primary"
                         :href="'http://omv.'+baseHost"
                         target="_blank"
                         style="line-height:30px; text-align: center; width:100%">OMV
                </el-link>
            </el-card>
        </el-col>
        <el-col :span="3">
            <el-card>
                <el-image
                        style="width:100%;display: inline-block"
                        :src="redisweb"
                        :fit="contain"></el-image>
                <el-link type="primary"
                         :href="'http://redisweb.'+baseHost"
                         target="_blank"
                         style="line-height:30px; text-align: center; width:100%">Redis Web
                </el-link>
            </el-card>
        </el-col>
        <el-col :span="3">
            <el-card>
                <el-image
                        style="width:100%;display: inline-block"
                        :src="aria2"
                        :fit="contain"></el-image>
                <el-link type="primary"
                         :href="'http://aria2.'+baseHost"
                         target="_blank"
                         style="line-height:30px; text-align: center; width:100%">Aria2
                </el-link>
            </el-card>
        </el-col>
        <el-col :span="3">
            <el-card>
                <el-image
                        style="width:100%;display: inline-block"
                        :src="baidupan"
                        :fit="contain"></el-image>
                <el-link type="primary"
                         :href="'http://baidupan.'+baseHost"
                         target="_blank"
                         style="line-height:30px; text-align: center; width:100%">百度云
                </el-link>
            </el-card>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="3">
            <el-card>
                <el-image
                        style="width:100%;display: inline-block"
                        :src="bt"
                        :fit="contain"></el-image>
                <el-link type="primary"
                         :href="'http://bt.'+baseHost"
                         target="_blank"
                         style="line-height:30px; text-align: center; width:100%">BT下载器
                </el-link>
            </el-card>
        </el-col>
        <el-col :span="3">
            <el-card>
                <el-image
                        style="width:100%;display: inline-block"
                        :src="kodi"
                        :fit="contain"></el-image>
                <el-link type="primary"
                         :href="'http://kodi.'+baseHost"
                         target="_blank"
                         style="line-height:30px; text-align: center; width:100%">kodi
                </el-link>
            </el-card>
        </el-col>
        <el-col :span="3">
            <el-card>
                <el-image
                        style="width:100%;display: inline-block"
                        :src="netdata"
                        :fit="contain"></el-image>
                <el-link type="primary"
                         :href="'http://netdata.'+baseHost"
                         target="_blank"
                         style="line-height:30px; text-align: center; width:100%">设备监视
                </el-link>
            </el-card>
        </el-col>
        <el-col :span="3">
            <el-card>
                <el-image
                        style="width:100%;display: inline-block"
                        :src="php"
                        :fit="contain"></el-image>
                <el-link type="primary"
                         :href="'http://php.'+baseHost"
                         target="_blank"
                         style="line-height:30px; text-align: center; width:100%">PHP探针
                </el-link>
            </el-card>
        </el-col>
        <el-col :span="3">
            <el-card>
                <el-image
                        style="width:100%;display: inline-block"
                        :src="mysqlweb"
                        :fit="contain"></el-image>
                <el-link type="primary"
                         :href="'http://mysqlweb.'+baseHost"
                         target="_blank"
                         style="line-height:30px; text-align: center; width:100%">Mysql Web
                </el-link>
            </el-card>
        </el-col>
    </el-row>
    </div>
</template>


<script>
    import supervisor from '@/assets/supervisor.png'
    import filebrowser from '@/assets/filebowser.png'
    import mongoweb from '@/assets/mongoweb.png'
    import sshweb from '@/assets/ssh.png'
    import omv from '@/assets/omv.png'
    import redisweb from '@/assets/redis.png'
    import aria2 from '@/assets/aria2.png'
    import baidupan from '@/assets/baidupan.png'
    import bt from '@/assets/bt.png'
    import kodi from '@/assets/kodi.png'
    import netdata from '@/assets/netdata.png'
    import php from '@/assets/php.png'
    import mysqlweb from '@/assets/mysql.png'

    export default {
        data: function () {
            return {
                supervisor: supervisor,
                filebrowser: filebrowser,
                mongoweb: mongoweb,
                sshweb: sshweb,
                omv: omv,
                redisweb: redisweb,
                aria2: aria2,
                baidupan: baidupan,
                bt: bt,
                kodi: kodi,
                netdata: netdata,
                php: php,
                mysqlweb: mysqlweb,
                baseHost: "aixiaochu.nat300.top:8787"
            }
        },
        methods: {},
    }
</script>