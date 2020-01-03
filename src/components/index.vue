<template>
	<el-row :gutter="20">
		<el-col :span="3">
			<el-card :body-style="{ padding: '0px' }">
				<el-image
					style="width:50px;display: inline-block"
					:src="supervisor"
					:fit="contain"></el-image>
				<div
					style="display: inline-block;position: absolute;padding-left:15px;">
					<el-link type="primary"
						href="http://supervisor.aixiaochu.nat300.top:8787"
						target="_blank"
						style="line-height: 50px;">Supervisor
					</el-link>
				</div>
			</el-card>
			</el-col>

			<el-col :span="3">
			<el-card :body-style="{ padding: '0px' }">
				<el-image
					style="width:50px;display: inline-block"
					:src="filebrowser"
					:fit="contain"></el-image>
				<div
					style="display: inline-block;position: absolute;padding-left:15px;">
					<el-link type="primary"
						href="http://file.aixiaochu.nat300.top:8787"
						target="_blank"
						style="line-height: 50px;">File Browser</el-link>
				</div>
			</el-card>
		</el-col>
		<el-col :span="3">
			<el-card :body-style="{ padding: '0px' }">
				<el-image
					style="width:50px;display: inline-block"
					:src="filebrowser"
					:fit="contain"></el-image>
				<div
					style="display: inline-block;position: absolute;padding-left:15px;">
					<el-link type="primary"
						href="https://webssh.aixiaochu.nat300.top:8787"
						target="_blank"
						style="line-height: 50px;">Web SSH
					</el-link>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>


<script>
    import supervisor from '@/assets/supervisor.png'
    import filebrowser from '@/assets/filebrowser.png'

    export default {
        data: function () {
            return {
                supervisor: supervisor,
                filebrowser: filebrowser,
            }
        },
        methods: {},
    }
</script>