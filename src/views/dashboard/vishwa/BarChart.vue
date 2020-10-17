<script>
import {Bar} from "vue-chartjs";

export default {
    extends: Bar,
    props: {
        label: {
            type: String
        },
        chartData: {
            type: Array
        },
        options: {
            type: Object
        },
        chartColors: {
            type: Object
        }
    },

    mounted() {

        const names = this.chartData.map(d => d.name).reverse()
        const totals = this.chartData.map(d => d.total).reverse()

        const {
            backgroundColor
        } = this.chartColors;

        this.renderChart(
            {
                labels: names,
                datasets: [
                    {
                        label: this.label,
                        data: totals,
                        backgroundColor: backgroundColor
                    }
                ]
            },
            this.options
        )

    }
}
</script>