<template>
    <!-- 
        1. 入驻基地数
        2. 注册用户数
        3. 平台净利润
        4. 投资回报率 
     -->
    <dv-border-box-12>
        <div class="moudle-desc">
            <p class="moudle-title">平台数据展示</p>
            <dv-decoration-3 style="width:250px;height:30px;" />
        </div>
        <div class="border-box">
            <div class="count_div">
                <div class="title">入驻基地数</div>
                <dv-digital-flop :config="config" style="width:200px;height:50px;" />
            </div>
            <div class="count_div">
                <div class="title">注册用户数</div>
                <dv-digital-flop :config="config" style="width:200px;height:50px;" />
            </div>
            <!-- 利润 -->
            <div class="count_div">
                <div class="title">平台净利润</div>
                <dv-digital-flop :config="config" style="width:200px;height:50px;" />
            </div>
            <div class="count_div">
                <div class="title">投资回报率</div>
                <dv-digital-flop :config="config" style="width:200px;height:50px;" />
            </div>
            <!-- 资源调度 -->
            <div class="count_div">
                <div class="title">平均资源利用率</div>
                <dv-digital-flop :config="config" style="width:200px;height:50px;" />
            </div>
            <div class="count_div">
                <div class="title">资源分配情况</div>
                <dv-digital-flop :config="config" style="width:200px;height:50px;" />
            </div>
            <div class="count_div">
                <div class="title">负载均衡</div>
                <dv-digital-flop :config="config" style="width:200px;height:50px;" />
            </div>
            <div class="count_div">
                <div class="title">资源需求预测</div>
                <dv-digital-flop :config="config" style="width:200px;height:50px;" />
            </div>
        </div>
    </dv-border-box-12>
</template>
<script>
export default {
    name: "dataCount",
    data() {
        return {
            config: {
                number: [100],
                content: '{nt}个'
            }
        }
    },
}
</script>
<style scoped lang="scss">
.dv-border-box-12 {
    /* width: 50%; */
    width: 120%;
    height: 260px;

    .moudle-desc {
        width: 80%;
        display: flex;
        color: #017ef7;
        padding-top: 15px;
        align-items: center;

        .moudle-title {
            font-size: 20px;
            margin-left: 15px;
            margin-right: 15px;
        }
    }

    .border-box {
        width: 80%;
        height: 200px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;

        .count_div {
            width: 23%;
            height: 90px;
            background-color: #282c34;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .title {
                color: aqua;
                font-size: 17px;
            }
        }
    }
}
</style>