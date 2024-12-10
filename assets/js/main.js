document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('movieRevenueChart').getContext('2d');

    // Histogram Data (Bin counts)
    const bins = [5, 10, 15, 20, 10, 5]; // Counts in each bin
    const binLabels = ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60']; // Bin labels

    // Distribution Data (e.g., Normal Distribution)
    const distribution = [3, 8, 18, 15, 7, 2]; // Approximate the curve over the bins
    const midpoints = [5, 15, 25, 35, 45, 55]; // Midpoints of bins for the curve

    const histogramChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: binLabels, // Bin ranges
            datasets: [
                {
                    type: 'bar',
                    label: 'Histogram',
                    data: bins, // Bin counts
                    backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bars color
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    type: 'line', // Distribution line
                    label: 'Distribution',
                    data: distribution, // Distribution values
                    borderColor: 'rgba(255, 99, 132, 1)', // Line color
                    borderWidth: 2,
                    fill: false, // No area under the curve
                    tension: 0.4, // Smooth curve
                    pointRadius: 0, // Hide points
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true, // Show legend
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Bins', // X-axis title
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Frequency', // Y-axis title
                    },
                },
            },
        },
    });

    // const mySparseLogChart = new Chart(ctx, {
    //     type: 'line',
    //     data: {
    //         labels: ['1', '10', '100', '1000', '10000'], // Labels (e.g., logarithmic intervals)
    //         datasets: [
    //             {
    //                 label: 'Exponential Growth',
    //                 data: [1, 10, 100, 1000, 10000], // Data points
    //                 borderColor: 'rgba(75, 192, 192, 1)',
    //                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //                 borderWidth: 2,
    //             },
    //             {
    //                 label: 'Linear Growth',
    //                 data: [1, 2, 3, 4, 5], // Another dataset
    //                 borderColor: 'rgba(153, 102, 255, 1)',
    //                 backgroundColor: 'rgba(153, 102, 255, 0.2)',
    //                 borderWidth: 2,
    //             },
    //         ],
    //     },
    //     options: {
    //         responsive: true,
    //         scales: {
    //             x: {
    //                 title: {
    //                     display: true,
    //                     text: 'X-axis (Linear)', // X-axis title
    //                 },
    //             },
    //             y: {
    //                 type: 'logarithmic', // Use logarithmic scale for Y-axis
    //                 title: {
    //                     display: true,
    //                     text: 'Y-axis (Logarithmic)', // Y-axis title
    //                 },
    //                 ticks: {
    //                     maxTicksLimit: 5, // Limit the number of ticks on the Y-axis
    //                     callback: function(value) {
    //                         // Only show powers of 10 as labels
    //                         if (value === 1 || value === 10 || value === 100 || value === 1000 || value === 10000) {
    //                             return value.toLocaleString();
    //                         }
    //                         return ''; // Hide intermediate ticks
    //                     },
    //                 },
    //             },
    //         },
    //         plugins: {
    //             legend: {
    //                 display: true, // Display legend
    //             },
    //         },
    //     },
    // });
});
