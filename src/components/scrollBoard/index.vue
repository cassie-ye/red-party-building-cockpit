<template>
    <dv-border-box-12>
        <div class="moudle-desc">
            <p class="moudle-title">基地实时收益</p>
            <dv-decoration-3 style="width:150px;height:30px;" />
        </div>
        <dv-scroll-board :config="config" />
    </dv-border-box-12>
</template>
<script>
export default {
    name: 'scrollBoard',
    data() {
        return {
            mockDataList: [
                ['基地预定', '四明山', '54356'],
                ['文创商品', '嘉兴南湖', '5434'],
                ['餐饮收益', '遵义会议纪念馆', '5676'],
                ['酒店收益', '延安革命纪念地', '76867'],
                ['讲解预定', '故宫博物院', '98776'],
                ['基地入驻', '韶山毛泽东纪念馆', '24353'],
                ['文创商品', '八路军太行纪念馆', '76876'],
                ['基地预定', '天安门广场', '3544'],
            ],
            config: {
                header: ['基地', '项目', '今日收益'],
                data: [
                    ['<span style="color:#37a2da;">基地预定</span>', '四明山', '54356'],
                    ['行2列1', '<span style="color:#32c5e9;">行2列2</span>', '行2列3'],
                    ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
                    ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
                    ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
                    ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
                    ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
                    ['行8列1', '<span style="color:#e062ae;">行8列2</span>', '行8列3'],
                    ['<span style="color:#e690d1;">行9列1</span>', '行9列2', '行9列3'],
                    ['行10列1', '<span style="color:#e7bcf3;">行10列2</span>', '行10列3']
                ],
                index: true,
                columnWidth: [50],
                align: ['center']
            },
            applyColorRules(data) {
                // 在这里定义颜色规则
                return data.map((row, rowIndex) => {
                    return row.map((cell, cellIndex) => {
                        let color = '';
                        // 根据不同规则设置颜色
                        if (rowIndex % 2 === 0) {
                            color = '#ffdb5c'; // 偶数行的颜色
                        } else {
                            color = '#67e0e3'; // 奇数行的颜色
                        }
                        // 设置特定条件下的颜色
                        if (cellIndex === 1 && cell.includes('项目')) {
                            color = '#32c5e9'; // 特定列的颜色
                        }
                        return `<span style="color:${color};">${cell}</span>`;
                    });
                });
            }
        }
    },
    mounted() {
        this.config.data = this.applyColorRules(this.mockDataList);
    }
}
</script>
<style scoped lang="scss">
.dv-border-box-12 {
    width: 410px;
    height: 425px;
    display: flex;
    justify-content: center;
    align-items: center;

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

    .dv-scroll-board {
        width: 390px;
        height: 360px;
        margin-left: 10px;
        margin-top: 10px;
    }
}
</style>