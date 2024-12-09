document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('movieRevenueChart').getContext('2d');

    const movieRevenueChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Movie 1', 'Movie 2', 'Movie 3', 'Movie 4', 'Movie 5'],
            datasets: [{
                label: 'Revenue (in Millions)',
                data: [100, 200, 300, 400, 500],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

});
